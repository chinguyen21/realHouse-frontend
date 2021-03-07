import React, {useState, useEffect} from 'react';

import SearchBar from './SearchBar';
import Map from './Map';
import Property from '../property/Property';

const SearchPage = ({user, setUser, searchPlace, properties}) => {
  const [displayMap, setDisplayMap] = useState(false)

  const handleSetProperties = (property) => {
    setUser({...user, saved_properties: [...user.saved_properties, property]})
  }

  const filterProperties = () => {
    
    let fproperties = properties;
    if (searchPlace.lat) {
      fproperties = properties.filter(property => Math.abs(property.latitude-searchPlace.lat) <= 0.1 &&
                                    Math.abs(property.longitude-searchPlace.lng) <= 0.1)
    }
    return fproperties
  }

  // console.log(filterProperties().map(p => p.city))

  return (
    <div>
      <div >
        <SearchBar displayMap={displayMap} setDisplayMap={setDisplayMap}/>
      </div>
      <div className="content">
        <div className="houses-container">
          {filterProperties().map((property,idx) => <Property key={idx} handleSetProperties={handleSetProperties} property={property}/>)}
        </div>
        
        {displayMap ? 
        <div className="map">
          <Map searchPlace={searchPlace} firstProperty={properties[0]}/>
        </div> : null
        }

      </div>

    </div>
  )
}

export default SearchPage;