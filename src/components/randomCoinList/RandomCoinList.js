import { useEffect, useState } from 'react';
import useCryptoService from '../../services/CryptoService';
import icon from '../../resources/icons/bitcoin.png'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './randomCoinList.scss';

const CoinList = () => {
    const [coinList, setCoinList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    const {loading, error, clearError, getPrices} = useCryptoService();


    
    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = (initial) => {
        getPrices().then(onCointLoaded)
    }

    const onCointLoaded = (newCoinList) => {
        clearError();
        setCoinList(coinList => [...newCoinList]);
        setNewItemLoading(false);
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li className="coinList__item" key={i}>
                <img src={icon} alt={item.name} />
                <span>{item.name}</span>
                <span>{item.price_24h_pcnt}</span>
                <span>{item.price} USDT</span>
            </li>
            )
        })

        return (
            <ul className="coinList">
                {items}
            </ul>
        )
    }

    const items = renderItems(coinList);

    const errorMessage = error? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null
    const content = !(loading || error) ? items : null

    return (
        <>
        {errorMessage}
        {spinner}
        {content}
        <button onClick={() => onRequest()} className="btn-1">Load Coints</button>
        </>
    )
}

export default CoinList;