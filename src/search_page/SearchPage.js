import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import Map from './Map';
import Property from './Property.js';

const SearchPage = ({searchPlace}) => {
  const [displayMap, setDisplayMap] = useState(false)
  const [properties, setProperties] = useState([])

  useEffect (() => {
    fetch("http://localhost:3000/properties", {
      method: "GET",
      headers: {"Authorization": `Bearer ${localStorage.token}`}})
    .then(res => res.json())
    .then(response => {
      setProperties(response)
    })
  },[])

  return (
    <div>
      <div >
        <SearchBar displayMap={displayMap} setDisplayMap={setDisplayMap}/>
      </div>
      <div className="content">
        <div className="houses-container">
          {properties.map((property,idx) => <Property key={idx} property={property} />)}
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