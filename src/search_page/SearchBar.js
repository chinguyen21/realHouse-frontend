import React, {useState} from 'react';
import { Switch } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import {InputBase, Button, Toolbar, InputLabel, Select, MenuItem, FormControl} from "@material-ui/core"
import Styling from '../css/Styling'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const SearchBar = ({displayMap, setDisplayMap, currentSearch, setCurrentSearch, properties}) => {
  // const [location, setLocation] = useState(currentSearch.name)

   const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

   const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    clearSuggestions();
    // Get latitude and longitude via utility functions
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

    // setTimeout(function() {
    //   history.push(`/search-page`);
    // }, 1000);
  };

  const renderSuggestions = () =>
    data.slice(0,5).map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      // debugger
      return (
        <p role="option" aria-selected="false" key={id} onClick={handleSelect(suggestion)} className="select-destination">
         <img src="https://img.icons8.com/ios/18/fa314a/google-maps-new--v1.png"/>
          <strong>   {main_text}</strong> <small>{secondary_text}</small>
        </p>
      );
    });

  
  return(
    <div className="searchbar">
      <div className="search-show">
        <h2>
          <p>{properties.length} properties near</p>
          <h4>{currentSearch.name}</h4>
        </h2>
      </div>
      <div className="bar">
          {/* <form > */}
              {/* <Toolbar> */}
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
                        value=""
                        color="secondary"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1000}>1000</MenuItem>
                        <MenuItem value={2000}>2000</MenuItem>
                        <MenuItem value={3000}>3000</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="search-beds">
                    <FormControl className="search-beds-1">
                      <InputLabel id="demo-simple-select-label" color="secondary">Beds</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value=""
                        color="secondary"
                        // onChange={handleChange}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="search-button">
                    <Button type="submit" variant="outlined" size="medium" color="secondary" >
                        Search
                    </Button>
                  </div>
                {/* </Toolbar> */}
              {/* </form> */}
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