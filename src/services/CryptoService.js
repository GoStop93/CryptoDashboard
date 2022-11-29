import { useHttp } from "../hooks/http.hook";


import crypto from 'crypto-browserify';


const useCryptoService = () => {
    const {loading, request, error, clearError} = useHttp();

    const apiKey = 'IBysRwbhdcd6aEZ452';
    const apiSecret = 'IBysRwbhdcd6aEZ452';
    const timestamp = Date.now().toString();

    const expires = new Date().getTime() + 10000;


    const getFirstInformation = () => {
        const signature = crypto.createHmac('sha256', apiSecret).update('GET/realtime' + expires).digest('hex');
        console.log(signature)
        // const res = await request('https://api-testnet.bybit.com/v2/public/index-price-kline?symbol=BTCUSD&interval=1&limit=2&from=1581231260')
        // console.log(res);
    }

    const getPrices = async () => {
        const res = await request('https://api-testnet.bybit.com/v2/public/tickers');

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