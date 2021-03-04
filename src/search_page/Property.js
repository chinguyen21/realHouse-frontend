import React from 'react';

const Property = ({property}) => {
  return (
    <div className="property-box">
      <img src = {property.photos[0].src} width="350px" height="250px"></img>
    </div>
  )
}

export default Property;