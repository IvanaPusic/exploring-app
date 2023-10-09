import { GoogleMap } from '@react-google-maps/api';
import { useMemo } from 'react';

const Map = ({ lat, lng }) => {
  const center = useMemo(() => ({ lat: lat, lng: lng }), []);

  return (
    <GoogleMap zoom={13} center={center} mapContainerClassName='map'>
      {/* <Marker position={center} /> */}
    </GoogleMap>
  );
};

export default Map;
