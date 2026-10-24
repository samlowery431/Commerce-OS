"""No-market-data smoke test for two independent backtesting engines.
Synthetic bars prove engine installation only, not strategy profitability.
"""
import numpy as np
import pandas as pd
from backtesting import Backtest, Strategy
from backtesting.lib import crossover
from backtesting.test import SMA
import vectorbt as vbt

rng = np.random.default_rng(20261024)
close = 100 * np.exp(np.cumsum(rng.normal(0, 0.008, 400)))
index = pd.date_range("2020-01-01", periods=len(close), freq="B")
bars = pd.DataFrame({"Open":close, "High":close*1.01,
                     "Low":close*.99, "Close":close,
                     "Volume":np.full(len(close), 100000)}, index=index)
class Cross(Strategy):
    def init(self):
        self.fast = self.I(SMA, self.data.Close, 10)
        self.slow = self.I(SMA, self.data.Close, 30)
    def next(self):
        if crossover(self.fast, self.slow):
            if not self.position: self.buy()
        elif crossover(self.slow, self.fast):
            if self.position: self.position.close()
bt = Backtest(bars, Cross, cash=500, commission=.001, exclusive_orders=True,
              fractional_unit=0.001, finalize_trades=True)
result = bt.run()
assert len(result) > 0
s = pd.Series(close, index=index)
entries = (s.rolling(10).mean() > s.rolling(30).mean()) & (s.shift(1).rolling(10).mean() <= s.shift(1).rolling(30).mean())
exits = (s.rolling(10).mean() < s.rolling(30).mean()) & (s.shift(1).rolling(10).mean() >= s.shift(1).rolling(30).mean())
portfolio = vbt.Portfolio.from_signals(s, entries, exits, init_cash=500, fees=.001, freq="1D")
assert np.isfinite(portfolio.total_return())
print("SMOKE_OK engines=backtesting.py,vectorbt data=synthetic validation=none")
