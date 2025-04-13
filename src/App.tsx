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
        <div
          style={{
            maxWidth: '400px',
            margin: '4rem auto',
            padding: '2rem',
            background: '#1a1a1a',
            borderRadius: '12px',
            boxShadow: '0 0 15px rgba(0,0,0,0.2)',
            color: '#fff',
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
            style={{
              width: '100%',
              marginBottom: '0.5rem',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid #333',
              background: '#2a2a2a',
              color: '#fff',
            }}
          />
          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{
              width: '100%',
              marginBottom: '0.5rem',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid #333',
              background: '#2a2a2a',
              color: '#fff',
            }}
          />
          {error && (
            <p style={{ color: '#f87171', fontSize: '0.8rem' }}>{error}</p>
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
            boxSizing: 'border-box',
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
                background: '#1f1f1f',
                padding: '1rem',
                borderBottom: '1px solid #333',
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
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '0.25rem',
                    flexWrap: 'wrap',
                  }}
                >
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
            <div
              style={{
                background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 0 15px rgba(122, 90, 248, 0.3)',
                marginBottom: '1.5rem',
              }}
            >
              <p style={{ fontSize: '0.9rem', color: '#aaa' }}>
                Primær konto
              </p>
              <p
                style={{
                  fontSize: '2rem',
                  fontWeight: 600,
                  margin: '0.5rem 0',
                  color: '#fff',
                }}
              >
                {balance.toLocaleString('da-DK', {
                  style: 'currency',
                  currency: 'DKK',
                })}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#777' }}>IBAN: {iban}</p>
            </div>
          </div>

          <div style={{ padding: '1rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Seneste transaktioner</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {transactions.map((tx, i) => (
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
                    <span style={{ fontWeight: 500, color: '#fff' }}>
                      {tx.title}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#888' }}>
                      {tx.date}
                    </span>
                  </div>
                  <div
                    style={{
                      color: tx.amount < 0 ? '#f87171' : '#4ade80',
                      fontWeight: 600,
                      fontSize: '1rem',
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
