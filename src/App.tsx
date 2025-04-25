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
  const [balance] = useState(35.75)
  const [iban] = useState('DK22 68 7001 0151 1421')
  const [transactions] = useState<Transaction[]>([
    { title: 'Netto', date: '2025-04-24', amount: 76.00, direction: 'out' },
    { title: 'Maxi Zoo', date: '2025-04-24', amount: 39.00, direction: 'out' },
    { title: 'Burger King', date: '2025-04-23', amount: 85.00, direction: 'out' },
    { title: 'Petz', date: '2025-04-23', amount: 19.00, direction: 'out' },
    { title: 'Netto', date: '2025-04-23', amount: 154.50, direction: 'out' },
    { title: 'Ines Ehlerts', date: '2025-04-16', amount: 1500.00, direction: 'out' },
    { title: 'Ines Ehlerts', date: '2025-04-16', amount: 2425.00, direction: 'out' },
    { title: 'Ines Ehlerts', date: '2025-04-16', amount: 4425.00, direction: 'out' },
    { title: 'Rema1000', date: '2025-04-07', amount: 290.57, direction: 'out' },
    { title: 'Jem&Fix', date: '2025-04-07', amount: 562.11, direction: 'out' },
    { title: 'Netto', date: '2025-04-07', amount: 192.4, direction: 'out' },
    { title: 'Netto', date: '2025-04-07', amount: 158.33, direction: 'out' },
    { title: 'Jem&Fix', date: '2025-04-07', amount: 590.0, direction: 'out' },
    { title: 'Jem&Fix', date: '2025-04-06', amount: 193.43, direction: 'out' },
    { title: "McDonald's", date: '2025-04-05', amount: 260.59, direction: 'out' },
    { title: 'Netto', date: '2025-04-05', amount: 195.24, direction: 'out' },
    { title: 'Netto', date: '2025-04-05', amount: 101.64, direction: 'out' },
    { title: 'Jette Diekmann', date: '2025-04-02', amount: 1000.00, direction: 'out' },
    { title: 'Carbis Food', date: '2025-04-04', amount: 8340.0, direction: 'in' },
    { title: 'Haderslev Kommune', date: '2025-04-02', amount: 2000.0, direction: 'in' },
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
    { title: 'Netto', date: '2025-03-07', amount: 241.61, direction: 'out' },
  ])
  const [showMenu, setShowMenu] = useState(false)

  const handleLogin = () => {
    if (pin === '1323') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Incorrect PIN')
    }
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
          <input
            type="text"
            placeholder="Name"
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
          {error && <p style={{ color: 'salmon' }}>{error}</p>}
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: 10,
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              marginTop: 10,
            }}
          >
            Login
          </button>
        </div>
      ) : (
        <div style={{ padding: '1rem' }}>
          <h2 style={{ textAlign: 'center' }}>Willkommen, {name}</h2>
          <p style={{ textAlign: 'center' }}>Kontostand: {balance.toFixed(2)} DKK</p>
          <p style={{ textAlign: 'center' }}>IBAN: {iban}</p>

          <h3 style={{ marginTop: '2rem' }}>Transaktionen</h3>
          {transactions.map((tx, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem 0',
                borderBottom: '1px solid #333',
                textDecoration: tx.title === 'Ines Ehlerts' ? 'line-through' : 'none',
              }}
            >
              <span>{tx.title}</span>
              <span>{tx.date}</span>
              <span style={{ color: tx.direction === 'in' ? 'lightgreen' : 'salmon' }}>
                {tx.direction === 'out' ? '-' : '+'}{tx.amount.toFixed(2)} DKK
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
