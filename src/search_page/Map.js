import React from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '39%',
  height: '80%',
  position: 'absolute',
  
};

const onLoad = marker => {
  console.log('marker: ', marker)
}

const Map = ({searchPlace, firstProperty}) => {

  let center = searchPlace.lat ? {lat: searchPlace.lat, lng: searchPlace.lng} : 
              {lat: firstProperty.latitude, lng: firstProperty.longitude}

  return (
    <div>

        {<GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11} 
        >
          { /* Child components, such as markers, info windows, etc. */ }   
          <Marker
            onLoad={onLoad}
            position={center}
          >
            {/* <InfoWindow >
              <span>Chi Nguyen</span>
            </InfoWindow> */}
            
          </Marker>
        </GoogleMap>}

    </div>
  );
}

export default Map;
