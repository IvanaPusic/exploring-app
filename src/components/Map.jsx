/* eslint-disable no-unused-vars */
import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import React, { useMemo } from 'react';
import { useAppContext } from '../AppContext';

const Map = () => {
  const { center, setMapInstance, directions } = useAppContext();
  
  const userCenter = useMemo(() => center, [center]);
  const [map, setMap] = React.useState(null)


  const onLoad = React.useCallback(function callback(map) {
    console.log('onLoad', map);
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    console.log('onUnmount', map)
    setMap(null)
  }, [])

  return (
    <GoogleMap
      mapContainerStyle={{width: "100%", minHeight: "100vh"}}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default Map;
