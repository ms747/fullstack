import React from "react"
import axios from "axios"
import Nav from "../components/nav"

class AddItemPage extends React.Component {
	state = {
		item: "",
		price: 0,
		quantity: 0,
		fromShop: "",
		error: "",
	}

	componentWillMount() {
		const user = localStorage.getItem("user")
		if (user !== "admin") {
			this.props.history.push("/")
		}
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleForm = e => {
		e.preventDefault()
		const { error, ...myData } = this.state
		axios
			.post("http://localhost:3333/item", { ...myData })
			.then(data => {
				this.props.history.push("/inventory")
			})
			.catch(err => {
				this.setState({ error: err.response.data.error })
			})
	}

	DisplayError = () => {
		if (this.state.error && this.state.error !== "") {
			return (
				<div className="alert alert-dismissible alert-danger">
					<button type="button" className="close" data-dismiss="alert">&times;</button>
					<strong>{this.state.error}</strong>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<Nav name="< Back" showSubMenu={false} {...this.props} />
				<div className="container mt-5">
				<h1>Add Item</h1>
				{this.DisplayError()}
					<form onSubmit={this.handleForm}>
						<fieldset className="card pr-2 pl-2 pb-4 text-dark">
							<div>
								<p>Item Name</p>
								<input
									type="text"
									value={this.state.item}
									name="item"
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<p>Item Price : Rs</p>
								<input
									type="number"
									value={this.state.price}
									name="price"
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<p>Item Quantity</p>
								<input
									type="number"
									value={this.state.quantity}
									name="quantity"
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<p>Shop Name</p>
								<input
									type="text"
									value={this.state.fromShop}
									name="fromShop"
									onChange={this.handleChange}
								/>
							</div>
							<br />
							<div>
								<button className="btn btn-success">Save</button>
								<button
									className="btn btn-danger"
									type="button"
									onClick={() => {
										this.props.history.push("/inventory")
									}}
								>
									Cancel
								</button>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		)
	}
}

export default AddItemPage
