'use strict';


import React from 'react';
import ReactDom from 'react-dom';

import { Router,useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'; //react 绑定库 Provider组件用于让所有容器组件都可以访问store，而不必显示地传递它，只需要在渲染根组件时使用即可
import App from './containers/App';
import reducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { createHistory } from 'history';



/*浏览器redux调试工具*/
const enhancers = []
if (true) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

/*//保存自动弹出redux调试工具栏
if (true) {
    if (window.devToolsExtension) {
        window.devToolsExtension.open()
    }
}*/
/*end 浏览器redux调试工具*/


const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    compose(applyMiddleware(...middleware),...enhancers)
)

const browserHistory = useRouterHistory(createHistory)({
    // basename: '/cloundMusic'
})

const history = syncHistoryWithStore(browserHistory, store)


//最终渲染
ReactDom.render((
    <Provider store={store}>
           {/*<App />*/}
        <Router history={history} routes={routes} />
    </Provider>
), document.getElementById('app'));
