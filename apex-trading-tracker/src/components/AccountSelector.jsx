import { ACCOUNT_SIZES } from '../utils/apexRules'

export default function AccountSelector({ accountSize, onChange }) {
  return (
    <div className="p-4 mb-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Account Size</h2>
      <div className="flex gap-2">
        {ACCOUNT_SIZES.map(size => (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            className={`px-4 py-2 rounded border ${
              accountSize === size
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300'
            }`}
          >
            ${size.toLocaleString()}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Initial balance is set to the selected account size.
      </p>
    </div>
  )
}

