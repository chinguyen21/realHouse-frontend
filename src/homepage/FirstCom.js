import React from 'react';
import { useHistory } from 'react-router-dom';

import Styling from '../css/Styling'
import SearchIcon from '@material-ui/icons/Search';
import {InputBase} from "@material-ui/core"

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const FirstCom = ({setSearchPlace}) => {

  let history = useHistory();
  
   const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

   const handleSelect = ({ description }) => () => {

    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description })
    .then((results) => getLatLng(results[0]))
    .then(({ lat, lng }) => {
        setSearchPlace({
          name: description,
          lat: lat,
          lng: lng
        })
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    setTimeout(function() {
      history.push(`/search-page`);
    }, 1000);
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
    <div className="vcom1">
          <div className={Styling().search} >
       
            <InputBase className={Styling().inputSearch}
              onChange={handleInput}
              value={value}
              placeholder="Location"
              label="search"
              disabled={!ready}
              classes={{
              root: Styling().inputRoot,
              input: Styling().inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
             <div className={Styling().searchIcon}>
              <SearchIcon />
            </div>
     
          </div>
          <div className="dropdown-menu">
            {status === "OK" && <ul role="listbox">{renderSuggestions()}</ul>}
          </div>
                   
          <div className='picture'>
          </div>
          <h2>Find your real HOME, we can help</h2>
    </div>
  )
}

export default FirstCom;