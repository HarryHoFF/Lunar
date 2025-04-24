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
  const [transactions, setTransactions] = useState<Transaction[]>([
    { title: 'Rema1000', date: '2025-04-07', amount: 290.57, direction: 'out' },
    { title: 'Carbis Food', date: '2025-04-04', amount: 8340.0, direction: 'in' },
    { title: 'Haderslev Kommune', date: '2025-04-02', amount: 2000.0, direction: 'in' },
    { title: 'Netto', date: '2025-03-22', amount: 483.23, direction: 'out' },
  ])
  const [showMenu, setShowMenu] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formTab, setFormTab] = useState<'reg' | 'iban'>('reg')
  const [formData, setFormData] = useState({
    regNr: '',
    accountNr: '',
    iban: '',
    bic: '',
    title: '',
    amount: '',
    date: '',
    direction: 'out' as 'in' | 'out'
  })

  const handleLogin = () => {
    if (pin === '1323') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Incorrect PIN')
    }
  }

  const addTransaction = () => {
    const amount = parseFloat(formData.amount)
    if (!formData.title || !formData.date || isNaN(amount)) return
    const tx: Transaction = {
      title: formData.title,
      date: formData.date,
      amount,
      direction: formData.direction,
    }
    setTransactions([tx, ...transactions])
    setBalance(prev => prev + (formData.direction === 'in' ? amount : -amount))
    setFormData({
      regNr: '',
      accountNr: '',
      iban: '',
      bic: '',
      title: '',
      amount: '',
      date: '',
      direction: 'out'
    })
    setShowForm(false)
  }

  return (
    <div style={{ backgroundColor: '#0f0f0f', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif', padding: 0, margin: 0, overflowX: 'hidden' }}>
      {!isLoggedIn ? (
        <div style={{ maxWidth: 400, margin: '4rem auto', background: '#1a1a1a', padding: '2rem', borderRadius: 12 }}>
          <h2 style={{ textAlign: 'center' }}>Lunar Login</h2>
          <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
          <input type="password" placeholder="PIN" value={pin} onChange={e => setPin(e.target.value)} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
          {error && <p style={{ color: 'red', fontSize: 12 }}>{error}</p>}
          <button onClick={handleLogin} style={{ width: '100%', padding: 10, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8 }}>
            Log in
          </button>
        </div>
      ) : (
        <div style={{ padding: '1rem' }}>
          <div style={{ background: '#4f46e5', padding: '1.5rem', borderRadius: '12px', position: 'relative' }}>
            <h1>Lunar</h1>
            <p>Hello, {name}!</p>
            <button
              onClick={() => setShowMenu(!showMenu)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', color: '#fff', fontSize: 20 }}
            >
              ⋮
            </button>
            {showMenu && (
              <div style={{ position: 'absolute', top: 48, right: 16, background: '#222', borderRadius: 8, padding: '0.5rem' }}>
                <button onClick={() => window.location.reload()} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Sign out
                </button>
              </div>
            )}
          </div>

          <button onClick={() => setShowForm(!showForm)} style={{ marginTop: '1rem', width: '100%', padding: '1rem', background: '#1f1f1f', color: '#fff', borderRadius: 8 }}>
            ➕ New Transaction
          </button>

          {showForm && (
            <div style={{ marginTop: '1rem', background: '#1a1a1a', borderRadius: 12, padding: '1rem' }}>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <button onClick={() => setFormTab('reg')} style={{ flex: 1, background: formTab === 'reg' ? '#4f46e5' : '#333', color: '#fff', border: 'none', padding: '0.5rem' }}>
                  Reg & Account
                </button>
                <button onClick={() => setFormTab('iban')} style={{ flex: 1, background: formTab === 'iban' ? '#4f46e5' : '#333', color: '#fff', border: 'none', padding: '0.5rem' }}>
                  IBAN & BIC
                </button>
              </div>
              {formTab === 'reg' ? (
                <>
                  <input placeholder="Reg. Nr." value={formData.regNr} onChange={(e) => setFormData({ ...formData, regNr: e.target.value })} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                  <input placeholder="Account Nr." value={formData.accountNr} onChange={(e) => setFormData({ ...formData, accountNr: e.target.value })} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                </>
              ) : (
                <>
                  <input placeholder="IBAN" value={formData.iban} onChange={(e) => setFormData({ ...formData, iban: e.target.value })} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                  <input placeholder="BIC" value={formData.bic} onChange={(e) => setFormData({ ...formData, bic: e.target.value })} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                </>
              )}
              <input placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
              <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
              <input type="number" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
              <select value={formData.direction} onChange={(e) => setFormData({ ...formData, direction: e.target.value as 'in' | 'out' })} style={{ width: '100%', marginBottom: 8, padding: 8 }}>
                <option value="out">Outgoing</option>
                <option value="in">Incoming</option>
              </select>
              <button onClick={addTransaction} style={{ width: '100%', padding: 10, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8 }}>
                Submit
              </button>
            </div>
          )}

          <div style={{ background: '#1e1e1e', borderRadius: 12, padding: '1rem', marginTop: '1.5rem' }}>
            <p style={{ fontSize: 14, color: '#aaa' }}>Primary account</p>
            <h2 style={{ margin: '0.5rem 0' }}>{balance.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}</h2>
            <p style={{ fontSize: 12, color: '#777' }}>IBAN: {iban}</p>
          </div>

          <div>
            <h3 style={{ marginTop: '1.5rem' }}>Latest Transactions</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {transactions.map((tx, i) => (
                <li key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#1a1a1a',
                  borderRadius: 10,
                  marginBottom: '0.75rem',
                }}>
                  <div>
                    <strong>{tx.title}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{tx.date}</div>
                  </div>
                  <div style={{ color: tx.direction === 'out' ? '#f87171' : '#4ade80', fontWeight: 600 }}>
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
