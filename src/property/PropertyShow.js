import React, {useState, useRef} from 'react';
import { useRouteMatch } from 'react-router-dom';
import HouseIcon from '@material-ui/icons/House';
import GavelIcon from '@material-ui/icons/Gavel';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField} from '@material-ui/core';
import {Grid, GridList, GridListTile, GridListTileBar, IconButton, Button, Input } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import SendIcon from '@material-ui/icons/Send';
import MessageIcon from '@material-ui/icons/Message';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SchoolIcon from '@material-ui/icons/School';

import Styling from '../css/Styling'
import PopupModal from '../search_page/PopupModal'

import About from '../search_page/About'

const PropertyShow = ({properties, user, setUser, schools}) => {

  const [askLogin, setAskLogin] = useState(false);
  const [showContact, setShowContact] = useState(false)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone_number)
  const [message, setMessage] = useState("")
  const [reply, setReply] = useState("")
  // const contactPop = useRef(null)

  let match = useRouteMatch();
  let property = properties.find(property => property.id === parseInt(match.params.propertyId))
  
  const distance = (lat,lng) => {
    const R = 6371e3; 
    const a1 = lat * Math.PI/180; 
    const a2 = property.latitude * Math.PI/180;
    const delta = (property.latitude-lat) * Math.PI/180;
    const lambdaDelta = (property.longitude-lng) * Math.PI/180;

    const a = Math.sin(delta/2) * Math.sin(delta/2) +
              Math.cos(a1) * Math.cos(a2) *
              Math.sin(lambdaDelta/2) * Math.sin(lambdaDelta/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c / 1609.34; 
    return parseFloat(d.toFixed(2));
  }

  const nearbySchool = () => {
    let fschools = schools;
      fschools = schools.filter(school => Math.abs(school.latitude-property.latitude) <= 0.02 &&
                                    Math.abs(school.longitude-property.longitude) <= 0.02)
    return fschools
  }

  const style={
      background:"#ebe6e6",
      font:"20px"
    }

  const changeDate = (date) => {
    const mydate = new Date(date);
    return mydate.toDateString();
  }

  const handleSave = () => {

        fetch(`http://localhost:3000/fproperties`, {
        method: "POST",
        headers: {"Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.token}`},
        body: JSON.stringify({property_id: property.id})})
        .then(res => res.json())
        .then(() => {
          setUser({...user, saved_properties: [...user.saved_properties, property]})
        })
      }

    const handleRemove = () => {
           fetch(`http://localhost:3000/fproperties/${property.id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.token}`}})
          .then(res => res.json())
          .then(() => {
            setUser({...user, saved_properties: user.saved_properties.filter(p => p.id !== property.id)})
          })
      }

    const handleSubmit = (e) => {
      e.preventDefault();
          fetch(`http://localhost:3000/messages/${property.id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              sender_name: e.target[0].value,
              sender_email: e.target[1].value,
              sender_phone: e.target[2].value,
              message: e.target[3].value
            })
          })
          .then(res => res.json())
          .then(resp => setReply(resp.reply))
          e.target.reset()
    }

    const handleContact = () => {
      setShowContact(!showContact)
      setReply("")
    }

  return(
    <div>
      <PopupModal askLogin={askLogin} setAskLogin={setAskLogin}/>
      {property ? 
      <div className="property-show-page">
        <div className="property-show">

          <GridList cellHeight={500} spacing={15} cols={1} className={Styling().gridList}>
              {property.photos.map((photo) => (
                <GridListTile key={photo.StarBorderIcon}>
                  <img src={photo.src} width="100%" height="100%" alt="" />
                  {!user.saved_properties ? 
                  <GridListTileBar
                      titlePosition="top"
                      actionIcon={
                        <IconButton onClick={()=> setAskLogin(true)} style={{color: "white"}}>
                          <FavoriteIcon />
                        </IconButton>
                      }
                      actionPosition="left"
                      className={Styling().titleBar1}
                    />
                    :
                    user.saved_properties.some(sP => sP.id === property.id) ? 
                    <GridListTileBar
                      titlePosition="top"
                      actionIcon={
                        <IconButton onClick={handleRemove} style={{color: "red"}}>
                          <FavoriteIcon />
                        </IconButton>
                      } 
                      actionPosition="left"
                      className={Styling().titleBar1}
                      />
                        : 
                    <GridListTileBar
                      titlePosition="top"
                      actionIcon={
                        <IconButton onClick={handleSave} style={{color: "white"}}>
                          <FavoriteIcon />
                        </IconButton>
                      }
                      actionPosition="left"
                      className={Styling().titleBar1}
                    />
                }
                  <GridListTileBar 
                    titlePosition="bottom"
                    actionIcon={
                      <IconButton className={Styling().iconPrice}>
                        ${property.price.includes(" ") ? <span>{property.price.split(" ")[0]}+</span> : property.price}/month
                      </IconButton>
                    }
                    actionPosition="left"
                    className={Styling().titleBar2}
                  />
                </GridListTile>
              ))}
            </GridList>

            <div className="property-show-1">
              <div className="address">Address: {property.full_address}, {property.city}, {property.state_code}</div>
              <div className="contact">
                <Button variant="contained" color="secondary" onClick={handleContact}>
                    Contact Property
                  </Button>
              </div>
            </div>


          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"style={style}>Rent</TableCell>
                <TableCell align="center"style={style}>Sqft</TableCell>
                <TableCell align="center"style={style}>Beds</TableCell>
                <TableCell align="center"style={style}>Baths</TableCell>
                <TableCell align="center"style={style}>Available</TableCell>
                <TableCell align="center"style={style}>Lease length</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow >
                  <TableCell align="center">${property.price.split(" ")[0]}-{property.price.split(" ")[1]}</TableCell>
                  <TableCell align="center">{property.sqft ? property.sqft : "500"}+ sqft</TableCell>
                  <TableCell align="center">{property.bedrooms[0]}-{property.bedrooms[2]}</TableCell>
                  <TableCell align="center">{property.bathrooms[0]}-{property.bathrooms[2]}</TableCell>
                  <TableCell align="center">April 4</TableCell>
                  <TableCell align="center">12 months</TableCell>
                </TableRow>
            </TableBody>
          </Table>

          <h2>OVERVIEW</h2>
          <div className="overview">
            <HouseIcon color="secondary"/> 
            <GavelIcon color="secondary"/> 
            <div style={{fontSize:"12px"}}>House Type</div>
            <div style={{fontSize:"12px"}}>Built</div>
            <div>{property.prop_type.slice(0,1).toUpperCase() + property.prop_type.slice(1)}</div>
            <div>{property.year_built}</div>

          </div>

          <h2>Features</h2>
          <div className="features">

            <div><img src="https://img.icons8.com/nolan/64/school.png"/><p>School</p></div>
            {property.refrigerator ? <div><img src="https://img.icons8.com/nolan/48/fridge.png"/><p>Refrigerator</p></div> : null}
            <div><img src="https://img.icons8.com/fluent/48/000000/bath.png"/><p>Baths</p></div>
            <div><img src="https://img.icons8.com/nolan/48/bed.png"/><p>Beds</p></div>
            {property.balcony ?<div><img src="https://img.icons8.com/nolan/48/balcony.png"/><p>Balcony</p></div>: null}
            {property.heating ?<div><img src="https://img.icons8.com/ultraviolet/48/000000/heating-room.png"/><p>Heating</p></div>: null}
            {property.washer ?<div><img src="https://img.icons8.com/nolan/48/washing-machine.png"/><p>Washer</p></div>: null}
            {property.elevator ?<div><img src="https://img.icons8.com/ultraviolet/48/000000/elevator.png"/><p>Elevator</p></div>: null}
            {property.parking ?<div><img src="https://img.icons8.com/nolan/48/parking.png"/><p>Parking</p></div>: null}
            {property.fitness ?<div><img src="https://img.icons8.com/color/48/000000/strength.png"/><p>Fitness Center</p></div>: null}
            {property.dishwasher ?<div><img src="https://img.icons8.com/nolan/48/dishwasher.png"/><p>Dishwasher</p></div>: null}
            {property.wheelchair ?<div><img src="https://img.icons8.com/cute-clipart/48/000000/wheelchair.png"/><p >Wheelchair accessibility</p></div>: null}
            {property.camera ?<div><img src="https://img.icons8.com/nolan/48/wallmount-camera.png"/><p>Camera</p></div>: null}
            {property.digital_lock ?<div><img src="https://img.icons8.com/nolan/48/keyhole-shield.png"/><p>Pwd Lock</p></div>: null}
            {property.allow_pets === "yes" ?<div><img src="https://img.icons8.com/nolan/48/cat.png"/><p>Cat</p></div>: null}
            {property.allow_pets === "yes" ?<div><img src="https://img.icons8.com/nolan/48/dog.png"/><p>Dog</p></div>: null}
          </div>

        <div className="list-update">
          <p className="list-update-1">Listing Date: {property.list_date ? changeDate(property.list_date.split("T")[0]) : "NaN"}</p>
          <p className="list-update-2">Last Update: {changeDate(property.last_update.split("T")[0])}</p>
        </div>
         <h2><SchoolIcon/> NEARBY SCHOOL</h2>
          <div className="nearby-school">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"style={style}>Name</TableCell>
                  <TableCell align="center"style={style}>Level</TableCell>
                  <TableCell align="center"style={style}>Est. Distance(miles)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nearbySchool().slice(0,5).map(school => (
                  <TableRow >
                    <TableCell align="center"><a href={school.website} target="_blank">{school.name}</a></TableCell>
                    <TableCell align="center">{school.levels}</TableCell>
                    <TableCell align="center">{distance(school.latitude, school.longitude)}</TableCell>
                  </TableRow>
                ))}
                  
              </TableBody>
            </Table>
          </div> 
          <About/>

       </div>
       {showContact ? 
                     
        <div className="contact-form"
          >
          <h3 style={{color: "#418287"}}>{reply}</h3>
          {/* <div className={Styling().margin}> */}
          {!reply ? 
          <form onSubmit={handleSubmit}>
            <h4 style={{color: "#418287"}}><PhoneIcon /> {user.id ? property.owner_contact : "Login to see owner contact"}</h4>
            <p>Send a message to owner</p>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item><AccountCircle /></Grid>
              <Grid item ><TextField id="name" value={name} label="Name" onChange={(e) => setName(e.target.value)}/></Grid>
            </Grid>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item><EmailIcon /></Grid>
              <Grid item><TextField id="email" value={email}label="Email" onChange={(e) => setEmail(e.target.value)}/></Grid>
            </Grid>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item><PhoneIcon /></Grid>
              <Grid item><TextField id="phone" value={phone}label="Phone(optional)" onChange={(e) => setPhone(e.target.value)}/></Grid>
            </Grid>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item><MessageIcon /></Grid>
              <Grid item><TextField id="message" value={message}label="Message" onChange={(e) => setMessage(e.target.value)}/></Grid>
            </Grid>
              {/* <p style={{fontSize: "15px"}}>Desire Move-in Date</p> */}
            {/* <Grid container spacing={2} alignItems="flex-end">
              <Grid item><ScheduleIcon /></Grid>
              <Grid item><Input id="date" type="date" label="date"/></Grid>
            </Grid> */}
            <br/>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              endIcon={<SendIcon/>}
              
            >
              Send
            </Button>
            </form>
            : null
            }
        </div>
        : null      
        } 

      </div>
        : null}
    </div>
  )
}

export default PropertyShow;