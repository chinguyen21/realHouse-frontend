import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';

const Property = ({user, setUser, property}) => {
  console.log(user.saved_properties.map(d => d.id))
  console.log(property.id)
  console.log(user.saved_properties.map(d => d.id).includes(property.id))
  // debugger
  const [fav, setFav] = useState(user.saved_properties.some(sP => sP.id === property.id) ? "red" : "#dcdee6")
  
  console.log(fav)
  const handleSave = () => {
      // fav === "#dcdee6" ? setFav("red") : setFav("#dcdee6")
      if (fav === "#dcdee6") {
        setFav("red")
        fetch(`http://localhost:3000/fproperties`, {
        method: "POST",
        headers: {"Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.token}`},
        body: JSON.stringify({property_id: property.id})})
        .then(res => res.json())
        .then(() => {
          setUser({...user, saved_properties: [...user.saved_properties, property]})
        })
        } else {
          setFav("#dcdee6")
           fetch(`http://localhost:3000/fproperties/${property.id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}})
          .then(res => res.json())
          .then(() => {
            setUser({...user, saved_properties: user.saved_properties.filter(p => p.id !== property.id)})
          })
        }
  }

  return (
    <div className="property-box">
      <Link to={`/properties/${property.id}`}>
        <img src = {property.photos[0].src} width="100%" height="70%"></img>
      </Link>
      <div className="property-info-1">
        <p>Beds: {property.bedrooms[0]}-{property.bedrooms[2]}</p>
        <p>Baths: {property.bathrooms[0]}-{property.bathrooms[2]}</p>
        <p>{property.sqft ? property.sqft : "500"}+ sqft</p>
        <p>Pets: {property.allow_pets ? "yes" : "no"}</p>
      </div>

      <div className="property-info-2">
        <div onClick={handleSave} className="heart" style={{color: fav}}><FavoriteIcon/></div>
        <div className="address">{property.full_address}</div>
        <div className="state">{property.city}, {property.state_code}</div>
        <div className="price">${property.price.includes(" ") ? <span>{property.price.split(" ")[0]}+</span> : property.price}/month</div>
        <div className="contact">{property.owner_contact}</div>
      </div>
    </div>
  )
}

export default Property;