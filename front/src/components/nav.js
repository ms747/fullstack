import React from "react"
import { Link } from "react-router-dom"
import Auth from "../components/auth"

const Nav = props => {
	function logout() {
		localStorage.removeItem("user")
		props.history.push("/")
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<Link className="navbar-brand" to="/inventory">
				{props.name}
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarColor01"
				aria-controls="navbarColor01"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>

			<div className="collapse navbar-collapse" id="navbarColor01">
				<ul className="navbar-nav ml-auto">
					<Auth>
						{props.showSubMenu === true ? (
							<li className="nav-item">
								<Link className="nav-link" to="/inventory/add">
									Add Item
								</Link>
							</li>
						) : null}
					</Auth>
					<li className="nav-item">
						<Link className="nav-link" to="/inventory">
							Howdy, {localStorage.getItem("user")}
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/" onClick={logout}>
							Logout
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Nav
