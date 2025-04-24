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
  const [iban] = useState('DK22 1234 5678 9101 1121')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [showMenu, setShowMenu] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formTab, setFormTab] = useState<'reg' | 'iban'>('reg')

  const [formData, setFormData] = useState({
    reg: '',
    account: '',
    iban: '',
    bic: '',
    amount: '',
  })

  const handleLogin = () => {
    if (pin === '1323') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Incorrect PIN')
    }
  }

  const sendTransaction = () => {
    if (!formData.amount || isNaN(parseFloat(formData.amount))) return
    setTransactions([
      {
        title: formTab === 'reg' ? `To ${formData.reg}-${formData.account}` : `To ${formData.iban}`,
        date: new Date().toISOString().split('T')[0],
        amount: parseFloat(formData.amount),
        direction: 'out',
      },
      ...transactions,
    ])
    setBalance((b) => b - parseFloat(formData.amount))
    setFormData({ reg: '', account: '', iban: '', bic: '', amount: '' })
    setShowForm(false)
  }

  return (
    <div
      style={{
        backgroundColor: '#0f0f0f',
        minHeight: '100vh',
        padding: 0,
        margin: 0,
        overflowX: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: 'Inter, sans-serif',
        color: '#fff',
      }}
    >
      {!isLoggedIn ? (
        <div style={{ maxWidth: 400, margin: '4rem auto', background: '#1a1a1a', padding: '2rem', borderRadius: 12 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Lunar Login</h2>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 6 }} />
          <input type="password" placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 6 }} />
          {error && <p style={{ color: 'red', fontSize: 12 }}>{error}</p>}
          <button onClick={handleLogin} style={{ width: '100%', padding: 10, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8 }}>
            Log in
          </button>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
          <div style={{ background: '#4f46e5', padding: '1rem 1.5rem', borderRadius: '12px 12px 0 0', position: 'relative' }}>
            <h1>Lunar</h1>
            <p>Hello, {name}!</p>
            <button onClick={() => setShowMenu(!showMenu)} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', color: '#fff', fontSize: 20 }}>⋮</button>
            {showMenu && (
              <div style={{ position: 'absolute', top: 48, right: 16, background: '#222', borderRadius: 8, padding: '0.5rem' }}>
                <button onClick={() => window.location.reload()} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem' }}>Sign out</button>
              </div>
            )}
            <button onClick={() => setShowForm(true)} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#fff', color: '#4f46e5', border: 'none', borderRadius: 8 }}>
              ➕ New Transaction
            </button>
          </div>

          {showForm && (
            <div style={{ background: '#1f1f1f', padding: '1rem', margin: '1rem' }}>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <button onClick={() => setFormTab('reg')} style={{ flex: 1, padding: 10, background: formTab === 'reg' ? '#4f46e5' : '#333', color: '#fff', border: 'none' }}>
                  Reg/Account
                </button>
                <button onClick={() => setFormTab('iban')} style={{ flex: 1, padding: 10, background: formTab === 'iban' ? '#4f46e5' : '#333', color: '#fff', border: 'none' }}>
                  IBAN/BIC
                </button>
              </div>
              {formTab === 'reg' ? (
                <>
                  <input type="text" placeholder="Reg. Number" value={formData.reg} onChange={(e) => setFormData({ ...formData, reg: e.target.value })} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                  <input type="text" placeholder="Account Number" value={formData.account} onChange={(e) => setFormData({ ...formData, account: e.target.value })} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                </>
              ) : (
                <>
                  <input type="text" placeholder="IBAN" value={formData.iban} onChange={(e) => setFormData({ ...formData, iban: e.target.value })} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                  <input type="text" placeholder="BIC" value={formData.bic} onChange={(e) => setFormData({ ...formData, bic: e.target.value })} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
                </>
              )}
              <input type="number" placeholder="Amount (DKK)" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} style={{ width: '100%', marginBottom: 8, padding: 8 }} />
              <button onClick={sendTransaction} style={{ width: '100%', padding: 10, background: '#4ade80', color: '#000', border: 'none', borderRadius: 8 }}>
                Confirm Transaction
              </button>
            </div>
          )}

          <div style={{ background: '#1e1e1e', borderRadius: 12, padding: '1rem', margin: '1rem' }}>
            <p style={{ fontSize: 14, color: '#aaa' }}>Primary account</p>
            <h2 style={{ margin: '0.5rem 0' }}>{balance.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}</h2>
            <p style={{ fontSize: 12, color: '#777' }}>IBAN: {iban}</p>
          </div>

          <div style={{ margin: '1rem' }}>
            <h3>Latest Transactions</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {transactions.map((tx, i) => (
                <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', backgroundColor: '#1a1a1a', borderRadius: '10px', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 500, color: '#fff' }}>{tx.title}</span>
                    <span style={{ fontSize: '0.75rem', color: '#888' }}>{tx.date}</span>
                  </div>
                  <div style={{ color: tx.direction === 'out' ? '#f87171' : '#4ade80', fontWeight: 600, fontSize: '1rem' }}>
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
