"""Public infrastructure smoke only; synthetic prices are not evidence of profitability."""
import hashlib
import json
from pathlib import Path

prices = [100.0]
for i in range(1, 501):
    prices.append(round(prices[-1] * (1 + (((i * 37) % 19) - 9) / 10000), 8))
cash, shares, trades = 500.0, 0.0, 0
for i in range(20, len(prices)):
    short = sum(prices[i-5:i]) / 5
    long = sum(prices[i-20:i]) / 20
    if short > long and shares == 0:
        shares = cash / prices[i]
        cash = 0.0
        trades += 1
    elif short < long and shares > 0:
        cash = shares * prices[i]
        shares = 0.0
        trades += 1
equity = cash + shares * prices[-1]
result = {
    "kind": "infrastructure_smoke_only",
    "data": "deterministic_synthetic",
    "starting_capital": 500.0,
    "ending_equity": round(equity, 6),
    "trade_events": trades,
    "observations": len(prices),
    "price_sha256": hashlib.sha256(json.dumps(prices).encode()).hexdigest(),
    "runner": "github_actions",
    "validated_market_strategy": False
}
out = Path(__file__).with_name("smoke-result.json")
out.write_text(json.dumps(result, indent=2) + "\n")
print(json.dumps(result))
