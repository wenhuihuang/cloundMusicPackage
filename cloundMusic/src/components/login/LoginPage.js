import React, { Component, PropTypes } from "react"
import { connect } from 'react-redux'
import { login } from '../../actions/index'

class LoginPage extends Component{

    constructor(props){
        super(props);
        this.state = {username : '', password : ""};

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log(this.state)
        const { dispatch } = this.props
        debugger
        dispatch(login(this.state))
        event.preventDefault();
    }


    render(){
        return(
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">用户：</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    <label htmlFor="password">密码：</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <input type="button" value="Submit" onClick={this.handleSubmit}/>
                </form>

            </div>
        )
    }
}

const mapStateToProps = state => {
    const { dispatch } = state
    return{
        dispatch : dispatch
    }
}



export default connect(mapStateToProps)(LoginPage)