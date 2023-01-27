import { Component } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalBox, ModalImg } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const {
      modalImg: { largeImageURL, tags },
    } = this.props;

    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalBox>
          <ModalImg src={largeImageURL} alt={tags} />
        </ModalBox>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  modalImg: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
