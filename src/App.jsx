import Input from './components/Input';
import Map from './components/Map';
import { useAppContext } from './hooks/useAppContext';
function App() {
  const {
    isLoaded,
    map,
    setMap,
    directions,
    distance,
    duration,
    calculateRoute,
    clearRoute,
    destinationInputRef,
    center,
  } = useAppContext();

  if (!isLoaded) {
    return (
      <section className='flex justify-center align-center'>
        <h1>Loading...</h1>
      </section>
    );
  }

  return (
    <section className='flex justify-center '>
      <Input
        destinationRef={destinationInputRef}
        map={map}
        center={center}
        calculateRoute={calculateRoute}
        clearRoute={clearRoute}
        distance={distance}
        duration={duration}
      />
      <Map
        centerData={center}
        mapContainerClassName='map'
        setMap={setMap}
        directions={directions}
      />
    </section>
  );
}

export default App;
