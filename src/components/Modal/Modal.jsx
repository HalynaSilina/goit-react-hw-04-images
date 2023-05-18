import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ image: { url, alt }, onClose }) => {
  const handleClick = evt => {
    if (evt.code === 'Escape') onClose();
  };
  useEffect(() => {
    window.addEventListener('keydown', handleClick);
    return () => {
      window.removeEventListener('keydown', handleClick);
    };
  });

  const onBackdropClickClose = e => {
    if (e.currentTarget === e.target) onClose();
  };

  return (
    <div className={css.overlay} onClick={onBackdropClickClose}>
      <div className={css.modal}>
        <img src={url} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
