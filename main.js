import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';

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

// reducer functions
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {id: action.id, text: action.text, completed: false}
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));

        default:
            return state;
    }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

const todoApp = combineReducers({todos, visibilityFilter});
//
// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(state.todos, action),
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//     }
// }

const store = createStore(todoApp)

// React
let nextTodoId = 0;
class TodoApp extends React.Component {
    render() {
        return (
            <div>
                <input ref={node => {
                    this.input = node;
                }}/>
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    this.input.value = '';
                }}>Add Todo</button>
                <ul>
                    {this.props.todos.map(todo => <li key={todo.id}>
                        {todo.text}
                    </li>)}
                </ul>
            </div>
        );
    }
}

const render = () => {
    ReactDOM.render(
        <TodoApp todos={store.getState().todos}/>, document.getElementById('app'))
};

store.subscribe(render);
render();

// tests
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

    expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Hello',
            completed: false
        }, {
            id: 1,
            text: 'GoodBye',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    }
    const stateAfter = [
        {
            id: 0,
            text: 'Hello',
            completed: false
        }, {
            id: 1,
            text: 'GoodBye',
            completed: true
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);

}

testAddTodo();
testToggleTodo();

console.log('All tests passed!')
