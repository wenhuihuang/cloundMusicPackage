import React , { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchMusicesList } from '../actions/index'
import Header from '../components/header/Header'
import Playlist from '../components/playlist/PlaylistPage'
import AppStyle from './App.scss'
import PlayController from '../components/playController/PlayController'

/**
 * var es5React = React.createClass ES5 实现react组件
 * export default class StaffItem extends React.Component ES6 实现react组件
 *
 */

/* es5
var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header></Header>
            </div>
        );
    }
});*/

class App extends React.Component {

    static propTypes = {
        //receiveMusics: PropTypes.object.isRequired,
    }



    componentDidMount() {


    }


    render () {
        const { children, currentPlay, isPlay, dispatch } = this.props
        return(
            <div>
                <Header></Header>
                <PlayController currentPlay = {currentPlay} isPlay = {isPlay} dispatch = {dispatch} />
                {children}
            </div>

        )
    }
}

const mapStateToProps = state => {
    const { changeCurrentPlay, dispatch } = state
    return {
        currentPlay : changeCurrentPlay.currentPlay,
        isPlay : changeCurrentPlay.isPlay,
        dispatch : dispatch
    }
}


export default connect(mapStateToProps)(App)