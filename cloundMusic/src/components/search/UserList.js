import React, {Component} from 'react'

import  './UserList.scss'

class UserList extends Component {


    render() {
        const {list} = this.props;
        return (
            <div>
                {
                    list.map((item,i)=>
                        <div key={i} className="search-list-special">
                            <div className="search-special-img">
                                <img src={item.avatarUrl} />
                            </div>
                            <div className="search-special-right">
                                <div className="search-special-name">
                                    <span dangerouslySetInnerHTML={{__html:item.nickname}}></span>
                                </div>
                                <div className="search-special-singer">
                                    <span className="public-ellipsis">{item.signature}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default UserList