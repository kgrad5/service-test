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
const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id !== action.id){
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed
        };
      });

    default:
      return state;
  }
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Hello'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Hello',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

testAddTodo();
console.log('All tests passed!')
