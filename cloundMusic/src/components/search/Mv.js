import React, {Component} from 'react'
import {Link} from 'react-router'
import './Mv.scss'

class Mv extends Component{

    eachArray(arr) {
        let name = []
        if(arr.length<0)return;
        arr.forEach(function (item, i) {
            name.push(item.name)
        })
        return name.join('/');
    }

    render(){
        const {list} = this.props;
        return(
            <div>
                <ul className="public-clearfix list-wrapper" id="playlist" >
                    {
                        list.map( ( item, i ) =>
                            <li key={i} className="list-col">
                                <Link to={'/playlist/detail/'+item.id} >
                                    <div className="list-media">
                                        <img data-src={item.cover} src='' />
                                        <span className="listen-count">
                                    <i className="icon iconfont">&#xe652;</i>
                                    <span> {
                                        ( count =>  (count+'').length > 5 ? (count+'').slice(0,-4)+'万' : count )(item.playCount)
                                    } </span>
                                </span>
                                        <p className="list-creator">
                                            <span className="public-ellipsis">{
                                                (dur => parseInt(dur/1000/60) + ":" + Math.round(((dur/1000/60)-parseInt(dur/1000/60))*60) )(item.duration)
                                            }</span>
                                        </p>
                                    </div>
                                    <div className="list-info">
                                        <h3 className="list-name">{item.name}</h3>
                                        <div>
                                            <span dangerouslySetInnerHTML={{__html:this.eachArray(item.artists)}}></span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }

}

export default Mv