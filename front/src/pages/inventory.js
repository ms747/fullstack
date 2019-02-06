import React from "react";
import axios from "axios";

class Inventory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentWillMount() {
        const user = localStorage.getItem("user")
        if (!user) {
            this.props.history.push("/");
        }
        axios.get("http://localhost:3333/item").then(data=>{
            this.setState({items:data.data.items})
        })
    }

    logout = () => {
        localStorage.removeItem("user")
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <h1>Inventory</h1>
                <button onClick={this.logout}>logout</button>
                <h2>Items</h2>
                <ul>

                </ul>
            </div>
        )
    }
}

export default Inventory;