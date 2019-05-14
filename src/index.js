import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import * as serviceWorker from './serviceWorker';

const option = {
    openAtStart: true,
    autoToggle: 2000,
    bannerclass: {
        opened: 'red',
        closed: 'blue',
        opening: 'green',
        closing: 'purple',
    },
    button: {
        closeText: 'close',
        openText: 'open',
        class: ''
    },
    transition: true,
    whenTransition: function () {
        console.log('whenTransition000000');
    }
}
ReactDOM.render(<App option={option} />, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
