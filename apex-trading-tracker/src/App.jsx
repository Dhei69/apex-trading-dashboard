import { useEffect, useMemo, useState } from 'react'
import './index.css'
import AccountSelector from './components/AccountSelector.jsx'
import TradeForm from './components/TradeForm.jsx'
import TradeTable from './components/TradeTable.jsx'
import Dashboard from './components/Dashboard.jsx'
import { ACCOUNT_SIZES } from './utils/apexRules.js'

const STORAGE_KEY = 'apex-trading-tracker:v1'

function App() {
  const [accountSize, setAccountSize] = useState(ACCOUNT_SIZES[0])
  const [trades, setTrades] = useState([])

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.accountSize) setAccountSize(parsed.accountSize)
        if (Array.isArray(parsed.trades)) setTrades(parsed.trades)
      }
    } catch {}
  }, [])

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accountSize, trades }))
  }, [accountSize, trades])

  const startingBalance = useMemo(() => accountSize, [accountSize])

  function handleAddTrade(trade) {
    setTrades(prev => [trade, ...prev])
  }
  function handleDeleteTrade(id) {
    setTrades(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Apex Trading Tracker</h1>
      <AccountSelector accountSize={accountSize} onChange={setAccountSize} />
      <Dashboard trades={trades} startingBalance={startingBalance} />
      <TradeForm onAdd={handleAddTrade} />
      <TradeTable trades={trades} onDelete={handleDeleteTrade} />
      <div className="text-xs text-gray-500 mt-6">
        Data is stored in LocalStorage and will persist across reloads.
      </div>
    </div>
  )
}

export default App
