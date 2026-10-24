"""Public synthetic batch execution test, with bounded runtime and no external data."""
import argparse, hashlib, json, math, pathlib
p=argparse.ArgumentParser()
p.add_argument("--count",type=int,default=100)
a=p.parse_args()
if not 1<=a.count<=1000: raise SystemExit("count must be 1..1000")
rows=[]
for k in range(a.count):
    prices=[100.]
    for i in range(1,401):
        prices.append(prices[-1]*(1+((((i*37+k*11)%31)-15)/10000)))
    fast=3+(k%16); slow=fast+10+(k%35)
    cash=500.; shares=0.; trades=0
    for i in range(slow,len(prices)):
        f=sum(prices[i-fast:i])/fast
        s=sum(prices[i-slow:i])/slow
        if f>s and not shares:
            shares=cash/prices[i];cash=0.;trades+=1
        elif f<s and shares:
            cash=shares*prices[i];shares=0.;trades+=1
    rows.append({"test_id":k,"fast":fast,"slow":slow,"ending_equity":round(cash+shares*prices[-1],6),"trade_events":trades})
out={"kind":"synthetic_infrastructure_batch_only","market_data_used":False,"real_strategy_validated":False,"test_count":len(rows),"results":rows}
path=pathlib.Path(__file__).with_name("batch-result.json")
path.write_text(json.dumps(out,separators=(",",":"))+"\n")
print(json.dumps({"test_count":len(rows),"artifact":str(path),"synthetic":True}))
