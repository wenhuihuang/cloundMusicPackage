import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './containers/App'
import PlaylistPage from './components/playlist/PlaylistPage'
import PlaylistDetailPage from './components/playlistDetail/PlaylistDetailPage'

export default
    <Route path='/' component={App} >
        <IndexRoute component={PlaylistPage}/> {/*默认首页跳到某个组件*/}
        <Route path="playlist/detail/:playlist_id" component={PlaylistDetailPage} />
        <Route path="playlist/list" component={PlaylistPage} />
    </Route>
