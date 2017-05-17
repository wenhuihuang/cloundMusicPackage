import React, {Component} from 'react';

class Single extends Component {

    eachArray(arr) {
        let name = []
        if(arr.length<0)return;
        arr.forEach(function (item, i) {
            name.push(item.name)
        })
        return name.join('/');
    }

    render() {
        const {list} = this.props;
        return (
            <div>
                {
                    list.length>0 &&
                    list.map((item, i)=>
                        <div key={i} className="search-list-item">
                            <div className="search-list-left">
                                <p className="song-name" dangerouslySetInnerHTML={{__html: item.name}}></p>
                                <p className="song-info">
                                        <span dangerouslySetInnerHTML={{__html: this.eachArray(item.artists)}}>

                                        </span>
                                    -
                                    <span dangerouslySetInnerHTML={{__html: item.album.name}}></span>
                                </p>
                            </div>
                            <div className="search-list-right">
                                <span className="icon iconfont">&#xe766;</span>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Single