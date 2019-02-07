import React from "react"
import axios from "axios"
import Nav from "../components/nav"

class EditItemPage extends React.Component {
	state = {
		id: 0,
		item: "",
		price: 0,
		quantity: 0,
		fromShop: "",
		error: "",
	}

	componentWillMount() {
		const user = localStorage.getItem("user")
		if (!user) {
			this.props.history.push("/")
		} else {
			axios
				.get(
					`http://localhost:3333/item/${this.props.match.params.id}`
				)
				.then(data => {
					const itemData = data.data.item
					this.setState({
						id: itemData.id,
						item: itemData.item,
						price: itemData.price,
						quantity: itemData.quantity,
						fromShop: itemData.fromShop,
					})
				})
		}
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleForm = e => {
		e.preventDefault()
		const { error, ...myData } = this.state
		axios
			.post(
				`http://localhost:3333/item/${this.props.match.params.id}`,
				{ ...myData }
			)
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
				<div>
					<h1>{this.state.error}</h1>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<Nav name="< Back" />
				<div className="container mt-5">
					<h1>Edit Item</h1>
					{this.DisplayError()}
					<form onSubmit={this.handleForm}>
						<fieldset className="card pr-2 pl-2 pb-4 text-dark">
							<div>
								<div className="form-group">
									<fieldset>
										<p>ID {this.state.id}</p>
									</fieldset>
								</div>
							</div>

							<div className="form-group">
								<fieldset>
									<p>Item Name</p>
									<input
										type="text"
										value={this.state.item}
										name="item"
										onChange={this.handleChange}
									/>
								</fieldset>
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

export default EditItemPage
