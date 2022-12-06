import { useEffect, useState, useRef } from "react";
import useCryptoService from "../../services/CryptoService";
import ltc from '../../resources/icons/ltc.png';
import btc from '../../resources/icons/bitcoin.png';
import ethereum from '../../resources/icons/ethereum.png';
import PropTypes from 'prop-types';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';


const Graph = (props) => {

    const [coinList, setCoinList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [first, setFirst] = useState(true);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);


    const {loading, error, clearError, getPricesForGraphBtc, getPricesForGraphEth, getPricesForGrapLtc} = useCryptoService();

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

    const options = {
        maintainAspectRaio: false,
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
          },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    useEffect(() => {
        onRequest()
    }, [first, second, third])

    const onRequest = (initial) => {
        if (first === true) {
            getPricesForGraphBtc().then(onPriceLoaded);
        } else if (second === true) {
            getPricesForGraphEth().then(onPriceLoaded);
        } else {
            getPricesForGrapLtc().then(onPriceLoaded);
        }
    }

    const onPriceLoaded = (newPriceList) => {
        clearError();
        setCoinList(coinList => [...newPriceList]);
        setNewItemLoading(false);
    }


    function getDataBtc () {
        return {
            labels,
            datasets: [
                {
                label: 'Price',
                data: coinList,
                borderColor: 'rgb(190, 180, 180)',
                backgroundColor: 'rgba(100, 97, 97, 0.8)',
                },
                {
                label: 'Dataset 2',
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        }
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach( item => item.classList.remove('selected'));                           
        itemRefs.current[id].classList.add('selected');
        itemRefs.current[id].focus();
    }

    function renderItems() {
        return (
            <>
                <div className="dashboard__main_graph_diagram">
                    <Line data={getDataBtc()} options={options}/>
                </div>
            </>
        )
    }

    const item = renderItems();

    const errorMessage = error? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null
    const content = !(loading || error) ? item : null


    return (
        <>
            <ul className="dashboard__main_graph_menu">
                <li className="dashboard__main_graph_menu_item selected"
                    id='0'
                    ref={el => itemRefs.current[0] = el}
                    onClick={() => {
                        props.onCoinSelected(0);
                        focusOnItem(0);
                        setFirst(true);
                        setSecond(false);
                        setThird(false);
                        }}>
                    <div className="dashboard__main_graph_menu_item_name">BTCUSDT</div>
                    <img src={btc} alt="bitcoin" className="dashboard__main_graph_menu_item_img" />
                </li>
                <li className="dashboard__main_graph_menu_item"
                    id='1'
                    ref={el => itemRefs.current[1] = el}
                    onClick={() => {
                        props.onCoinSelected(1);
                        focusOnItem(1);
                        setFirst(false);
                        setSecond(true);
                        setThird(false)}}>
                    <div className="dashboard__main_graph_menu_item_name">ETHUSDT</div>
                    <img src={ethereum} alt="ethereum" className="dashboard__main_graph_menu_item_img" />
                </li>
                <li className="dashboard__main_graph_menu_item"
                    id='2'
                    ref={el => itemRefs.current[2] = el}
                    onClick={() => {;
                        props.onCoinSelected(2);
                        focusOnItem(2);
                        setFirst(false);
                        setSecond(false);
                        setThird(true)}}>
                    <div className="dashboard__main_graph_menu_item_name">LTCUSDT</div>
                    <img src={ltc} alt="mask/usdt" className="dashboard__main_graph_menu_item_img" />
                </li>
            </ul>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}


export default Graph;