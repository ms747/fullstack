import React from "react";
import axios from  "axios";

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            username:"admin",
            password:"admin123456",
            error:""
        }
    }

    componentWillMount(){
        const user = localStorage.getItem("user");
        if(user){
            this.props.history.push("/inventory")
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3333/login",{username:this.state.username,password:this.state.password})
        .then(data=>{
            if(data.data.error){
                console.log(data.data)
                this.setState({error:data.data.error})
            }
            if(data.data.user){
                localStorage.setItem("user",data.data.user);
                this.props.history.push("/inventory")
            }
        })
    }

    render(){
        return(
            <div>
                {this.state.error !== "" ? <p>{this.state.error}</p>:null}
                <form onSubmit={this.handleSubmit}>
                    <p>Username</p>
                    <input id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
                    <p>Password</p>
                    <input id="password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>

                    <br/>
                    <button>Sign In</button>
                </form>
            </div>
        )
    }
}

export default Login;