import React, { Component } from "react"
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from "react-router-dom"
import Login from "./pages/login"
import Inventory from "./pages/inventory"
import ViewItem from "./pages/view_item"
import AddItemPage from "./pages/additemspage"
import EditItemPage from "./pages/edititemspage"
import "./App.css"

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/inventory" exact component={Inventory} />
					<Route
						path="/inventory/add"
						exact
						component={AddItemPage}
					/>
					<Route
						path="/inventory/edit/:id"
						exact
						component={EditItemPage}
					/>
					<Route path="/inventory/:id" exact component={ViewItem} />
				</Switch>
			</Router>
		)
	}
}

export default App
