import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import Card from '../model/Card';
import { castDraft } from 'immer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/interfaces';
import { User } from '../model/User';
import { Inventory } from '../model/Inventory';

interface IStateProps {
    user: User,
    Inventories: Inventory[]
}

function CurrencyConversion() {
    const { Inventories, user} = useSelector<AppState, IStateProps>((state: AppState) => {
        return {
          Inventories: state.Inventories,
          user: state.User
        };
      });
// Initializing all the state variables
const [info, setInfo] = useState([]);
const [input, setInput] = useState(0);
const [from, setFrom] = useState("usd");
const [to, setTo] = useState("hrk");
const [options, setOptions] = useState<string[]>([]); 
const [output, setOutput] = useState(0);

// Calling the api whenever the dependency changes
useEffect(() => {
	Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
.then((res) => {
	setInfo(res.data[from]);
	})
}, [from]);

// Calling the convert function whenever
// a user switches the currency
useEffect(() => {
	setOptions(Object.keys(info));
	convert();
}, [info])
	
// Function to convert the currency
function convert() {
	let y = Object.entries(info).filter(x=>x[0]==to)
    var x = Object.fromEntries(y)
    var rate = Object.values(x)
    console.log(rate[0]);
    console.log(input)
     setOutput(input * rate[0]);
}

// Function to switch between two currency
function flip() {
	var temp = from;
	setFrom(to);
	setTo(temp);
}

return (
	<div className="App">
	<div className="heading">
        <br/>
		<h1>Currency converter</h1>
	</div>
	<div className="container">
		<div className="left">
		<h3>Price</h3>
		<input type="text"
            disabled = {false}
			placeholder="Enter card price"
		    onChange={(e) => setInput(parseFloat(e.target.value))}
             />
		</div>
		<div className="middle">
		<h3>From</h3>
		<Dropdown options={options}
					onChange={(e) => { setFrom(e.value) }}
		value={from} placeholder="From" />
		</div>
		<div className="switch">
		<HiSwitchHorizontal size="30px"
						onClick={() => { flip()}}/>
		</div>
		<div className="right">
		<h3>To</h3>
		<Dropdown options={options}
					onChange={(e) => {setTo(e.value)}}
		value={to} placeholder="To" />
		</div>
	</div>
	<div className="result">
		<button onClick={()=>{convert()}}>Convert</button>
		<h2>Converted Amount:</h2>
		<p>{input+" "+from+" = "+output.toFixed(2) + " " + to}</p>

	</div>
	</div>
);
}

export default CurrencyConversion;