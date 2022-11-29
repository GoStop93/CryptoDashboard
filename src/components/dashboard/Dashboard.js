import TransactionList from '../transactionList/TransactionList';
import './dashboard.scss';
import useCryptoService from '../../services/CryptoService';
import CoinList from '../randomCoinList/RandomCoinList';

const Dashboard = () => {

    const name = localStorage.getItem('name').slice(0, 1);
    const surname = localStorage.getItem('surname');

    const  {loading, error, clearError, getPrices, getFirstInformation}= useCryptoService();


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
                <div className="dashboard__main_card">
                    <div>
                        <span className='balance'>Balance:</span>
                        <span className="sum">1000$</span>
                        <span className='name'>{surname} {name}.</span>
                    </div>
                    <button onClick={getFirstInformation}>Click</button>
                    {/* <img className='bitcoinImage' src={imgBitcoin} alt="Bitcoin" /> */}
                </div>
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