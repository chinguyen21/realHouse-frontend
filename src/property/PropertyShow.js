import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import HouseIcon from '@material-ui/icons/House';
import GavelIcon from '@material-ui/icons/Gavel';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const PropertyShow = ({properties, user}) => {

  let match = useRouteMatch();
  let property = properties.find(property => property.id === parseInt(match.params.propertyId))

  const style={
      background:"#ebe6e6",
      font:"20px"
    }

  return(
    <div>
      {property ? 
      <div className="property-show">
        <div className="property-show-photos"><img src = {property.photos[0].src} width="100%" height="50%"></img></div>

       <div className="property-show-1">
            <div className="address">Address: {property.full_address}, {property.city}, {property.state_code}</div>
            <div className="price">${property.price.includes(" ") ? <span>{property.price.split(" ")[0]}+</span> : property.price}/month</div>
            <div className="contact">{property.owner_contact}</div>
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
            <div><img src="https://img.icons8.com/nolan/48/fridge.png"/><p>Refrigerator</p></div>
            <div><img src="https://img.icons8.com/fluent/48/000000/bath.png"/><p>Baths</p></div>
            <div><img src="https://img.icons8.com/nolan/48/bed.png"/><p>Beds</p></div>
            <div><img src="https://img.icons8.com/nolan/48/balcony.png"/><p>Balcony</p></div>
            <div><img src="https://img.icons8.com/ultraviolet/48/000000/heating-room.png"/><p>Heating</p></div>
            <div><img src="https://img.icons8.com/nolan/48/washing-machine.png"/><p>Washer</p></div>
            <div><img src="https://img.icons8.com/ultraviolet/48/000000/elevator.png"/><p>Elevator</p></div>
            <div><img src="https://img.icons8.com/nolan/48/parking.png"/><p>Parking Lot</p></div>
            <div><img src="https://img.icons8.com/color/48/000000/strength.png"/><p>Fitness Center</p></div>
            <div><img src="https://img.icons8.com/nolan/48/dishwasher.png"/><p>Dishwasher</p></div>
            <div><img src="https://img.icons8.com/cute-clipart/48/000000/wheelchair.png"/><p>Wheelchair accessibility</p></div>
            <div><img src="https://img.icons8.com/nolan/48/wallmount-camera.png"/><p>Security camera</p></div>
            <div><img src="https://img.icons8.com/nolan/48/keyhole-shield.png"/><p>Digital Lock</p></div>
            <div><img src="https://img.icons8.com/nolan/48/cat.png"/><p>Cat</p></div>
            <div><img src="https://img.icons8.com/nolan/48/dog.png"/><p>Dog</p></div>
          </div>





        {property.list_date}
        <br/>
        {property.last_update}
        <br/>
        </div>
        : null}
    </div>
  )
}

export default PropertyShow;