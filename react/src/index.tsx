import React from 'react';
import ReactDOM from 'react-dom';
import './assets/less/index.less';
import App from './components/app';
import * as serviceWorker from './serviceWorker';

const data = {
  status: 200,
  error: '',
  data: [{
    news_id: 51184,
    title: 'iPhone X Review: Innovative future with real black technology',
    source: 'Netease phone'
  }, {
    news_id: 51183,
    title: 'Traffic paradise: How to design streets for people and unmanned vehicles in the future?',
    source: 'Netease smart'
  }, {
    news_id: 51182,
    title: 'Teslamask\'s American Business Relations: The government does not pay billions to build factories',
    source: 'AI Finance',
    members: ['Daniel', 'Mike', 'John']
  }]
};

ReactDOM.render(<App data={data} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
