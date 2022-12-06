import { useHttp } from "../hooks/http.hook";


import crypto from 'crypto-browserify';



const useCryptoService = () => {
    const {loading, request, error, clearError} = useHttp();

    const api_key = 'U0agEbblySd8kSdn0R';
    const apiSecret = 'U5iElEDTAJLqOki3qs9UQLj8VWqR4MCFBqMV';

    // const api_key = 'xxemLYPxfAs0cE3GYM';
    // const apiSecret = '3VKhuGWj8sRxsGfoTbxGxW0D3hmIdZ6NjHal';


    
    let timestamp = Date.now().toString();



    const sign = crypto.createHmac('sha256', apiSecret).update(`api_key=${api_key}&timestamp=${timestamp}`).digest('hex');


    const getTransactionHistory = async () => {
        const res = await request(`https://api-testnet.bybit.com/v2/private/exchange-order/list?api_key=${api_key}&timestamp=${timestamp}&sign=${sign}`
        )
        console.log(Object.values(res.result).map(transformeTransaction));
        return Object.values(res.result).map(transformeTransaction);
    }

    const transformeTransaction = (item) => {
        return {
            from: item.from_coin,
            to: item.to_coin,
            amount: item.to_amount
        }
    }

    const getWalletBalance = async () => {
        let signBalance = crypto.createHmac('sha256', apiSecret).update(`api_key=${api_key}&coin=USDT&timestamp=${timestamp}`).digest('hex');
        const res = await request(`https://api-testnet.bybit.com/v2/private/wallet/balance?api_key=${api_key}&coin=USDT&timestamp=${timestamp}&sign=${signBalance}`);
        return Math.round(Object.values(res.result)[0].available_balance);
    }


    const getPricesForGraphBtc= async () => {
        const res = await request(`https://api-testnet.bybit.com/v2/public/index-price-kline?symbol=BTCUSD&interval=M&limit=12&from=1640995200`);
        return res.result.map(transformKline);
    }

    const getPricesForGraphEth= async () => {
        const res = await request(`https://api-testnet.bybit.com/v2/public/index-price-kline?symbol=ETHUSD&interval=M&limit=12&from=1640995200`);
        return res.result.map(transformKline);
    }

    const getPricesForGrapLtc = async () => {
        const res = await request(`https://api-testnet.bybit.com/v2/public/index-price-kline?symbol=LTCUSD&interval=M&limit=12&from=140995200`);
        return res.result.map(transformKline);
    }

    const transformKline = (item) => {
        return item.open
    }


    const getPrices = async () => {
        const res = await request('https://api.bybit.com/v2/public/tickers');

        let firstNumber = +(Math.round((Math.random() * (184 - 0) + 0)));
        let secondNumber = firstNumber + 10;

        return res.result.slice(firstNumber, secondNumber).map(transformCoin);
    }

    const transformCoin = (item) => {
        return {
            price: item.index_price,
            name: item.symbol,
            price_24h_pcnt: item.price_24h_pcnt
        }
    }


    return {loading, error, clearError, getPrices, getPricesForGraphBtc, getPricesForGraphEth, getPricesForGrapLtc, getWalletBalance, getTransactionHistory}
}

export default useCryptoService;