import icon from '../../resources/icons/ethereum.png'
import './transactionList.scss';

const TransactionList = () => {

    return (
        <ul className="transactionList">
            <li className="transactionList__item">
                <img src={icon} alt="icon" />
                <span>Ethereum</span>
                <span>Buy</span>
                <span>18.11.2022</span>
                <span>276 $</span>
            </li>
            <li className="transactionList__item">
                <img src={icon} alt="icon" />
                <span>Ethereum</span>
                <span>Buy</span>
                <span>18.11.2022</span>
                <span>276 $</span>
            </li>
            <li className="transactionList__item">
                <img src={icon} alt="icon" />
                <span>Ethereum</span>
                <span>Buy</span>
                <span>18.11.2022</span>
                <span>276 $</span>
            </li>
            <li className="transactionList__item">
                <img src={icon} alt="icon" />
                <span>Ethereum</span>
                <span>Buy</span>
                <span>18.11.2022</span>
                <span>276 $</span>
            </li>
            <li className="transactionList__item">
            <   img src={icon} alt="icon" />
                <span>Ethereum</span>
                <span>Buy</span>
                <span>18.11.2022</span>
                <span>276 $</span>
            </li>
        </ul>
    )
}

export default TransactionList;