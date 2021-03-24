import React, {useState} from 'react';

import SearchBar from './SearchBar';
import Map from './Map';
import Property from '../property/Property';
import Pagination from '@material-ui/lab/Pagination';
import PopupModal from '../search_page/PopupModal'
import About from '../search_page/About'


const SearchPage = ({user, setUser, searchPlace, properties}) => {
  const [displayMap, setDisplayMap] = useState(false)
  const [page, setPage] = useState(1)
  const [askLogin, setAskLogin] = useState(false);
  const [currentSearch, setCurrentSearch] = useState(searchPlace.lat ? searchPlace : {})
  const [searchPrice, setSearchPrice] = useState("")
  const [searchBeds, setSearchBeds] = useState("")
  const [filterPets, setFilterPets] = useState("")

  const filterProperties = () => {
    let fproperties = properties;
    if (currentSearch.lat) {
      fproperties = properties.filter(property => Math.abs(property.latitude-currentSearch.lat) <= 0.05 &&
                                    Math.abs(property.longitude-currentSearch.lng) <= 0.05)}
    if (searchPrice && searchPrice !== "All" && searchPrice !== "More than 3000") {
      fproperties = fproperties.filter(property => parseInt(property.price.split(" ")[0]) > searchPrice - 1000 && parseInt(property.price.split(" ")[0]) <= searchPrice)
    } else if (searchPrice === "More than 3000") {
      fproperties = fproperties.filter(property => parseInt(property.price.split(" ")[0]) > 3000)
    }
    if (searchBeds === "Less than 500") {
         fproperties = fproperties.filter(property => property.sqft < 500)
        } else if (searchBeds && searchBeds !== "All") {
         fproperties = fproperties.filter(property => property.sqft > searchBeds)
    }

    if (filterPets === "Yes") {
      fproperties = fproperties.filter(property => property.allow_pets )
    } else if (filterPets === "No") {
      fproperties = fproperties.filter(property => !property.allow_pets )
    }

    return fproperties
  }

  const handleChange = (event, value) => {
     setPage(value);
  };

  return (
    <div>
      <PopupModal askLogin={askLogin} setAskLogin={setAskLogin}/>
      <div >
        <SearchBar filterPets={filterPets} setFilterPets={setFilterPets}searchBeds={searchBeds} setSearchBeds={setSearchBeds} searchPrice={searchPrice} setSearchPrice={setSearchPrice} properties={filterProperties()} currentSearch={currentSearch} setCurrentSearch={setCurrentSearch} displayMap={displayMap} setDisplayMap={setDisplayMap}/>
      </div>
      {displayMap ? 
        <div className="content">
          <div className="houses-container-1">
            <div className="houses-container">
            {filterProperties().slice((page - 1)*9, page*9).map((property) => <Property key={property.id} setUser={setUser} user={user} property={property} setAskLogin={setAskLogin}/>)}
            </div>
            <div className="pagination"><Pagination onChange={handleChange} count={Math.ceil(filterProperties().length/9)} color="primary" /></div>
            
            <About/>
          </div>
          <div className="map">
            <Map properties={filterProperties().slice((page - 1)*9, page*9)} currentSearch={currentSearch} firstProperty={properties[0]}/>
          </div> 
          
      </div>
        : 

        <div className="content">
          <div className="houses-container-2">
            <div className="houses-container">
            {filterProperties().slice((page - 1)*9, page*9).map((property) => <Property key={property.id} setUser={setUser} user={user} property={property} setAskLogin={setAskLogin}/>)}
            </div>
            <div className="pagination"><Pagination onChange={handleChange} count={Math.ceil(filterProperties().length/9)} color="primary" /></div>
          <About/>
          </div>
        </div>
        }


    </div>
  )
}

export default SearchPage;