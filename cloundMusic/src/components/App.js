'use strict';


import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, hashHistory } from 'react-router';

import Header from './public/Header';

/**
 * var es5React = React.createClass ES5 实现react组件
 * export default class StaffItem extends React.Component ES6 实现react组件
 *
 */

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header></Header>
            </div>
        );
    }
});


//最终渲染
ReactDom.render((
    <Router history={hashHistory}>
        <Route path='/' component={App}></Route>
        <Route path='/' component={App}></Route>
     {/*   <Route path='/list' component={List} />
        <Route path='/detail' component={Detail} />*/}
    </Router>
), document.getElementById('app'));
