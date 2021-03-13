import React, {useState} from 'react';
import {Button } from '@material-ui/core';
import Property from '../property/Property'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField} from '@material-ui/core';


const Profile = ({user, setUser}) => {
  const [showEditForm, setShowEditForm] = useState(false)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone_number)

  const handleEdit = (e) => {
    e.preventDefault();
    let editUser = {
      email: e.target.email.value,
      name: e.target.name.value,
      phone_number: e.target.phone.value
    }
    fetch(`http://localhost:3000/api/v1/edit`, {
      method: 'POST',
      headers: {"Authorization": `Bearer ${localStorage.token}`,
                "Content-Type": "application/json"},
      body: JSON.stringify(editUser)
    })
    .then(res => res.json())
    .then(updateUser => {
      setUser(updateUser)
      setShowEditForm(false)
    })
    }

    const style={
      background:"#ebe6e6",
      font:"20px",
      color: "#de78a9"
    }

    const changeDate = (date) => {
      const mydate = new Date(date);
      return mydate.toDateString();
  }

  return(
    <div>
      <div className="profile">
        <div className="profile-info">
        <h2 style={{textAlign: 'center', paddingTop: "50px"}}>MY INFO</h2>

          <div className="item-1"><AccountCircleIcon/></div>
          <div className="item-2"><EmailIcon /></div>
          <div className="item-3"><PhoneIcon /></div>
          <div className="item-4">{user.name}</div><br/>
          <div className="item-5">{user.email}</div><br/>
          <div className="item-6">{user.phone_number}</div><br/>
          <div className="item-7">
            <Button variant="contained" color="secondary" onClick={() => setShowEditForm(!showEditForm)}>
                Edit Profile
            </Button>
          </div>
          <div className="item-8">
          {showEditForm ? 
            <form onSubmit={handleEdit}>
              
              <TextField
                id="name"
                label="Name"
                variant="filled"
                color="secondary"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={user.name}
                />
              <br/>
              <TextField
                id="email"
                label="Email"
                variant="filled"
                color="secondary"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user.email}
                />
                <br/>
              <TextField
                id="phone"
                label="Phone Number"
                variant="filled"
                color="secondary"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={user.phone_number}
              />
              <br/>
              <br/>
              <div className='submit'>
                <Button type='submit' variant="outlined" color="secondary" >
                  Edit
                </Button>
              </div>
              </form>
              : null
              }
          </div>
        </div>
        <div className="profile-messages">
              <h2 style={{textAlign: 'center', paddingTop: "50px"}}>MESSAGES</h2>
                <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"style={style}>Date</TableCell>
                  <TableCell align="center"style={style}>Message</TableCell>
                  <TableCell align="center"style={style}>Name</TableCell>
                  <TableCell align="center"style={style}>Email</TableCell>
                  <TableCell align="center"style={style}>Phone Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.messages.map(message => (
                  <TableRow >
                    <TableCell align="center">{changeDate(message.created_at)}</TableCell>
                    <TableCell align="center">{message.message}</TableCell>
                    <TableCell align="center">{message.sender_name}</TableCell>
                    <TableCell align="center">{message.sender_email}</TableCell>
                    <TableCell align="center">{message.sender_phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
    </div>
        <h2 style={{textAlign: 'center'}}>SAVED PROPERTIES</h2>
      
        <div className="houses-container-profile">
            {user.saved_properties ? user.saved_properties.map((property,idx) => <Property key={idx} user={user} setUser={setUser} property={property}/>) : null} 
        </div>
      </div>

  )
}

export default Profile;