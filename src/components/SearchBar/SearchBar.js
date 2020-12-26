import { useState } from 'react';
import { toast } from 'react-toastify';

function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  function onImputChange({ target }) {
    const { value } = target;
    setValue(value);
  }

  function onClickSubmiit(e) {
    e.preventDefault();

    if (value.trim() === '') {
      return toast.error('Wrong request !');
    }
    onSubmit(value);

    reset();
  }

  function reset() {
    setValue('');
  }
  return (
    <>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={onClickSubmiit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            placeholder="Search images and photos"
            onChange={onImputChange}
            value={value}
          />
        </form>
      </header>
    </>
  );
}

export default SearchBar;
