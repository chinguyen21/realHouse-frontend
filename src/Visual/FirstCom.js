import React, {useState} from 'react';
import {Redirect, Link, Route} from 'react-router-dom';

import Styling from '../css/Styling'
import SearchIcon from '@material-ui/icons/Search';
import {InputBase} from "@material-ui/core"

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";


const FirstCom = () => {
  // const [searchPlace, setSearchPlace] = useState("")

  // const handleChange = () => {
  //   <Route exact path={match.url} render={() => <h3>Choose a movie from the list above</h3>}/>
  // }
  
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


  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
    // debugger
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

   const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    clearSuggestions();
    // Get latitude and longitude via utility functions
    // getGeocode({ address: description })
    //   .then((results) => getLatLng(results[0]))
    //   .then(({ lat, lng }) => {
    //     console.log("Coordinates: ", { lat, lng });
    //   })
    //   .catch((error) => {
    //     console.log("Error: ", error);
    //   });
  };

  const renderSuggestions = () =>
    data.slice(0,3).map((suggestion) => {
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
          <h2>Find your real HOME</h2>
    </div>
  )
}

export default FirstCom;