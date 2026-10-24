import unittest
from slice_analysis import analyze

class SliceAnalysisTests(unittest.TestCase):
    def trade(self,split,symbol,pnl):
        return {"strategy_id":"existing-strategy-A","source_hash":"sha256:abc",
                "split":split,"symbol":symbol,"regime":"trend","hour":10,
                "side":"long","net_pnl":pnl}
    def test_winning_slice_despite_losing_aggregate(self):
        records=[]
        for split in ("train","validation"):
            records += [self.trade(split,"GOOD",2.0)]*35
            records += [self.trade(split,"BAD",-5.0)]*35
        records += [self.trade("holdout","GOOD",-1000.0)]*35
        result=analyze(records)
        symbol_slices=[s for s in result["slices"] if s["dimension"]=="symbol"]
        good=next(s for s in symbol_slices if s["value"]=="GOOD")
        bad=next(s for s in symbol_slices if s["value"]=="BAD")
        self.assertTrue(good["candidate_keep"])
        self.assertFalse(bad["candidate_keep"])
        self.assertEqual(good["validation"]["net_profit"],70)
        self.assertTrue(good["holdout_accessed_for_selection"] is False)
    def test_mismatched_hash_rejected(self):
        records=[self.trade("train","A",1),self.trade("validation","A",1)]
        records[1]["source_hash"]="different"
        with self.assertRaises(ValueError):analyze(records)
    def test_low_sample_not_promoted(self):
        result=analyze([self.trade("train","A",5),self.trade("validation","A",5)])
        self.assertFalse(any(x["candidate_keep"] for x in result["slices"]))

if __name__=="__main__":unittest.main()
