const Auth = (props) => {
  if(localStorage.getItem("user") === "admin"){
    return props.children
  }
  else{
    return null;
  }
}

export default Auth