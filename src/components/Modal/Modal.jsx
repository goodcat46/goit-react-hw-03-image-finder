import React from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';

const Modal = ({ currentImgUrl, onToggleModal }) => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={currentImgUrl} alt="img_" />
      </div>
      <button
        className={css.closeModal}
        onClick={() => {
          onToggleModal();
        }}
      >
        Close
      </button>
    </div>
  );
};

Modal.propTypes = {
  currentImgUrl: PropTypes.string,
  onToggleModal: PropTypes.func,
};

export default Modal;
