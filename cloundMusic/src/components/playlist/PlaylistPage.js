import React, { Component, PropTypes } from "react"
import { fetchMusicesList } from '../../actions/index'
import PlaylistPageStyle from './PlaylistPage.scss'
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux'

class PlaylistPage extends Component {

    static propTypes = {
        items : PropTypes.array.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentWillMount() {
        const { dispatch ,activeItem} = this.props
        dispatch(fetchMusicesList(activeItem ))

    }

    componentDidMount() {
        this.lazyload()
    }

    componentDidUpdate() {
        this.lazyload()
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


       // var timer;

        this.throttle(this.lazyload,500,1000)()

    }

    throttle(fun, delay, time) {
        var   startTime = new Date();
       // clearTimeout(timer)
        return function (){
            var context = this,
                args = arguments;
            let endTime = new Date();
            if((endTime - startTime) >= time ){
                fun.apply(context, args);
                startTime=endTime;

            }
            setTimeout(fun,delay)
        }
    }

    lazyload () {
        let playlistEle = document.getElementById('playlist');
        let listCol = document.querySelectorAll('.list-col')
        //获取浏览器视口高度
        let windowHeight = 0
        if(document.compatMode == "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight
        }else{
            windowHeight = document.body.clientHeight
        }
        if(playlistEle == null || playlistEle == undefined){
            return
        }
        //palylist 可视区域高度
        let palylistClientHeight = windowHeight - playlistEle.offsetTop

        //paylist scrollTop
        let palylistTop = playlistEle.scrollTop

        console.log(listCol.length)

        for(let i = 0,l = listCol.length; i < l;i++){
            console.log(i)
            let oLi = listCol[i];
            var t = palylistClientHeight+ palylistTop;
            var h = oLi.offsetTop;
            if (h < t) {
                var src=listCol[i].getElementsByTagName('img')[0].getAttribute('data-src');
                listCol[i].getElementsByTagName('img')[0].src=src

            }
        }
    }



    render() {
        const {
            items
        } = this.props

        return (
            <ul className="public-clearfix list-wrapper" id="playlist" onScroll={this.handleScroll}>
                {
                    items.map( ( item, i ) =>
                        <li key={i} className="list-col">
                            <Link to={'/playlist/detail/'+item.id} >
                                <div className="list-media">
                                    <img data-src={item.coverImgUrl} src='' />
                                    <span className="listen-count">
                                    <i className="icon iconfont">&#xe652;</i>
                                    <span> {
                                        ( count =>  (count+'').length > 5 ? (count+'').slice(0,-4)+'万' : count )(item.playCount)
                                    } </span>
                                </span>
                                    <p className="list-creator">
                                        <i className="icon iconfont">&#xe66b;</i>
                                        <span className="public-ellipsis">{item.creator.nickname}</span>
                                    </p>
                                </div>
                                <div className="list-info">
                                    <h3 className="list-name">{item.name}</h3>
                                </div>
                            </Link>
                        </li>
                    )
                }

            </ul>
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



export default connect(mapStateToProps)(PlaylistPage)