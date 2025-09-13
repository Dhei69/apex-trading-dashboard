import { useState } from 'react'

const initialForm = {
  date: '',
  asset: '',
  type: 'Buy',
  entry: '',
  exit: '',
}

export default function TradeForm({ onAdd }) {
  const [form, setForm] = useState(initialForm)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.date || !form.asset || !form.entry || !form.exit) return
    const entry = parseFloat(form.entry)
    const exit = parseFloat(form.exit)
    if (isNaN(entry) || isNaN(exit)) return
    onAdd({
      id: crypto.randomUUID(),
      date: form.date,
      asset: form.asset.trim(),
      type: form.type,
      entry,
      exit,
    })
    setForm(initialForm)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Log Trade</h2>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Asset</label>
          <input type="text" name="asset" value={form.asset} onChange={handleChange} placeholder="ES, NQ, AAPL..." className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Type</label>
          <select name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-3 py-2">
            <option>Buy</option>
            <option>Sell</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Entry</label>
          <input type="number" name="entry" step="0.01" value={form.entry} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Exit</label>
          <input type="number" name="exit" step="0.01" value={form.exit} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="flex items-end">
          <button type="submit" className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add Trade</button>
        </div>
      </div>
    </form>
  )
}

