import React , { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchMusicesList } from '../actions/index'
import Playlist from '../components/playlist/PlaylistPage'
import AppStyle from './App.scss'
import PlayController from '../components/playController/PlayController'
import PlayViewPage from '../components/playView/PlayViewPage'
import LeftMenu from '../components/leftMenu/LeftMenu'

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
        const { children, changeCurrentPlay, dispatch, isShowPlayView, isShowLeftMenu,receiveLyric,updateCurrentLyric } = this.props
        return(
            <div>
                <PlayController changeCurrentPlay = {changeCurrentPlay}  receiveLyric={receiveLyric} dispatch = {dispatch} />
                <PlayViewPage updateCurrentLyric={updateCurrentLyric} changeCurrentPlay = {changeCurrentPlay} receiveLyric={receiveLyric} dispatch = {dispatch} isShowPlayView = { isShowPlayView } />
                <LeftMenu isShow = {isShowLeftMenu} dispatch = { dispatch } />
                {children}
            </div>

        )
    }
}

const mapStateToProps = state => {
    const { changeCurrentPlay, changeIsShowPlayView, dispatch, changeIsShowLeftMenu,receiveLyric,updateCurrentLyric } = state
    return {
        changeCurrentPlay : changeCurrentPlay,
        isShowPlayView : changeIsShowPlayView.isShowPlayView,
        isShowLeftMenu : changeIsShowLeftMenu.isShowLeftMenu,
        receiveLyric,
        updateCurrentLyric,
        dispatch : dispatch
    }
}


export default connect(mapStateToProps)(App)