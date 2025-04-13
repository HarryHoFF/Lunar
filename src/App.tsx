import { useState } from 'react'

// Typen für Transaktionen
interface Transaction {
  title: string
  date: string
  amount: number
  direction: 'in' | 'out'
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [balance, setBalance] = useState(8420.75)
  const [iban, setIban] = useState('DK22 1234 5678 9101 1121')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [showAdmin, setShowAdmin] = useState(false)
const [newTx, setNewTx] = useState<{ title: string; date: string; amount: string; direction: 'in' | 'out' }>({
  title: '',
  date: '',
  amount: '',
  direction: 'out',
})
  const [transfer, setTransfer] = useState({ to: '', iban: '', amount: '' })
  const [confirmation, setConfirmation] = useState('')
  const [filter, setFilter] = useState<'all' | 'in' | 'out'>('all')

  const handleLogin = () => {
    if (pin === '1323') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Forkert PIN')
    }
  }

  const addTransaction = () => {
    const amount = parseFloat(newTx.amount)
    if (!newTx.title || !newTx.date || isNaN(amount)) return
    const tx: Transaction = {
      title: newTx.title,
      date: newTx.date,
      amount,
      direction: newTx.direction,
    }
    setTransactions([tx, ...transactions])
    setBalance((prev) => prev + (newTx.direction === 'in' ? amount : -amount))
    setNewTx({ title: '', date: '', amount: '', direction: 'out' })
  }

  const sendTransfer = () => {
    const amount = parseFloat(transfer.amount)
    if (!transfer.to || !transfer.iban || isNaN(amount)) return
    const date = new Date().toLocaleDateString('da-DK')
    const tx: Transaction = {
      title: `Overførsel til ${transfer.to}`,
      date,
      amount,
      direction: 'out',
    }
    setTransactions([tx, ...transactions])
    setBalance(balance - amount)
    setConfirmation(`Overførsel sendt til ${transfer.to}`)
    setTransfer({ to: '', iban: '', amount: '' })
    setTimeout(() => setConfirmation(''), 4000)
  }

  const filteredTxs =
    filter === 'all'
      ? transactions
      : transactions.filter((tx) => tx.direction === filter)

  return (
    <div
      style={{
        backgroundColor: '#0f0f0f',
        minHeight: '100vh',
        padding: '1.5rem',
        fontFamily: 'Inter, sans-serif',
        color: '#fff',
      }}
    >
      {!isLoggedIn ? (
        <div style={{ maxWidth: 400, margin: '4rem auto', background: '#1a1a1a', padding: '2rem', borderRadius: 12 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Lunar Login</h2>
          <input
            type="text"
            placeholder="Navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 6 }}
          />
          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 6 }}
          />
          {error && <p style={{ color: 'red', fontSize: 12 }}>{error}</p>}
          <button
            onClick={handleLogin}
            style={{ width: '100%', padding: 10, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8 }}
          >
            Log ind
          </button>
        </div>
      ) : (
        <div>
          <div style={{ background: '#4f46e5', padding: '1rem 1.5rem', borderRadius: '12px 12px 0 0' }}>
            <h1>Lunar</h1>
            <p>Hej, {name}!</p>
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', color: '#fff', fontSize: 20 }}
            >
              ⚙️
            </button>
          </div>

          {showAdmin && (
            <div style={{ background: '#1f1f1f', padding: '1rem', marginBottom: '1rem' }}>
              <h3>Admin Panel</h3>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(parseFloat(e.target.value))}
                placeholder="Kontostand"
                style={{ width: '100%', marginBottom: 8, padding: 8 }}
              />
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                placeholder="IBAN"
                style={{ width: '100%', marginBottom: 8, padding: 8 }}
              />
              <input
                type="text"
                value={newTx.title}
                onChange={(e) => setNewTx({ ...newTx, title: e.target.value })}
                placeholder="Titel"
                style={{ width: '100%', marginBottom: 8, padding: 8 }}
              />
              <input
                type="date"
                value={newTx.date}
                onChange={(e) => setNewTx({ ...newTx, date: e.target.value })}
                style={{ width: '100%', marginBottom: 8, padding: 8 }}
              />
              <input
                type="number"
                value={newTx.amount}
                onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                placeholder="Beløb"
                style={{ width: '100%', marginBottom: 8, padding: 8 }}
              />
              <select
                value={newTx.direction}
                onChange={(e) => setNewTx({ ...newTx, direction: e.target.value as 'in' | 'out' })}
                style={{ width: '100%', marginBottom: 8, padding: 8 }}
              >
                <option value="out">Udgang</option>
                <option value="in">Indgang</option>
              </select>
              <button
                onClick={addTransaction}
                style={{ width: '100%', padding: 10, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8 }}
              >
                Tilføj transaktion
              </button>
            </div>
          )}

          <div style={{ background: '#1e1e1e', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: 14, color: '#aaa' }}>Primær konto</p>
            <h2 style={{ margin: '0.5rem 0' }}>{balance.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}</h2>
            <p style={{ fontSize: 12, color: '#777' }}>IBAN: {iban}</p>
          </div>

          <div style={{ background: '#1e1e1e', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
            <h3>Ny overførsel</h3>
            <input
              placeholder="Modtager navn"
              value={transfer.to}
              onChange={(e) => setTransfer({ ...transfer, to: e.target.value })}
              style={{ width: '100%', marginBottom: 8, padding: 8 }}
            />
            <input
              placeholder="IBAN"
              value={transfer.iban}
              onChange={(e) => setTransfer({ ...transfer, iban: e.target.value })}
              style={{ width: '100%', marginBottom: 8, padding: 8 }}
            />
            <input
              placeholder="Beløb"
              value={transfer.amount}
              onChange={(e) => setTransfer({ ...transfer, amount: e.target.value })}
              style={{ width: '100%', marginBottom: 8, padding: 8 }}
            />
            <button
              onClick={sendTransfer}
              style={{ width: '100%', padding: 10, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8 }}
            >
              Send
            </button>
            {confirmation && (
              <p style={{ marginTop: 8, color: '#4ade80' }}>✅ {confirmation}</p>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <button onClick={() => setFilter('all')} style={{ marginRight: 8 }}>Alle</button>
            <button onClick={() => setFilter('in')} style={{ marginRight: 8 }}>Ind</button>
            <button onClick={() => setFilter('out')}>Ud</button>
          </div>

          <div>
            <h3>Seneste transaktioner</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {filteredTxs.map((tx, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '10px',
                    marginBottom: '0.75rem',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 500, color: '#fff' }}>{tx.title}</span>
                    <span style={{ fontSize: '0.75rem', color: '#888' }}>{tx.date}</span>
                  </div>
                  <div
                    style={{
                      color: tx.direction === 'out' ? '#f87171' : '#4ade80',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    {(tx.direction === 'out' ? '-' : '+') +
                      tx.amount.toLocaleString('da-DK', {
                        style: 'currency',
                        currency: 'DKK',
                      })}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
