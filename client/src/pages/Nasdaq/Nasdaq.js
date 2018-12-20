import React, { Component } from 'react';
import Axios from 'axios';
import './Nasdaq.css';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import StockList from "../../components/StockList";
import StockTable from "../../components/Table";
import StockInfo from "../../components/StockInfo";
import Headlines from "../../components/Headlines";
import Modal from "../../components/Modal";
import BuyModal from "../../components/BuyModal";
import Wrapper from "../../components/Wrapper";

class Nasdaq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData:{},
            stocks: [],
            news: [],
            companyName: "",
            symbol: "",
            market: "",
            latestPrice: "",
            latestTime: "",
            open: "",
            high: "",
            low: "",
            search: "",
            shares: "",
            total: "",
            showTable: false,
            showHeadlines: false,
            showStockInfo: true,
            showModal: false,
            showBuyModal: false,

        }
    }

    componentWillMount() {
        this.iexNasdaqGet();
    }

    iexNasdaqGet = () => {
        Axios.get("https://api.iextrading.com/1.0//stock/AMZN/batch?types=quote,news,chart&range=1m&last=7")
            .then(response => {
                console.log(response);
                //PULLS THE Key Value pairs FROM THE RETURNED JSON OBJECT AND STORES THEM IN dates
                const dates = Object.values(response.data.chart);
                const dateArray = [];
                const dataArray = [];
                const highArray = [];
                const lowArray = [];
                //MAPS THROUGH THE dates array AND PUSHES VALUES TO THEIR RESPECTIVE ARRAY
                dates.map(day => {
                    dateArray.push(day.label);
                    dataArray.push(day.close);
                    highArray.push(day.high);
                    lowArray.push(day.low);
                    return dateArray && dataArray && highArray && lowArray
                })
                //SETS THE STATE WITH THE DATA PULLED FROM THE AXIOS CALL THAT WAS MAPPED INTO ARRAYS
                this.setState({
                    chartData:{
                        labels: dateArray,
                        datasets: [
                            {
                                label: 'Close Price',
                                data: dataArray,
                                backgroundColor:'rgba(28, 12, 247)',
                                type: 'line',
                                pointBackgroundColor:'rgba(28, 12, 247)',
                                pointBorderColor: 'rgba(5, 5, 4)',
                                pointBorderWidth: 5,
                                pointHoverRadius: 7,
                                borderColor: 'rgba(28, 12, 247)',
                                fill: false
                            },
                            {
                                label: 'Daily Low',
                                data: lowArray,
                                backgroundColor:'rgba(241, 35, 8)'
                            },
                            {
                                label: 'Daily High',
                                data: highArray,
                                backgroundColor:'rgba(102, 182, 93)'
                            },
                            
                        ]
                    },
                    options:{
                            title:{
                                display: true,
                                text: response.data.quote.companyName,
                                fontSize: 25
                            },
                            legend:{
                                display: true,
                                position: 'top'
                            }
                    },
                    companyName: response.data.quote.companyName,
                    symbol: response.data.quote.symbol,
                    market: response.data.quote.primaryExchange,
                    latestPrice: response.data.quote.latestPrice,
                    latestTime: response.data.quote.latestTime,
                    open: response.data.quote.open,
                    high: response.data.quote.week52High,
                    low: response.data.quote.week52Low,
                    news: response.data.news
                })
            })
    }

    allNyse = event => {
        event.preventDefault();
        Axios.get("/api/allNasdaq")
            .then(response => {
                this.setState({
                    stocks: response.data,
                    showTable: true
                })
            });
    }

    inputChangeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    stockSearchHandler = event => {
        event.preventDefault();
        Axios.get("/api/nasdaq/" + this.state.search)
            .then(response => {
                this.setState({
                    stocks: response.data,
                    showTable: true
                })
            });
    }

    stockQueryHandler = event => {
        const query = event.target.value;
        Axios.get("https://api.iextrading.com/1.0//stock/" + query + "/batch?types=quote,news,chart&range=1m&last=7")
            .then(response => {
                const dates = Object.values(response.data.chart);
                const dateArray = [];
                const dataArray = [];
                const highArray = [];
                const lowArray = [];
                dates.map(day => {
                    dateArray.push(day.label);
                    dataArray.push(day.close);
                    highArray.push(day.high);
                    lowArray.push(day.low);
                    return dateArray && dataArray && highArray && lowArray
                })
                this.setState({
                    chartData:{
                        labels: dateArray,
                        datasets: [
                            {
                                label: 'Close Price',
                                data: dataArray,
                                backgroundColor:'rgba(28, 12, 247)',
                                type: 'line',
                                pointBackgroundColor:'rgba(28, 12, 247)',
                                pointBorderColor: 'rgba(5, 5, 4)',
                                pointBorderWidth: 5,
                                pointHoverRadius: 7,
                                borderColor: 'rgba(28, 12, 247)',
                                fill: false
                            },
                            {
                                label: 'Daily Low',
                                data: lowArray,
                                backgroundColor:'rgba(241, 35, 8)'
                            },
                            {
                                label: 'Daily High',
                                data: highArray,
                                backgroundColor:'rgba(102, 182, 93)'
                            },
                            
                        ]
                    },
                    options:{
                            title:{
                                display: true,
                                text: response.data.quote.companyName,
                                fontSize: 25
                            },
                            legend:{
                                display: true,
                                position: 'top'
                            }
                    },
                    companyName: response.data.quote.companyName,
                    symbol: response.data.quote.symbol,
                    market: response.data.quote.primaryExchange,
                    latestPrice: response.data.quote.latestPrice,
                    latestTime: response.data.quote.latestTime,
                    open: response.data.quote.open,
                    high: response.data.quote.week52High,
                    low: response.data.quote.week52Low,
                    news: response.data.news
                })
            })
    }

    newsHeadlinesHandler = event => {
        event.preventDefault();
        this.setState({
            showStockInfo: false,
            showHeadlines: true
        });
    }

    sharesPurchaseHandler = () => {
        const mult = this.state.latestPrice;
        const mult1 = this.state.shares;
        const answer = mult * mult1;
        this.setState({
            total: answer.toFixed(2),
            showModal: true
        });
    }

    sharesInputHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    showQuoteHandler = event => {
        event.preventDefault();
        this.setState({
            showHeadlines: false,
            showStockInfo: true
        });
    }

    cancelOrderHandler = () => {
        this.setState({
            showModal: false,
            showBuyModal: false
        });
    }

    buyStockHandler = () => {
        this.setState({
            showModal: false,
            showBuyModal: true
        });
        let todayDate = new Date().toISOString().slice(0,10);
        Axios.post("api/stocks", {
            symbol: this.state.symbol,
            company_name: this.state.companyName,
            market: this.state.market,
            shares: this.state.shares,
            buy_date: todayDate,
            buy_price: this.state.latestPrice,
            current_price: this.state.latestPrice,
            UserId: 1
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    

    render() {
        return (
            <div>
                <h1>NASDAQ PAGE!!!</h1>
                {this.state.showModal === true ?
                    <Modal shares={this.state.shares}
                    company={this.state.companyName}
                    total={this.state.total}
                    cancelOrderHandler={this.cancelOrderHandler}
                    buyStockHandler={this.buyStockHandler}
                    /> : null
                }
                {this.state.showBuyModal === true ?
                    <BuyModal cancelOrderHandler={this.cancelOrderHandler}/> : null
                }
                
                <Wrapper>
                    <div className="list-wrapper">
                        {this.state.showStockInfo === true ?
                            <StockInfo company={this.state.companyName}
                            latestPrice={this.state.latestPrice}
                            latestTime={this.state.latestTime}
                            open={this.state.open}
                            high={this.state.high}
                            low={this.state.low}
                            sharesNum={this.state.sharesNum}
                            newsHeadlinesHandler={this.newsHeadlinesHandler}
                            sharesPurchaseHandler={this.sharesPurchaseHandler}
                            sharesInputHandler={this.sharesInputHandler}
                            /> : null
                        }
                        {this.state.showHeadlines === true ?
                            <Headlines news={this.state.news}
                                        showQuoteHandler={this.showQuoteHandler}
                            /> : null
                    
                        }
                    </div>

                    <BarChart data={this.state.chartData}
                            options={this.state.options}
                    />

                    <div className="list-wrapper">
                        <StockList search={this.state.search}
                                        inputChangeHandler={this.inputChangeHandler}
                                        stockSearchHandler={this.stockSearchHandler}
                                        allStocks={this.allNyse}
                                        exchange={"NASDAQ"}
                                />
                        {this.state.showTable === true ?
                        <StockTable 
                            stocks={this.state.stocks}
                            stockQueryHandler={this.stockQueryHandler}
                        /> : null}
                    </div>
                </Wrapper>
            </div>   
        )
    }
}
    
export default Nasdaq;