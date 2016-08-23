import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';


let stateTree = createStore

var App = React.createClass({
  getInitialState: function () {
    return {text: ''};
  },
  componentDidMount: function(){
    fetch('http://localhost:8080/itamlink/status')
    .then(data => data.text())
    .then(text => this.setState({text: text}))
    .catch(err => console.log(err))
  },
  render: function() {

    return <div>Response - {this.state.text}</div>
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
