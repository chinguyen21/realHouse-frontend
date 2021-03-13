import React from 'react';
import { Switch } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import {InputBase, InputLabel, Select, MenuItem, FormControl} from "@material-ui/core"
import Styling from '../css/Styling'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const SearchBar = (props) => {

  const {setFilterPets, filterPets, searchBeds, setSearchBeds, searchPrice, setSearchPrice, displayMap, setDisplayMap, currentSearch, setCurrentSearch, properties} = props
  
  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {

    },
    debounce: 300,
  });

   const handleSelect = ({ description }) => () => {

    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description })
    .then((results) => getLatLng(results[0]))
    .then(({ lat, lng }) => {
        setCurrentSearch({
          name: description,
          lat: lat,
          lng: lng
        })

      })
      .catch((error) => {
        console.log("Error: ", error);
      });

  };

  const renderSuggestions = () =>
    data.slice(0,5).map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <p role="option" aria-selected="false" key={id} onClick={handleSelect(suggestion)} className="select-destination">
         <img src="https://img.icons8.com/ios/18/fa314a/google-maps-new--v1.png" alt=""/>
          <strong>   {main_text}</strong> <small>{secondary_text}</small>
        </p>
      );
    });

  
  return(
    <div className="searchbar">
      {currentSearch.name ? 
      <div className="search-show">
        <h2>
          <p>{properties.length} properties</p>
          <div> {currentSearch.name}</div>
        </h2>
      </div> : null }
      <div className="bar">

                  <div className="search-box">
                    <div className="search-icon">
                      <SearchIcon />
                    </div>
                    <InputBase
                      onChange={e => setValue(e.target.value)}
                      value={value}
                      placeholder="Enter Location.."
                      classes={{
                        root: Styling().inputRoot,
                        input: Styling().inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                      />
                     <div className="dropdown-menu">
                      {status === "OK" && <ul role="listbox">{renderSuggestions()}</ul>}
                    </div>
                  </div>

                  <div className="search-price">
                    <FormControl className="search-price-1">
                      <InputLabel id="demo-simple-select-label" color="secondary">Price</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchPrice}
                        color="secondary"
                        onChange={e => setSearchPrice(e.target.value)}
                      >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={1000}>less than $1000</MenuItem>
                        <MenuItem value={2000}>$1000-$2000</MenuItem>
                        <MenuItem value={3000}>$2000-$3000</MenuItem>
                        <MenuItem value={"More than 3000"}>more than $3000</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="search-beds">
                    <FormControl className="search-beds-1">
                      <InputLabel id="demo-simple-select-label" color="secondary">Sqft</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchBeds}
                        color="secondary"
                        onChange={(e) => setSearchBeds(e.target.value)}
                      >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"Less than 500"}>Less than 500</MenuItem>
                        <MenuItem value={500}>500+</MenuItem>
                        <MenuItem value={600}>600+</MenuItem>
                        <MenuItem value={700}>700+</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="search-pets">
                     <FormControl className="search-pets-1">
                      <InputLabel id="demo-simple-select-label" color="secondary">Pets</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterPets}
                        color="secondary"
                        onChange={(e) => setFilterPets(e.target.value)}
                      >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>

                      </Select>
                    </FormControl>
                  </div>

      </div>

      <div className="switch-button">
         Show map <Switch
        checked={displayMap}
        onClick={() => setDisplayMap(!displayMap)}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      </div>

    </div>
  )
}

export default SearchBar;