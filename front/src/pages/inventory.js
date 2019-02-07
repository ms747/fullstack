import React from "react"
import axios from "axios"
import Utilities from "../components/utilities"
import Nav from "../components/nav"

class Inventory extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			items: [],
		}
	}

	componentWillMount() {
		const user = localStorage.getItem("user")
		if (!user) {
			this.props.history.push("/")
		} else {
			axios.get("http://localhost:3333/item").then(data => {
				this.setState({ items: data.data.items }, () => {
					console.log(this.state.items)
				})
			})
		}
	}

	logout = () => {
		localStorage.removeItem("user")
		this.props.history.push("/")
	}

	deleteItem = id => {
		axios.delete(`http://localhost:3333/item/${id}`).then(() => {
			const filteredItems = this.state.items.filter(
				item => item.id !== id
			)
			this.setState({ items: filteredItems })
		})
	}

	renderList = () => {
		return (
			<ul>
				<div className="container">
					<div className="row">
						{this.state.items.map(item => {
							return (
								<li key={item.id}>
									<div
										className="card text-dark mb-3 mr-3"
										style={{ maxWidth: "22rem", padding: "1rem" }}
									>
										<p>ID: {item.id}</p>
										<p>Name: {item.item}</p>
										<p>Price : {item.price}</p>
										<p>Quantity : {item.quantity}</p>
										<p>Shop : {item.fromShop}</p>
										<Utilities
											id={item.id}
											{...this.props}
											delete={this.deleteItem}
										/>
									</div>
								</li>
							)
						})}
					</div>
				</div>
			</ul>
		)
	}

	render() {
		return (
			<div>
				<Nav name="Inventory" {...this.props} showSubMenu={true} />
				{this.renderList()}
			</div>
		)
	}
}

export default Inventory
