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
  const [transactions] = useState<Transaction[]>([
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
    { title: 'Netto', date: '2025-03-07', amount: 241.61, direction: 'out' },
  ])

  return (
    <div style={{ padding: '1rem', maxWidth: 600, margin: '0 auto' }}>
      {!isLoggedIn ? (
        <div>
          <h2>Lunar Login</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: 'block', marginBottom: 10 }}
          />
          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{ display: 'block', marginBottom: 10 }}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={() => {
            if (pin === '1323') {
              setIsLoggedIn(true)
              setError('')
            } else {
              setError('Incorrect PIN')
            }
          }}>Log in</button>
        </div>
      ) : (
        <>
          <h1>Lunar</h1>
          <p>Hello, {name}!</p>
          <h3>Latest Transactions</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {transactions.map((tx, i) => (
              <li key={i} style={{ marginBottom: '1rem', background: '#1a1a1a', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong>{tx.title}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>{tx.date}</div>
                  </div>
                  <div style={{ color: tx.direction === 'out' ? '#f87171' : '#4ade80' }}>
                    {(tx.direction === 'out' ? '-' : '+') +
                      tx.amount.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}
                  </div>
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#999' }}>
                  Verwendungszweck: [Platzhalter]
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
