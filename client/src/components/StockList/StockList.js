import React from 'react';
import './StockList.css';

const StockList = props => (
    <div className="list-div">
        <h2>Marketplace</h2>
        <input
            onChange={props.inputChangeHandler}
            value={props.search}
            name="search"
            type="text"
            placeholder="Search for company..."
            id="search"
        />
        <button onClick={props.stockSearchHandler}>Search</button>
        
        <button onClick={props.allStocks}>Browse All {props.exchange} Stocks</button>
    </div>
    
);

export default StockList;