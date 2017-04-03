import React, { Component } from 'react'
import { connect } from 'react-redux'

class PlayViewPage extends Component{

    render(){
        return(
            <div>
                22
            </div>
        )
    }

}

const mapStateToProps = state => {
    const { changeCurrentPlay } = state
    return{
        currentPlay : changeCurrentPlay.currentPlay
    }
}

export default connect(mapStateToProps)(PlayViewPage)