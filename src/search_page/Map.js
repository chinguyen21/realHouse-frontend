import React, {useState} from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '39%',
  height: '80%',
  position: 'absolute',
  
};

const onLoad = marker => {
  console.log('marker: ', marker)
}


const Map = ({currentSearch, firstProperty, properties}) => {

  const [s,setPosition] = useState({})

  let center = currentSearch.lat ? {lat: currentSearch.lat, lng: currentSearch.lng} : 
              {lat: firstProperty.latitude, lng: firstProperty.longitude}
  
  console.log(s)
  return (
    <div>

        {<GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11} 
        >
          { /* Child components, such as markers, info windows, etc. */ }
          {properties.map(property =>  (
            <Marker onClick={() => setPosition({lat: property.latitude, lng: property.longitude})}
            onLoad={onLoad}
            position={{lat: property.latitude, lng: property.longitude}}
            >
            </Marker>
          ) )} 
             {/* {s &&
                 (<InfoWindow 
                 position={s}
                 clickable={true}
                  onCloseClick={() => setPosition({})}
                 >
                     <h1>My InfoWindow</h1>
                 </InfoWindow>)
             }
             */}
      
 
            
        </GoogleMap>}

    </div>
  );
}

export default Map;
