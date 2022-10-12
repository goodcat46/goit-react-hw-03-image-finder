import React from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';

const Modal = props => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src="" alt="" />
      </div>
      <button className={css.closeModal}>Close</button>
    </div>
  );
};

Modal.propTypes = {};

export default Modal;
