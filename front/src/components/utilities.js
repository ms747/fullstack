import React from "react"
import Auth from "./auth"

const Utilities = props => {
	function viewItem() {
		props.history.push(`/inventory/${props.id}`)
	}

	function editItem() {
		props.history.push(`/inventory/edit/${props.id}`)
	}

	function deleteItem(id) {
		props.delete(id)
	}

	return (
		<div>
			<button className="btn btn-primary" onClick={viewItem}>View</button>
			<Auth>
				<button className="btn btn-info" onClick={editItem}>Edit</button>
				<button className="btn btn-danger" onClick={()=>{deleteItem(props.id)}}>Delete</button>
			</Auth>
		</div>
	)
}

export default Utilities
