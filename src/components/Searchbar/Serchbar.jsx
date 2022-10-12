import React from 'react';
import PropTypes from 'prop-types';
import css from './serchbar.module.css';
const Serchbar = props => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm}>
        <button className={css.SearchFormButton} type="submit">
          <span>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

Serchbar.propTypes = {};

export default Serchbar;
