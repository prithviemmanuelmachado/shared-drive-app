import secrets from "../../secrets.json";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, { useState } from "react";

function Map(props){
    const { clickable, clickMarkerLoc, setClickMarkerLocs } = props;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: secrets.GoeApiKey
      })
    const [loc, setLoc] = useState({ lng: 77.5946, lat: 12.9716 });
    const [map, setMap] = useState(null);

    const containerStyle = {
      width: '100%',
      height: '50vh',
      marginTop: '20px'
    };

    const setMapInitLoc = (pos) => {
      if(pos){
          setLoc({
              lng: pos.coords.longitude,
              lat: pos.coords.latitude
          });
      }
    };
  
    navigator.geolocation.getCurrentPosition(setMapInitLoc);
    
    const onLoad = React.useCallback(function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      map.fitBounds(bounds);
      setMap(map)
    }, [])
    
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])
    
    return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={loc}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(e) => {
          if(clickable){
            setClickMarkerLocs({
              lat: e.latLng.lat(),
              lng: e.latLng.lng()
            });
          }
        }}>
        {
          clickable ? <Marker
                        position = {clickMarkerLoc}/> :
                      <></>
        }
      </GoogleMap>
    ) : <></>
}

export default Map;