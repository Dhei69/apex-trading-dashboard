// Utility functions for Apex Trading Tracker rules and metrics

export function calculateProfit(entry, exit, type) {
  if (entry == null || exit == null) return 0
  const diff = type === 'Buy' ? exit - entry : entry - exit
  return Number(diff.toFixed(2))
}

export function computeDailyProfits(trades) {
  const dayToProfit = {}
  for (const trade of trades) {
    const key = trade.date
    const profit = calculateProfit(trade.entry, trade.exit, trade.type)
    dayToProfit[key] = (dayToProfit[key] || 0) + profit
  }
  // Return sorted by date ascending
  return Object.entries(dayToProfit)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([date, profit]) => ({ date, profit: Number(profit.toFixed(2)) }))
}

export function computeCumulativeSeries(dailyProfits) {
  const series = []
  let running = 0
  for (const dp of dailyProfits) {
    running += dp.profit
    series.push({ date: dp.date, cumulative: Number(running.toFixed(2)) })
  }
  return series
}

export function computeDailyDrawdowns(dailyProfits, startingBalance) {
  let balance = startingBalance
  const results = []
  for (const { date, profit } of dailyProfits) {
    balance += profit
    // A daily drawdown is the negative portion of profit for that day
    const drawdown = profit < 0 ? Math.abs(profit) : 0
    const maxAllowedDailyDD = startingBalance * 0.05
    const violates = drawdown > maxAllowedDailyDD
    results.push({
      date,
      drawdown: Number(drawdown.toFixed(2)),
      limit: Number(maxAllowedDailyDD.toFixed(2)),
      violates,
      balance: Number(balance.toFixed(2)),
    })
  }
  return results
}

export function isEligibleForWithdrawal(dailyDrawdowns) {
  // Eligible if no violations occurred
  return !dailyDrawdowns.some(d => d.violates)
}

export function sumTotalProfit(trades) {
  return trades.reduce((sum, t) => sum + calculateProfit(t.entry, t.exit, t.type), 0)
}

export const ACCOUNT_SIZES = [50000, 100000, 200000]

