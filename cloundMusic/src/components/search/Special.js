import React, {Component} from 'react'

import './Special.scss'

class Special extends Component {

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
                    list.map((item,i)=>
                        <div key={i} className="search-list-special">
                            <div className="search-special-img">
                                <img src={item.picUrl} />
                            </div>
                            <div className="search-special-right">
                                <div className="search-special-name">
                                    <span dangerouslySetInnerHTML={{__html:item.name}}></span>
                                </div>
                                <div className="search-special-singer">
                                    <span dangerouslySetInnerHTML={{__html:this.eachArray(item.artists)}}></span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Special