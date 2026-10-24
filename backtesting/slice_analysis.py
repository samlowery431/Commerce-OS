"""Analyze externally generated backtest trades by market context, without fitting to holdout.

Input JSONL records:
{"strategy_id":"...","source_hash":"...","split":"train|validation|holdout",
 "symbol":"...","regime":"...","hour":10,"side":"long",
 "net_pnl":1.25,"fees":0.02,"slippage":0.03}
net_pnl MUST already include fees and slippage. This module does not trade.
"""
import argparse, collections, json, math, pathlib

def summarize(records):
    pnl=[float(r["net_pnl"]) for r in records]
    n=len(pnl)
    if not n:return None
    mean=sum(pnl)/n
    variance=sum((x-mean)**2 for x in pnl)/(n-1) if n>1 else 0
    stderr=math.sqrt(variance/n) if n>1 else float("inf")
    return {"trades":n,"net_profit":round(sum(pnl),6),"avg_net_pnl":round(mean,6),
            "win_rate":round(sum(x>0 for x in pnl)/n,6),
            "stderr":round(stderr,6) if math.isfinite(stderr) else None,
            "lower_confidence_bound":round(mean-1.96*stderr,6) if math.isfinite(stderr) else None}

def analyze(records,min_trades=30):
    if not records:raise ValueError("empty trade set")
    allowed={"train","validation","holdout"}
    for r in records:
        if r.get("split") not in allowed:raise ValueError("invalid split")
        if "net_pnl" not in r:raise ValueError("net_pnl required")
    dimensions=("symbol","regime","hour","side")
    results=[]
    for sid in sorted(set(r["strategy_id"] for r in records)):
        group=[r for r in records if r["strategy_id"]==sid]
        hashes=set(r["source_hash"] for r in group)
        if len(hashes)!=1:raise ValueError("strategy id must have one immutable source hash")
        for dimension in dimensions:
            keys=sorted({str(r.get(dimension,"UNKNOWN")) for r in group})
            for key in keys:
                selection=[r for r in group if str(r.get(dimension,"UNKNOWN"))==key]
                train=summarize([r for r in selection if r["split"]=="train"])
                valid=summarize([r for r in selection if r["split"]=="validation"])
                # Never read holdout while selecting candidate filters.
                qualified=bool(train and valid and train["trades"]>=min_trades
                    and valid["trades"]>=min_trades
                    and train["lower_confidence_bound"] is not None
                    and valid["lower_confidence_bound"] is not None
                    and train["lower_confidence_bound"]>0
                    and valid["lower_confidence_bound"]>0)
                results.append({"strategy_id":sid,"source_hash":next(iter(hashes)),
                  "dimension":dimension,"value":key,"train":train,"validation":valid,
                  "candidate_keep":qualified,"decision":"investigate" if qualified else "exclude_or_collect_more",
                  "holdout_accessed_for_selection":False})
    return {"kind":"segmented_strategy_analysis","caution":"Exploratory multiple testing; confidence bounds are not corrected for searching many slices. Freeze filters and evaluate once on untouched holdout.","slices":results}

def main():
    p=argparse.ArgumentParser()
    p.add_argument("trades_jsonl")
    p.add_argument("--output",default="slice-analysis.json")
    p.add_argument("--min-trades",type=int,default=30)
    a=p.parse_args()
    records=[json.loads(line) for line in pathlib.Path(a.trades_jsonl).read_text().splitlines() if line.strip()]
    result=analyze(records,a.min_trades)
    pathlib.Path(a.output).write_text(json.dumps(result,indent=2)+"\n")
    print(json.dumps({"slices":len(result["slices"]),"candidates":sum(x["candidate_keep"] for x in result["slices"]),"output":a.output}))
if __name__=="__main__":main()
