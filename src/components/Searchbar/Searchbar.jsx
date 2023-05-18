import { useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = ({ currentTarget: { value } }) => {
    const normalizedValue = value.trim().toLowerCase();
    setSearchValue(normalizedValue);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(searchValue);
    setSearchValue('');
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit} className={css.searchbar}>
          <IconContext.Provider
            value={{
              color: 'blue',
              size: '2em',
              style: { verticalAlign: 'middle' },
            }}
          >
            <button type="submit" className={css.button}>
              <CgSearch />
              <span className={css.buttonLabel}>Search</span>
            </button>
          </IconContext.Provider>
          <input
            type="text"
            value={searchValue}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleSearchChange}
            className={css.input}
          />
        </form>
      </header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
