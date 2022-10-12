import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './imageGallery.module.css'

const ImageGallery = props => {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem />

    </ul>
  );
};

ImageGallery.propTypes = {};

export default ImageGallery;
