import React from 'react';
import PropTypes from 'prop-types';
import css from './serchbar.module.css';
const Serchbar = props => {
  console.log(css);
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm}>
        <button className={css.SearchFormButton} type="submit">
          <span>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

Serchbar.propTypes = {};

export default Serchbar;
