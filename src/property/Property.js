import React from 'react';
import {useHistory, Link} from 'react-router-dom'

const Property = ({property, handleSetProperties}) => {
  let history = useHistory();

  const handleRemove =(id) => {
      fetch(`http://localhost:3000/fproperties/${id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}})
    .then(res => res.json())
    .then(() => {
      handleSetProperties(property)
    })
  }

  const handleSave = () => {
      fetch(`http://localhost:3000/fproperties`, {
      method: "POST",
      headers: {"Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.token}`},
      body: JSON.stringify({property_id: property.id})})
    .then(res => res.json())
    .then(() => {
      handleSetProperties(property)
    })
  }

  return (
    <div className="property-box">
      <Link to={`/properties/${property.id}`}><img src = {property.photos[0].src} width="100%" height="70%"></img></Link>
      <div className="property-info-1">
        <p>Beds: {property.bedrooms[0]}-{property.bedrooms[2]}</p>
        <p>Baths: {property.bathrooms[0]}-{property.bathrooms[2]}</p>
        <p>{property.sqft ? property.sqft : "500"}+ sqft</p>
        <p>Pets: {property.allow_pets ? "yes" : "no"}</p>
      </div>

      <div className="property-info-2">
        {history.location.pathname === "/profile" ? <button onClick= {() => handleRemove(property.id)} className="heart">Unsaved</button>  : <div onClick={handleSave} className="heart">❤️</div> }
        <div className="address">{property.full_address}</div>
        <div className="state">{property.city}, {property.state_code}</div>
        <div className="price">${property.price.includes(" ") ? <span>{property.price.split(" ")[0]}+</span> : property.price}/month</div>
        <div className="contact">{property.owner_contact}</div>
      </div>
    </div>
  )
}

export default Property;