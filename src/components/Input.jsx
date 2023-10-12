import { Autocomplete } from '@react-google-maps/api';
import searchIcon from '../assets/search-white.svg';

const Input = ({
  map,
  center,
  destinationRef,
  calculateRoute,
  distance,
  duration,
}) => {
  return (
    <>
      <form className='absolute t-1 l-1 z-10 flex  ' onSubmit={calculateRoute}>
        <div>
          <Autocomplete>
            <input
              type='text'
              placeholder='Enter destination'
              className='py-0 px-5'
              ref={destinationRef}
            />
          </Autocomplete>
        </div>
        <button className='py-1 px-1'>
          <img src={searchIcon} alt='search-icon' />
        </button>

        {/* <button className='py-1 px-1 text-white' onClick={clearRoute}>
        clear
      </button> */}
      </form>

      {/* <form onSubmit={calculateRoute}>
        <Autocomplete>
          <input
            type='text'
            placeholder='Enter destination'
            ref={destinationRef}
          />
        </Autocomplete>
        <button type='submit'>
          <img src={searchIcon} alt='search-icon' />
        </button>
        <button className=' text-white' onClick={() => map.panTo(center)}>
          go to origin
        </button>
      </form> */}
    </>
  );
};

export default Input;
