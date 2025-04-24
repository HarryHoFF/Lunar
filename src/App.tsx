import { useState } from 'react'

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
  const [showMenu, setShowMenu] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [activeTab, setActiveTab] = useState<'reg' | 'iban'>('reg')
  const [newTx, setNewTx] = useState({ title: '', amount: '' })
  const [transactions, setTransactions] = useState<Transaction[]>([
    { title: 'Rema1000', date: '2025-04-07', amount: 290.57, direction: 'out' },
    { title: 'Jem&Fix', date: '2025-04-07', amount: 562.11, direction: 'out' },
    { title: 'Netto', date: '2025-04-07', amount: 192.4, direction: 'out' },
    { title: 'Netto', date: '2025-04-07', amount: 158.33, direction: 'out' },
    { title: 'Jem&Fix', date: '2025-04-07', amount: 590.0, direction: 'out' },
    { title: 'Jem&Fix', date: '2025-04-06', amount: 193.43, direction: 'out' },
    { title: "McDonald's", date: '2025-04-05', amount: 260.59, direction: 'out' },
    { title: 'Netto', date: '2025-04-05', amount: 195.24, direction: 'out' },
    { title: 'Netto', date: '2025-04-05', amount: 101.64, direction: 'out' },
    { title: 'Carbis Food', date: '2025-04-04', amount: 8340.0, direction: 'in' },
    { title: 'Haderslev Kommune', date: '2025-04-02', amount: 2000.0, direction: 'in' },
    { title: 'Rema1000', date: '2025-04-02', amount: 98.73, direction: 'out' },
    { title: 'Netto', date: '2025-04-01', amount: 154.04, direction: 'out' },
    { title: 'Netto', date: '2025-03-31', amount: 303.89, direction: 'out' },
    { title: 'TSW Service', date: '2025-03-29', amount: 226.39, direction: 'out' },
    { title: 'Netto', date: '2025-03-28', amount: 359.44, direction: 'out' },
    { title: 'GooglePay', date: '2025-03-26', amount: 288.35, direction: 'out' },
    { title: 'Netto', date: '2025-03-26', amount: 152.67, direction: 'out' },
    { title: 'GooglePay', date: '2025-03-25', amount: 297.7, direction: 'out' },
    { title: 'TSW Service', date: '2025-03-25', amount: 547.35, direction: 'out' },
    { title: 'Rema1000', date: '2025-03-24', amount: 569.03, direction: 'out' },
    { title: 'GooglePay', date: '2025-03-24', amount: 151.36, direction: 'out' },
    { title: 'Rema1000', date: '2025-03-23', amount: 479.73, direction: 'out' },
    { title: 'Netto', date: '2025-03-22', amount: 483.23, direction: 'out' },
    { title: 'Rema1000', date: '2025-03-20', amount: 538.77, direction: 'out' },
    { title: 'Netto', date: '2025-03-20', amount: 583.52, direction: 'out' },
    { title: 'Netto', date: '2025-03-18', amount: 585.04, direction: 'out' },
    { title: 'GooglePay', date: '2025-03-15', amount: 148.13, direction: 'out' },
    { title: 'Netto', date: '2025-03-15', amount: 537.5, direction: 'out' },
    { title: 'Burger King', date: '2025-03-14', amount: 380.93, direction: 'out' },
    { title: 'Jem&Fix', date: '2025-03-13', amount: 364.56, direction: 'out' },
    { title: 'Sunset Boulevard', date: '2025-03-13', amount: 536.71, direction: 'out' },
    { title: 'GooglePay', date: '2025-03-11', amount: 270.0, direction: 'out' },
    { title: "McDonald's", date: '2025-03-10', amount: 426.9, direction: 'out' },
    { title: 'Rema1000', date: '2025-03-09', amount: 181.55, direction: 'out' },
    { title: 'Penny', date: '2025-03-09', amount: 487.71, direction: 'out' },
    { title: 'Edeka', date: '2025-03-08', amount: 363.57, direction: 'out' },
    { title: 'Netto', date: '2025-03-07', amount: 241.61, direction: 'out' }
  ])

  const handleLogin = () => {
    if (pin === '1323') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Incorrect PIN')
    }
  }

  const handleTransfer = () => {
    const amount = parseFloat(newTx.amount)
    if (!newTx.title || isNaN(amount)) return
    const today = new Date().toISOString().slice(0, 10)
    setTransactions([{ title: newTx.title, amount, date: today, direction: 'out' }, ...transactions])
    setBalance((prev) => prev - amount)
    setNewTx({ title: '', amount: '' })
    setShowTransfer(false)
  }

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', padding: '1rem', color: '#fff' }}>
      {!isLoggedIn ? (
        <div style={{ maxWidth: 400, margin: '4rem auto', background: '#1a1a1a', padding: '2rem', borderRadius: 12 }}>
          <h2 style={{ textAlign: 'center' }}>Lunar Login</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', marginBottom: 10, padding: 10 }}
          />
          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{ width: '100%', marginBottom: 10, padding: 10 }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleLogin} style={{ width: '100%', padding: 10, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8 }}>Log in</button>
        </div>
      ) : (
        <div>
          <div style={{ background: '#4f46e5', padding: '1rem', borderRadius: '12px 12px 0 0', marginBottom: '1rem' }}>
            <h1>Lunar</h1>
            <p>Hello, {name}!</p>
            <button
              onClick={() => setShowMenu(!showMenu)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', color: '#fff', fontSize: 20 }}
            >
              ⋮
            </button>
            {showMenu && (
              <div style={{ position: 'absolute', top: 48, right: 16, background: '#222', padding: '0.5rem', borderRadius: 8 }}>
                <button onClick={() => window.location.reload()} style={{ color: '#fff', border: 'none', background: 'none' }}>Sign out</button>
              </div>
            )}
            <button onClick={() => setShowTransfer(true)} style={{ marginTop: '1rem', background: '#fff', color: '#4f46e5', padding: '0.5rem 1rem', borderRadius: 8 }}>
              ➕ New Transfer
            </button>
          </div>

          {showTransfer && (
            <div style={{ background: '#1f1f1f', padding: '1rem', borderRadius: 8, marginBottom: '1rem' }}>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <button onClick={() => setActiveTab('reg')} style={{ flex: 1, padding: 8, background: activeTab === 'reg' ? '#4f46e5' : '#333', color: '#fff', border: 'none' }}>Reg/Account</button>
                <button onClick={() => setActiveTab('iban')} style={{ flex: 1, padding: 8, background: activeTab === 'iban' ? '#4f46e5' : '#333', color: '#fff', border: 'none' }}>IBAN/BIC</button>
              </div>

              {activeTab === 'reg' ? (
                <>
                  <input placeholder="Reg. Number" style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                  <input placeholder="Account Number" style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                </>
              ) : (
                <>
                  <input placeholder="IBAN" style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                  <input placeholder="BIC" style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                </>
              )}

              <input
                placeholder="Name"
                value={newTx.title}
                onChange={(e) => setNewTx({ ...newTx, title: e.target.value })}
                style={{ width: '100%', marginBottom: 8, padding: 8 }}
              />
              <input
                placeholder="Amount"
                type="number"
                value={newTx.amount}
                onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                style={{ width: '100%', marginBottom: 8, padding: 8 }}
              />
              <button onClick={handleTransfer} style={{ width: '100%', padding: 10, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8 }}>Send</button>
            </div>
          )}

          <div>
            <h3>Latest Transactions</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {transactions.map((tx, i) => (
                <li key={i} style={{
                  background: '#1a1a1a',
                  marginBottom: 8,
                  padding: '1rem',
                  borderRadius: 8,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong>{tx.title}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{tx.date}</div>
                    </div>
                    <div style={{ color: tx.direction === 'in' ? 'lightgreen' : 'tomato' }}>
                      {(tx.direction === 'out' ? '-' : '+') + tx.amount.toLocaleString('da-DK', {
                        style: 'currency',
                        currency: 'DKK',
                      })}
                    </div>
                  </div>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#888' }}>
                    Purpose: Placeholder text for purpose
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
