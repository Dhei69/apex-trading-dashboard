import { calculateProfit } from '../utils/apexRules'

export default function TradeTable({ trades, onDelete }) {
  return (
    <div className="p-4 mb-4 bg-white rounded shadow overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2">Trades</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 pr-4">Date</th>
            <th className="py-2 pr-4">Asset</th>
            <th className="py-2 pr-4">Type</th>
            <th className="py-2 pr-4">Entry</th>
            <th className="py-2 pr-4">Exit</th>
            <th className="py-2 pr-4">P/L</th>
            <th className="py-2 pr-4"></th>
          </tr>
        </thead>
        <tbody>
          {trades.length === 0 && (
            <tr>
              <td className="py-3 text-gray-500" colSpan={7}>No trades yet</td>
            </tr>
          )}
          {trades.map(t => {
            const pl = calculateProfit(t.entry, t.exit, t.type)
            const isNeg = pl < 0
            return (
              <tr key={t.id} className={`border-b ${isNeg ? 'bg-red-50' : 'bg-green-50'}`}>
                <td className="py-2 pr-4">{t.date}</td>
                <td className="py-2 pr-4">{t.asset}</td>
                <td className="py-2 pr-4">{t.type}</td>
                <td className="py-2 pr-4">{t.entry}</td>
                <td className="py-2 pr-4">{t.exit}</td>
                <td className={`py-2 pr-4 font-semibold ${isNeg ? 'text-red-600' : 'text-green-700'}`}>{pl.toFixed(2)}</td>
                <td className="py-2 pr-4">
                  <button onClick={() => onDelete(t.id)} className="text-red-600 hover:text-red-700 underline">Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

