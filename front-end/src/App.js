import React from 'react';

import './App.css';

import WalletCard from './pages/WalletCard';
import CalAvg from './pages/CalAvg';
import HomePage from './pages/HomePage';

function App() {
    return (
        // <div className="App">
        //     <header className="App-header">
        //         {window.ethereum ? <WalletCard /> : <h2> Please install MetaMask</h2>}
        //         <CalAvg />
        //     </header>
        // </div>
        <HomePage />
    );
}

export default App;
