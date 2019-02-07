import React from "react"
import axios from "axios"
import Nav from "../components/nav"

class ViewItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			item: null,
		}
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
					this.setState({ item: data.data.item })
				})
		}
	}

	componentDidMount() {
		console.log(this.props)
	}

	renderItem = () => {
		if (this.state.item) {
			return (
				<div className="card p-3 text-dark">
					<p>ID : {this.state.item.id}</p>
					<p>Item : {this.state.item.item}</p>
					<p>Price : {this.state.item.price}</p>
					<p>Quantity : {this.state.item.quantity}</p>
					<p>Shop : {this.state.item.fromShop}</p>
				</div>
			)
		} else {
			return (
				<div className="container">
					<h1 className="mt-5">Item Not Found</h1>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<Nav name="< Back" showSubMenu={false} {...this.props} />
				<div className="container">{this.renderItem()}</div>
			</div>
		)
	}
}

export default ViewItem
