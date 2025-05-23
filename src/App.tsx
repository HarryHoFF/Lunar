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
  const [balance] = useState(5517.50)
  const [iban] = useState('DK02 6695 2000 7458 58')
  const [transactions] = useState<Transaction[]>([
    { title: 'Rema1000', date: '2025-05-23', amount: 189.00, direction: 'out' },
    { title: 'Ines Ehlerts', date: '2025-05-22', amount: 380.00, direction: 'out' },
    { title: 'Sunset Boulevard', date: '2025-05-21', amount: 248.00, direction: 'out' }, 
    { title: 'Rema1000', date: '2025-05-20', amount: 378.00, direction: 'out' },
    { title: 'Netto', date: '2025-05-19', amount: 298, direction: 'out' },
    { title: 'Carbis Food', date: '2025-05-18', amount: 7980.0, direction: 'in' },
    { title: 'Netto', date: '2025-05-18', amount: 127.00, direction: 'out' },
    { title: 'MobilePay', date: '2025-05-15', amount: 5500.00, direction: 'in' },
    { title: 'Netto', date: '2025-05-12', amount: 135.00, direction: 'out' },
    { title: 'Rema1000', date: '2025-05-11', amount: 147.00, direction: 'out' },
    { title: 'OK', date: '2025-05-11', amount: 148.00, direction: 'out' },
    { title: 'Netto', date: '2025-05-11', amount: 228.00, direction: 'out' },
    { title: 'Ines Ehlerts', date: '2025-05-10', amount: 4850.00, direction: 'out' },
    { title: 'Pinocchio Haderslev', date: '2025-05-08', amount: 196.00, direction: 'out' },
    { title: 'Netto', date: '2025-05-07', amount: 220.50, direction: 'out' },
    { title: 'Sunset Boulevard', date: '2025-05-07', amount: 248.00, direction: 'out' }, 
    { title: 'Netto', date: '2025-05-06', amount: 467.50, direction: 'out' },
    { title: 'Aral', date: '2025-05-05', amount: 255.38, direction: 'out' },
    { title: 'Rewe', date: '2025-05-05', amount: 168.65, direction: 'out' },
    { title: 'Rewe', date: '2025-05-02', amount: 214.00, direction: 'out' },
    { title: 'Jet', date: '2025-05-02', amount: 538.00, direction: 'out' },
    { title: "McDonald's", date: '2025-04-30', amount: 170.50, direction: 'out' },
    { title: 'Sunset Boulevard', date: '2025-04-29', amount: 248.00, direction: 'out' },
    { title: 'Carbis Food', date: '2025-04-25', amount: 7980.0, direction: 'in' },
    { title: 'Ines Ehlerts', date: '2025-04-25', amount: 8350.00, direction: 'out' },
    { title: 'Netto', date: '2025-04-24', amount: 76.00, direction: 'out' },
    { title: 'Maxi Zoo', date: '2025-04-24', amount: 39.00, direction: 'out' },
    { title: 'Burger King', date: '2025-04-23', amount: 85.00, direction: 'out' },
    { title: 'Petz', date: '2025-04-23', amount: 19.00, direction: 'out' },
    { title: 'Netto', date: '2025-04-23', amount: 154.50, direction: 'out' },
    { title: 'Ines Ehlerts (undeployed)', date: '2025-04-16', amount: 1500.00, direction: 'out' },
    { title: 'Ines Ehlerts (undeployed)', date: '2025-04-16', amount: 2425.00, direction: 'out' },
    { title: 'Ines Ehlerts (undeployed)', date: '2025-04-16', amount: 4425.00, direction: 'out' },
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
  const [showTransferForm, setShowTransferForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'domestic' | 'international'>('domestic')
  const [domesticTransfer, setDomesticTransfer] = useState({
    name: '',
    regNr: '',
    accountNr: '',
    amount: ''
  })
  const [internationalTransfer, setInternationalTransfer] = useState({
    name: '',
    iban: '',
    bic: '',
    amount: ''
  })

  const handleLogin = () => {
    if (pin === '1323') {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Incorrect PIN')
    }
  }

  const handleDomesticTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    // Hier würde die Überweisungslogik implementiert werden
    alert(`Domestic transfer submitted: ${JSON.stringify(domesticTransfer)}`)
    setShowTransferForm(false)
  }

  const handleInternationalTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    // Hier würde die Überweisungslogik implementiert werden
    alert(`International transfer submitted: ${JSON.stringify(internationalTransfer)}`)
    setShowTransferForm(false)
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
          {error && <p style={{ color: 'red', fontSize: 12 }}>{error}</p>}
          <button
            onClick={handleLogin}
            style={{ width: '100%', padding: 10, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 8 }}
          >
            Log in
          </button>
        </div>
      ) : (
        <div>
          <div style={{ background: '#4f46e5', padding: '1rem 1.5rem', borderRadius: '12px 12px 0 0', position: 'relative' }}>
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
                <button onClick={() => window.location.reload()} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem 0.5rem' }}>
                  Sign out
                </button>
              </div>
            )}
          </div>

          <div style={{ background: '#1e1e1e', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: 14, color: '#aaa' }}>Primary account</p>
            <h2 style={{ margin: '0.5rem 0' }}>{balance.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}</h2>
            <p style={{ fontSize: 12, color: '#777' }}>IBAN: {iban}</p>
            
            <button 
              onClick={() => setShowTransferForm(true)}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '15px',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              New Transfer
            </button>
          </div>

          {showTransferForm && (
            <div style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{ 
                backgroundColor: '#1a1a1a', 
                padding: '20px', 
                borderRadius: '12px', 
                width: '90%', 
                maxWidth: '500px'
              }}>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                  <button 
                    onClick={() => setActiveTab('domestic')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: activeTab === 'domestic' ? '#4f46e5' : '#333',
                      color: 'white',
                      border: 'none',
                      borderTopLeftRadius: '8px',
                      borderBottomLeftRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Regular
                  </button>
                  <button 
                    onClick={() => setActiveTab('international')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: activeTab === 'international' ? '#4f46e5' : '#333',
                      color: 'white',
                      border: 'none',
                      borderTopRightRadius: '8px',
                      borderBottomRightRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    International
                  </button>
                </div>

                {activeTab === 'domestic' ? (
                  <form onSubmit={handleDomesticTransfer}>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Recipient Name</label>
                      <input
                        type="text"
                        value={domesticTransfer.name}
                        onChange={(e) => setDomesticTransfer({...domesticTransfer, name: e.target.value})}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#333', color: 'white', border: 'none' }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Registration Number</label>
                      <input
                        type="text"
                        value={domesticTransfer.regNr}
                        onChange={(e) => setDomesticTransfer({...domesticTransfer, regNr: e.target.value})}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#333', color: 'white', border: 'none' }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Account Number</label>
                      <input
                        type="text"
                        value={domesticTransfer.accountNr}
                        onChange={(e) => setDomesticTransfer({...domesticTransfer, accountNr: e.target.value})}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#333', color: 'white', border: 'none' }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Amount</label>
                      <input
                        type="number"
                        value={domesticTransfer.amount}
                        onChange={(e) => setDomesticTransfer({...domesticTransfer, amount: e.target.value})}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#333', color: 'white', border: 'none' }}
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        type="submit"
                        style={{
                          flex: 1,
                          padding: '10px',
                          backgroundColor: '#4f46e5',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Send
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowTransferForm(false)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          backgroundColor: '#333',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleInternationalTransfer}>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Recipient Name</label>
                      <input
                        type="text"
                        value={internationalTransfer.name}
                        onChange={(e) => setInternationalTransfer({...internationalTransfer, name: e.target.value})}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#333', color: 'white', border: 'none' }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>IBAN</label>
                      <input
                        type="text"
                        value={internationalTransfer.iban}
                        onChange={(e) => setInternationalTransfer({...internationalTransfer, iban: e.target.value})}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#333', color: 'white', border: 'none' }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>BIC</label>
                      <input
                        type="text"
                        value={internationalTransfer.bic}
                        onChange={(e) => setInternationalTransfer({...internationalTransfer, bic: e.target.value})}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#333', color: 'white', border: 'none' }}
                        required
                      />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Amount</label>
                      <input
                        type="number"
                        value={internationalTransfer.amount}
                        onChange={(e) => setInternationalTransfer({...internationalTransfer, amount: e.target.value})}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#333', color: 'white', border: 'none' }}
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        type="submit"
                        style={{
                          flex: 1,
                          padding: '10px',
                          backgroundColor: '#4f46e5',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Send
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowTransferForm(false)}
                        style={{
                          flex: 1,
                          padding: '10px',
                          backgroundColor: '#333',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          <div>
            <h3>Latest Transactions</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {transactions.map((tx, i) => (
                <li key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '10px',
                  marginBottom: '0.75rem',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 500, color: '#fff' }}>{tx.title}</span>
                    <span style={{ fontSize: '0.75rem', color: '#888' }}>{tx.date}</span>
                  </div>
                  <div style={{
                    color: tx.direction === 'out' ? '#f87171' : '#4ade80',
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}>
                    {(tx.direction === 'out' ? '-' : '+') + tx.amount.toLocaleString('da-DK', {
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
