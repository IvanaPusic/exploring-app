import { GoogleMap } from '@react-google-maps/api';
import { useMemo } from 'react';
const Map = ({ lat, lng }) => {
  const center = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  return (
    <GoogleMap zoom={13} center={center} mapContainerClassName='map'>
      {/* <DistanceMatrixService
        options={{
          travelMode: 'WALKING',
          origins: [],
          destinations: [{ lat: 1.296788, lng: 103.778961 }],
        }}
        callback={(response) => {
          console.log(response);
        }}
      /> */}
    </GoogleMap>
  );
};

export default Map;
