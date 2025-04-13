import { useState } from 'react'

type Transaction = {
  title: string
  date: string
  amount: number
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [balance, setBalance] = useState(8420.75)
  const [iban, setIban] = useState('DK22 1234 5678 9101 1121')
  const [transactions, setTransactions] = useState<Transaction[]>([
    { title: 'Starbucks', date: '11.04.2025', amount: -39.75 },
    { title: 'Galactic Payroll', date: '10.04.2025', amount: 17200 },
    { title: 'Lunar Leje', date: '01.04.2025', amount: -9000 },
  ])
  const [showAdmin, setShowAdmin] = useState(false)
  const [newTx, setNewTx] = useState({ title: '', date: '', amount: '' })

  const handleLogin = () => {
    if (pin === '1323') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Forkert PIN')
    }
  }

  const addTransaction = () => {
    const parsedAmount = parseFloat(newTx.amount)
    if (!newTx.title || !newTx.date || isNaN(parsedAmount)) return
    const tx: Transaction = {
      title: newTx.title,
      date: newTx.date,
      amount: parsedAmount,
    }
    setTransactions([tx, ...transactions])
    setNewTx({ title: '', date: '', amount: '' })
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      {!isLoggedIn ? (
        <div
          style={{
            maxWidth: '400px',
            margin: '4rem auto',
            padding: '2rem',
            background: '#f0f0f0',
            borderRadius: '12px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
            Lunar Login
          </h2>
          <input
            type="text"
            placeholder="Navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
          />
          {error && (
            <p style={{ color: 'red', fontSize: '0.8rem' }}>{error}</p>
          )}
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              marginTop: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Log ind
          </button>
        </div>
      ) : (
     <div
  style={{
    maxWidth: '100%',
    margin: '0 auto',
    padding: '1rem',
    boxSizing: 'border-box'
  }}
>
          <div
            style={{
              background: '#4f46e5',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px 12px 0 0',
              position: 'relative',
            }}
          >
            <h1>Lunar</h1>
            <p>Hej, {name}!</p>
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '1.25rem',
                cursor: 'pointer',
              }}
              title="Admin"
            >
              ⚙️
            </button>
          </div>

          {showAdmin && (
            <div
              style={{
                background: '#eee',
                padding: '1rem',
                borderBottom: '1px solid #ccc',
              }}
            >
              <h3>Admin Panel</h3>
              <div>
                <label>Kontostand (DKK):</label>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(parseFloat(e.target.value))}
                  style={{ width: '100%', marginBottom: '0.5rem' }}
                />
              </div>
              <div>
                <label>IBAN:</label>
                <input
                  type="text"
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem' }}
                />
              </div>
              <div>
                <label>Ny transaktion:</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <input
                    placeholder="Titel"
                    value={newTx.title}
                    onChange={(e) =>
                      setNewTx({ ...newTx, title: e.target.value })
                    }
                  />
                  <input
                    placeholder="Dato"
                    value={newTx.date}
                    onChange={(e) =>
                      setNewTx({ ...newTx, date: e.target.value })
                    }
                  />
                  <input
                    placeholder="Beløb"
                    value={newTx.amount}
                    onChange={(e) =>
                      setNewTx({ ...newTx, amount: e.target.value })
                    }
                  />
                </div>
                <button
                  onClick={addTransaction}
                  style={{
                    marginTop: '0.5rem',
                    background: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  ➕ Tilføj
                </button>
              </div>
            </div>
          )}

          <div style={{ padding: '1rem' }}>
            <h2>Primær konto</h2>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {balance.toLocaleString('da-DK', {
                style: 'currency',
                currency: 'DKK',
              })}
            </p>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>IBAN: {iban}</p>
          </div>

          <div style={{ padding: '1rem' }}>
            <h3>Seneste transaktioner</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {transactions.map((tx, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #eee',
                    padding: '0.5rem 0',
                  }}
                >
                  <div>
                    <strong>{tx.title}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      {tx.date}
                    </div>
                  </div>
                  <div
                    style={{
                      color: tx.amount < 0 ? 'red' : 'green',
                      fontWeight: 'bold',
                    }}
                  >
                    {tx.amount.toLocaleString('da-DK', {
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
