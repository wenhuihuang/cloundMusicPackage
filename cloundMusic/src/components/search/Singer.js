import React, {Component} from 'react'

import './Singer.scss'

class Singer extends Component {
    render() {
        const {list} = this.props;
        return (
            <div>
                {
                    list.map((item,i)=>
                        <div key={i} className="search-list-singer">
                            <div className="search-singer-img">
                                <img src={item.img1v1Url} />
                            </div>
                            <div className="search-singer-right">
                                <div className="search-singer-name">
                                    <span dangerouslySetInnerHTML={{__html:item.name}}></span>
                                </div>
                                <div className="search-singer-account">
                                    {item.accountId !=null && item.accountId !="" && item.accountId !=undefined  ? <p><span className="icon iconfont account-icon" >&#xe636;</span><span>已入驻</span></p> : '' }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Singer