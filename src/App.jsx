import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomerPage from './components/CustomerDashboard';
import OwnerPage from './components/OwnerPage';

function App() {
  const [view, setView] = useState('customer');

  return (
    <>
      <Header />
      <nav style={{ padding: 10, textAlign: 'center' }}>
        <button onClick={() => setView('customer')}>Customer View</button>
        <button onClick={() => setView('owner')}>Owner View</button>
      </nav>
      <hr />
      {view === 'customer' ? <CustomerPage /> : <OwnerPage />}
      <Footer />
    </>
  );
}

export default App;
