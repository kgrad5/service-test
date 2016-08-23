import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

// var App = React.createClass({
//   getInitialState: function () {
//     return {text: ''};
//   },
//   componentDidMount: function(){
//     fetch('http://localhost:8080/itamlink/status')
//     .then(data => data.text())
//     .then(text => this.setState({text: text}))
//     .catch(err => console.log(err))
//   },
//   render: function() {
//
//     return <div>Response - {this.state.text}</div>
//   }
// })


// reducer function
const counter = (state = 0, action) => {
  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
}

const Counter = ({value, onIncrement, onDecrement}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>

);

const Input = ({onType}) => (
  <input onKeyUp={onType} />
);

// create a store with a reducer method (counter)
const store = createStore(counter);


const render = () => {
  ReactDOM.render(<Counter value={store.getState()}
  onIncrement={() => store.dispatch({type: 'INCREMENT'})}
  onDecrement={() => store.dispatch({type: 'DECREMENT'})}
  />, document.getElementById('app'))

  ReactDOM.render(<Input onType={() => store.dispatch({type: 'INCREMENT'})}/>,
    document.getElementById('login'))
}
store.subscribe(render);
render();
