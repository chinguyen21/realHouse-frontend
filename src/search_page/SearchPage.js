import React, {useState, useEffect} from 'react';

import SearchBar from './SearchBar';
import Map from './Map';
import Property from '../property/Property';
import Pagination from '@material-ui/lab/Pagination';

const SearchPage = ({user, setUser, searchPlace, properties}) => {
  const [displayMap, setDisplayMap] = useState(false)
  const [page, setPage] = useState(1)

  // const handleSetProperties = (property) => {
  //   setUser({...user, saved_properties: [...user.saved_properties, property]})
  // }
  const filterProperties = () => {
    
    let fproperties = properties;
    if (searchPlace.lat) {
      fproperties = properties.filter(property => Math.abs(property.latitude-searchPlace.lat) <= 0.1 &&
                                    Math.abs(property.longitude-searchPlace.lng) <= 0.1)
    }
    return fproperties
  }

   const handleChange = (event, value) => {
     setPage(value);
    };
    
  return (
    <div>
      <div >
        <SearchBar displayMap={displayMap} setDisplayMap={setDisplayMap}/>
      </div>
      {displayMap ? 
        <div className="content">
          <div className="houses-container-1">
            <div className="houses-container">
            {filterProperties().slice((page - 1)*9, page*9).map((property) => <Property key={property.id} setUser={setUser} user={user} property={property}/>)}
            </div>
            <div className="pagination"><Pagination onChange={handleChange} count={Math.ceil(filterProperties().length/9)} color="primary" /></div>
          </div>
          <div className="map">
            <Map searchPlace={searchPlace} firstProperty={properties[0]}/>
          </div> 
      </div>
        : 

        <div className="content">
          <div className="houses-container-2">
            <div className="houses-container">
            {filterProperties().slice((page - 1)*9, page*9).map((property) => <Property key={property.idx} setUser={setUser} user={user} property={property}/>)}
            </div>
            <div className="pagination"><Pagination onChange={handleChange} count={Math.ceil(filterProperties().length/9)} color="primary" /></div>
          </div>
        </div>
        }

        <div>
          <h2>About us</h2>
        </div>

    </div>
  )
}

export default SearchPage;