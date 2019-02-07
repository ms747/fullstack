import React from "react";

const AddItem = (props) => {
  return (
    <div>
      <button onClick={()=>{props.history.push("/inventory/add")}}>Add</button>
    </div>
  )
}

export default AddItem