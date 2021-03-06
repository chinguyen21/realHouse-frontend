import React, {useState} from 'react';
import {useHistory} from "react-router-dom"
import {TextField, Button} from "@material-ui/core"

const Signup = ({setUser, setLoggedIn}) => {

    const [errors, setErrors] = useState([])

    let history = useHistory();

    const handleSubmit = (e) => {
      console.log(e.target.email.value)
      e.preventDefault();
      let new_user = {
        email: e.target.email.value,
        password: e.target.password.value,
        password_confirmation: e.target.password_confirmation.value,
        name: e.target.name.value,
        phone_number: e.target.phone.value,
      }

      fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(new_user)
      })
      .then(res => res.json())
      .then(response => {
        if (response.user) {
          setUser(response.user)
          setLoggedIn(true)
          localStorage.token = response.token
          history.goBack();
        } else {
          setErrors(response.message)
        }
      })
  }

  return(
    <div>
       <header className="App-page-1">
         <div className='picture'>
        <div className="error">{errors ? errors.map(error => <p>{error}</p>) : null}</div>
        <div className="text-header">SIGN UP</div>
        
      <form className="login-form" onSubmit={handleSubmit}>
        <TextField
          className="text-field"
          id="email"
          label="Email"
          variant="filled"
          color="secondary"
          type="email"
          placeholder="email@email.com"
        />
        <br/>
        <TextField
          className="text-field"
          id="password"
          label="Password"
          variant="filled"
          color="secondary"
          type="password"
          placeholder="12345678"
          />
        <br/>
        <TextField
          className="text-field"
          id="password_confirmation"
          label="Password Confirmation"
          variant="filled"
          color="secondary"
          type="password"
          placeholder="12345678"
          />
          <br/>
        <TextField
          className="text-field"
          id="name"
          label="Name"
          variant="filled"
          color="secondary"
          type="text"
          placeholder="Dwayne Johnson"
          />
          <br/>
        <TextField
          className="text-field"
          id="phone"
          label="Phone Number"
          variant="filled"
          color="secondary"
           type="number"
          placeholder="8578888888"
          />
          <br/>

          <div className='submit'>
          <Button type='submit' variant="contained" color="secondary">
            SIGN UP
          </Button>
        </div>
        </form>
        </div>
      </header>
    </div>
  )
}

export default Signup;