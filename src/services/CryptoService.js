import { useHttp } from "../hooks/http.hook";


import crypto from 'crypto-browserify';







const useCryptoService = () => {
    const {loading, request, error, clearError} = useHttp();

    const api_key = 'U0agEbblySd8kSdn0R';
    const apiSecret = 'U5iElEDTAJLqOki3qs9UQLj8VWqR4MCFBqMV';

    // const api_key = 'xxemLYPxfAs0cE3GYM';
    // const apiSecret = '3VKhuGWj8sRxsGfoTbxGxW0D3hmIdZ6NjHal';


    
    let timestamp = Date.now().toString();

    const expires = new Date().getTime() + 10000;


    const sign = crypto.createHmac('sha256', apiSecret).update('GET/realtime' + expires).digest('hex');

    // const getSignature = () => {
    //     return sign = crypto.createHmac('sha256', apiSecret).update('GET/realtime' + expires).digest('hex')
    // }

    const getFirstInformation = async () => {
        const res = await request(`https://api-testnet.bybit.com/v2/private/wallet/balance?api_key=${api_key}&coin=BTC&timestamp=${timestamp}&sign=${sign}`)
        console.log(res);
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

    return {loading, error, clearError, getPrices, getFirstInformation}
}

export default useCryptoService;