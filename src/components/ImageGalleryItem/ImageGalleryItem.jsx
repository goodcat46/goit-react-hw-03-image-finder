import React from 'react';
import PropTypes from 'prop-types';
import css from './imageGalleryItem.module.css';

const ImageGalleryItem = props => {
  return (
    <li className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItemImage} src="" alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {};

export default ImageGalleryItem;
