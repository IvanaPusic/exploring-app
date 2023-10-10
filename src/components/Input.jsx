import searchIcon from '../assets/search-white.svg';

const Input = ({ input, handleInput, handleSubmit }) => {
  return (
    <form className='absolute t-1 l-1 z-10 flex ' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='e.g. Keseri 40 b'
        className='py-0 px-5'
        value={input}
        onChange={handleInput}
      />
      <button className='py-1 px-1'>
        <img src={searchIcon} alt='search-icon' />
      </button>
    </form>
  );
};

export default Input;
