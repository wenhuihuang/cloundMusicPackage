import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './containers/App'
import DMlist from './components/discovrMusic/List'
import PlaylistPage from './components/playlist/PlaylistPage'
import PlaylistDetailPage from './components/playlistDetail/PlaylistDetailPage'
import PlayViewPage from './components/playView/PlayViewPage'
import LoginPage from './components/login/LoginPage'
import SearchPage from './components/search/SearchPage'




export default
    <Route path='/' component={App} >
        <IndexRoute component={DMlist}/> {/*默认首页跳到某个组件*/}
        <Route path="playlist/detail/:playlist_id" component={PlaylistDetailPage} />
        <Route path="playlist/list" component={PlaylistPage} />
        <Route path="playViewPage/show" component={PlayViewPage} />
        <Route path="login" component={LoginPage} />
        <Route path="/search" component={SearchPage} />
    </Route>
