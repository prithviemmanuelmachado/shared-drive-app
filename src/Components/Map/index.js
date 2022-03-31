import secrets from "../../secrets.json";
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles(theme => {
  return {
      button:{
        width: 200
      }
  }
});

function Map(props){
    const { clickable, clickMarkerLoc, setClickMarkerLocs, markers } = props;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: secrets.GoeApiKey
      })
    const classes = useStyle();
    const [loc, setLoc] = useState({ lng: 77.5946, lat: 12.9716 });
    const [map, setMap] = useState(null);
    const containerStyle = {
      width: '100%',
      height: '50vh',
      marginTop: '20px'
    }; 
    
    const showError = (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          setLoc({ lng: 77.5946, lat: 12.9716 });
          break;
        case error.POSITION_UNAVAILABLE:
          setLoc({ lng: 77.5946, lat: 12.9716 });
          break;
        case error.TIMEOUT:
          setLoc({ lng: 77.5946, lat: 12.9716 });
          break;
        case error.UNKNOWN_ERROR:
          setLoc({ lng: 77.5946, lat: 12.9716 });
          break;
      }
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      if(pos){
          setLoc({
              lng: pos.coords.longitude,
              lat: pos.coords.latitude
          });
      }
    }, showError, {enableHighAccuracy: true});
    
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
        {
          markers.length !== 0 ? 
          markers.map((element, index) => 
          {
            return (<Marker
              key={element.pos.lat+'_'+element.pos.lng}
              position = {element.pos}
              label={element.name}/> )
          }):
          <></>
        }
      </GoogleMap>
    ) : <></>
}

export default Map;