import React, {useState} from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '39%',
  height: '80%',
  position: 'absolute',
  
};

const onLoad = marker => {
}


const Map = ({currentSearch, firstProperty, properties}) => {

  const [s,setPosition] = useState({})

  let center = currentSearch.lat ? {lat: currentSearch.lat, lng: currentSearch.lng} : 
              {lat: firstProperty.latitude, lng: firstProperty.longitude}
  
  return (
    <div>

        {<GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13} 
        >
          {properties.map(property =>  (
            <Marker onClick={() => setPosition({lat: property.latitude, lng: property.longitude})}
            onLoad={onLoad}
            position={{lat: property.latitude, lng: property.longitude}}
            >
            </Marker>
          ) )} 

             
        </GoogleMap>}

    </div>
  );
}

export default Map;
