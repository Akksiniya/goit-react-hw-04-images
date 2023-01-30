import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalBox, ModalImg } from './Modal.styled';

export function Modal({ modalImg: { largeImageURL, tags }, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalBox>
        <ModalImg src={largeImageURL} alt={tags} />
      </ModalBox>
    </Overlay>
  );
}

Modal.propTypes = {
  modalImg: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
