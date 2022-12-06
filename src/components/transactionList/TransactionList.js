import { useState, useEffect } from 'react';
import useCryptoService from '../../services/CryptoService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import icon from '../../resources/icons/t2.png'
import './transactionList.scss';

const TransactionList = () => {

    const [transactionList, setTransactionList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {loading, error, clearError, getTransactionHistory} = useCryptoService();


    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = (initial) => {
        getTransactionHistory().then(onTransactionsLoaded)
    }

    const onTransactionsLoaded = (newTransactionList) => {
        clearError();
        setTransactionList(transactionList => [...newTransactionList]);
        setNewItemLoading(false);
    }



    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="transactionList__item">
                    <img src={icon} alt="icon" />
                    <span>{item.from}</span>
                    <span>---></span>
                    <span>{item.to}</span>
                    <span>{item.amount}</span>
                </li>
            )
        })
        return (
            <>
                {items}
            </>
        )
    }

    const items = renderItems(transactionList);

    const errorMessage = error? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null
    const content = !(loading || error) ? items : null

    return (
        <ul className="transactionList">
            {errorMessage}
            {spinner}
            {content}
        </ul>
    )
}

export default TransactionList;