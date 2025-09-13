import {
  computeDailyProfits,
  computeCumulativeSeries,
  computeDailyDrawdowns,
  isEligibleForWithdrawal,
  sumTotalProfit,
} from '../utils/apexRules'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, BarElement)

export default function Dashboard({ trades, startingBalance }) {
  const dailyProfits = computeDailyProfits(trades)
  const cumulative = computeCumulativeSeries(dailyProfits)
  const dailyDrawdowns = computeDailyDrawdowns(dailyProfits, startingBalance)
  const eligible = isEligibleForWithdrawal(dailyDrawdowns)
  const total = sumTotalProfit(trades)

  const labels = dailyProfits.map(d => d.date)

  const dailyProfitData = {
    labels,
    datasets: [
      {
        label: 'Daily Profit',
        data: dailyProfits.map(d => d.profit),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  }

  const cumulativeData = {
    labels: cumulative.map(c => c.date),
    datasets: [
      {
        label: 'Cumulative P/L',
        data: cumulative.map(c => c.cumulative),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.2,
      },
    ],
  }

  const drawdownData = {
    labels: dailyDrawdowns.map(d => d.date),
    datasets: [
      {
        label: 'Daily Drawdown',
        data: dailyDrawdowns.map(d => d.drawdown),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
      {
        label: 'Max Allowed (5%)',
        data: dailyDrawdowns.map(d => d.limit),
        backgroundColor: 'rgba(107, 114, 128, 0.3)',
      },
    ],
  }

  return (
    <div className="p-4 mb-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-3 bg-green-100 rounded">
          <div className="text-sm text-gray-700">Total Profit</div>
          <div className="text-2xl font-bold text-green-700">{total.toFixed(2)}</div>
        </div>
        <div className="p-3 rounded ${eligible ? 'bg-green-100' : 'bg-red-100'}">
          <div className="text-sm text-gray-700">Status</div>
          <div className={`text-2xl font-bold ${eligible ? 'text-green-700' : 'text-red-700'}`}>
            {eligible ? 'Eligible for withdrawal' : 'Not eligible'}
          </div>
        </div>
        <div className="p-3 bg-blue-100 rounded">
          <div className="text-sm text-gray-700">Account Size</div>
          <div className="text-2xl font-bold text-blue-700">${startingBalance.toLocaleString()}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded p-3">
          <h3 className="font-semibold mb-2">Daily Profit</h3>
          <Bar data={dailyProfitData} options={{ responsive: true, maintainAspectRatio: false }} height={220} />
        </div>
        <div className="bg-white border rounded p-3">
          <h3 className="font-semibold mb-2">Cumulative Performance</h3>
          <Line data={cumulativeData} options={{ responsive: true, maintainAspectRatio: false }} height={220} />
        </div>
        <div className="bg-white border rounded p-3 md:col-span-2">
          <h3 className="font-semibold mb-2">Daily Drawdown vs Limit</h3>
          <Bar data={drawdownData} options={{ responsive: true, maintainAspectRatio: false }} height={240} />
        </div>
      </div>
    </div>
  )
}

