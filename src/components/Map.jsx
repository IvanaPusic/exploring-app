import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';
const Map = ({ centerData, setMap, directions }) => {
  const center = useMemo(() => centerData, [centerData]);

  return (
    <GoogleMap
      center={center}
      mapContainerClassName='map'
      zoom={15}
      onLoad={(map) => setMap(map)}
    >
      <Marker position={center} />
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default Map;
