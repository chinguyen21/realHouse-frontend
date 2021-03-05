import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import Map from './Map';
import Property from './Property.js';

const SearchPage = ({user, setUser, searchPlace, properties}) => {
  const [displayMap, setDisplayMap] = useState(false)

  


  const handleSetProperties = (property) => {
    setUser({...user, saved_properties: [...user.saved_properties, property]})
  }

  const filterProperties = () => {

  }

  return (
    <div>
      <div >
        <SearchBar displayMap={displayMap} setDisplayMap={setDisplayMap}/>
      </div>
      <div className="content">
        <div className="houses-container">
          {properties.map((property,idx) => <div><Property key={idx} handleSetProperties={handleSetProperties} property={property}/></div>)}
        </div>
        
        {displayMap ? 
        <div className="map">

        </div> : null
        }

      </div>

    </div>
  )
}

export default SearchPage;