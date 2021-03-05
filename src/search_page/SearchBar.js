import React from 'react';
import { Switch } from '@material-ui/core'

const SearchBar = ({displayMap, setDisplayMap}) => {
  return(
    <div className="searchbar">
      <div className="bar">
      SearchBar
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