import { useState } from 'react'

interface Transaction {
  title: string
  date: string
  amount: number
  direction: 'in' | 'out'
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [activeTab, setActiveTab] = useState<'reg' | 'iban'>('reg')
  const [balance, setBalance] = useState(8420.75)
  const [iban, setIban] = useState('DK22 1234 5678 9101 1121')
  const [transactions, setTransactions] = useState<Transaction[]>([
    { title: 'Rema1000', date: '2025-04-07', amount: 290.57, direction: 'out' },
    { title: 'Carbis Food', date: '2025-04-04', amount: 8340.0, direction: 'in' },
    { title: 'Haderslev Kommune', date: '2025-04-02', amount: 2000.0, direction: 'in' },
    { title: 'Netto', date: '2025-03-07', amount: 241.61, direction: 'out' },
  ])

  const handleLogin = () => {
    if (pin === '1323') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Incorrect PIN')
    }
  }

  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#fff', minHeight: '100vh', overflowX: 'hidden', padding: 0, margin: 0 }}>
      {!isLoggedIn ? (
        <div style={{ maxWidth: 400, margin: '4rem auto', background: '#1a1a1a', padding: '2rem', borderRadius: 12 }}>
          <h2 style={{ textAlign: 'center' }}>Lunar Login</h2>
          <input type="password" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 8, borderRadius: 6 }} />
          {error && <p style={{ color: 'red', fontSize: 12 }}>{error}</p>}
          <button onClick={handleLogin} style={{ width: '100%', padding: 10, background: '#4f46e5', border: 'none', color: '#fff', borderRadius: 8 }}>
            Log in
          </button>
        </div>
      ) : (
        <div style={{ width: '100%' }}>
          <div style={{ background: '#4f46e5', padding: '1rem 1.5rem', borderRadius: '12px 12px 0 0', position: 'relative' }}>
            <h1>Lunar</h1>
            <button onClick={() => setShowMenu(!showMenu)} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', color: '#fff', fontSize: 20 }}>
              ⋮
            </button>
            {showMenu && (
              <div style={{ position: 'absolute', top: 48, right: 16, background: '#222', borderRadius: 8, padding: '0.5rem' }}>
                <button onClick={() => window.location.reload()} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Sign out
                </button>
              </div>
            )}
            <button
              onClick={() => setShowTransfer(!showTransfer)}
              style={{ marginTop: '1rem', background: '#fff', color: '#4f46e5', border: 'none', padding: '0.5rem 1rem', borderRadius: 6 }}
            >
              ➕ Transfer Money
            </button>
          </div>

          {showTransfer && (
            <div style={{ background: '#1f1f1f', padding: '1rem' }}>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <button onClick={() => setActiveTab('reg')} style={{ flex: 1, padding: '0.5rem', background: activeTab === 'reg' ? '#4f46e5' : '#333', color: '#fff' }}>
                  Reg & Konto
                </button>
                <button onClick={() => setActiveTab('iban')} style={{ flex: 1, padding: '0.5rem', background: activeTab === 'iban' ? '#4f46e5' : '#333', color: '#fff' }}>
                  IBAN & BIC
                </button>
              </div>
              {activeTab === 'reg' ? (
                <>
                  <input placeholder="Reg. Nr" style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                  <input placeholder="Konto Nr" style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                  <input placeholder="Betrag (DKK)" style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                </>
              ) : (
                <>
                  <input placeholder="IBAN" style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                  <input placeholder="BIC" style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                  <input placeholder="Betrag (DKK)" style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                </>
              )}
              <button style={{ width: '100%', padding: 10, background: '#4f46e5', border: 'none', color: '#fff', borderRadius: 8 }}>
                Bestätigen
              </button>
            </div>
          )}

          <div style={{ background: '#1e1e1e', borderRadius: 12, padding: '1rem', margin: '1rem' }}>
            <p style={{ fontSize: 14, color: '#aaa' }}>Primary account</p>
            <h2>{balance.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}</h2>
            <p style={{ fontSize: 12, color: '#777' }}>IBAN: {iban}</p>
          </div>

          <div style={{ padding: '0 1rem' }}>
            <h3>Latest Transactions</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {transactions.map((tx, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '10px',
                    marginBottom: '0.75rem',
                  }}
                >
                  <div>
                    <strong>{tx.title}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>{tx.date}</div>
                  </div>
                  <div
                    style={{
                      color: tx.direction === 'out' ? '#f87171' : '#4ade80',
                      fontWeight: 600,
                    }}
                  >
                    {(tx.direction === 'out' ? '-' : '+') + tx.amount.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}
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
