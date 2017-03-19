import React , { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchMusicesList } from '../actions/index'
import Header from '../components/header/Header'
import Playlist from '../components/playlist/Playlist'
import AppStyle from './App.scss'

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
        dispatch: PropTypes.func.isRequired
    }

    handleScroll = (event) => {
        const { dispatch, activeItem } = this.props
        let playlistEle = document.getElementById('playlist');

        //获取浏览器视口高度
        let windowHeight = 0

        if(document.compatMode == "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight
        }else{
            windowHeight = document.body.clientHeight
        }

        //palylist 的总高度
        let palylistScrollHeight = playlistEle.scrollHeight;

        //palylist 可视区域高度
        let palylistClientHeight = windowHeight - playlistEle.offsetTop

        //paylist scrollTop
        let palylistTop = playlistEle.scrollTop

        if(palylistTop + palylistClientHeight + 20 >= palylistScrollHeight) { //提前20个像素开始加载
            dispatch(fetchMusicesList(activeItem ))

        }
    }

    componentDidMount() {
        const { dispatch ,activeItem} = this.props
        dispatch(fetchMusicesList(activeItem ))
    }


    render () {
        const { activeItem ,items} = this.props
        const isEmpty = activeItem.length === 0
        return(
            <div>
                <Header></Header>

                <Playlist items={items} activeItem={activeItem} onScroll={this.handleScroll} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { receiveMusics, activeItem }  = state
    const {
        more,
        items
    } = receiveMusics[activeItem] || {
        more : false,
        items : []
    }
    return {
        activeItem,
        more,
        items
   }
}

export default connect(mapStateToProps)(App)