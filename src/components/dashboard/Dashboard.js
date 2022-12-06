import TransactionList from '../transactionList/TransactionList';
import { useState, useEffect } from 'react';
import './dashboard.scss';
import useCryptoService from '../../services/CryptoService';
import CoinList from '../randomCoinList/RandomCoinList';
import Graph from '../graph/Graph';
import xi from '../../resources/img/xi.gif';


const Dashboard = () => {


    const name = localStorage.getItem('name').slice(0, 1);
    const surname = localStorage.getItem('surname');
    const [selectedCoin, setCoin] = useState(null);
    const [walletBalance, setWalletBalance] = useState('');

    const  { clearError, getWalletBalance}= useCryptoService();


    const onCoinSelected = (id) => {
        setCoin(id);
    }
    
    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = (initial) => {
        getWalletBalance().then(onBalanceLoaded);
    }

    const onBalanceLoaded = (newBalance) => {
        clearError();
        setWalletBalance(newBalance);
    }

    return (
        <div className="dashboard">
            <div className="dashboard__coin">
            <div className="dashboard__coin_header">
                    <h2>Coins</h2>
            </div>
                <CoinList/>
            </div>
            <div className="dashboard__main">
                <div className="dashboard__main_header">
                    <h1>My card</h1>
                </div>
                <div className="dashboard__main_card">
                    <div>
                        <span className='balance'>Balance:</span>
                        <span className="sum">{walletBalance}$</span>
                        <span className='name'>{surname} {name}.</span>
                    </div>
                    <img className='img' src={xi} alt="animation" />
                    {/* <button onClick={getFirstInformation}>Click</button> */}
                </div>
                <div className="dashboard__main_graph">
                    <Graph onCoinSelected={onCoinSelected}/>
                </div>
            </div>
            <div className="dashboard__sidebar">
                <div className="dashboard__sidebar_header">
                    <h2>Transaction History</h2>
                </div>
                <div className="dashboard__sidebar_content">
                    <TransactionList/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;