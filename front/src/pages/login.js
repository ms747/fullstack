import React from "react"
import axios from "axios"

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "admin",
			password: "admin123456",
			error: "",
		}
	}

	componentWillMount() {
		const user = localStorage.getItem("user")
		if (user) {
			this.props.history.push("/inventory")
		}
	}

	componentDidMount() {
		console.log(this.props)
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = e => {
		e.preventDefault()
		axios
			.post("http://localhost:3333/login", {
				username: this.state.username,
				password: this.state.password,
			})
			.then(data => {
				if (data.data.error) {
					console.log(data.data)
					this.setState({ error: data.data.error })
				}
				if (data.data.user) {
					localStorage.setItem("user", data.data.user)
					this.props.history.push("/inventory")
				}
			})
	}

	render() {
		return (
			<div className="login-page">
				{this.state.error !== "" ? <p>{this.state.error}</p> : null}
				<form
					onSubmit={this.handleSubmit}
					className="my-form text-dark"
				>
					<fieldset>
						<div className="form-group">
							<p>Username</p>
							<input
								id="username"
								name="username"
								value={this.state.username}
								onChange={this.handleChange}
							/>
						</div>
						<div className="form-group">
							<p>Password</p>
							<input
								id="password"
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</div>
					</fieldset>
					<br />
					<button className="btn btn-primary">Sign In</button>
				</form>
				<div className="mt-5">
					<p>Note: </p>
					<p>Username: user Password: user123456 - Normal User</p>
					<p>Username: admin Password: admin123456 - Admin User</p>
				</div>
			</div>
		)
	}
}

export default Login
