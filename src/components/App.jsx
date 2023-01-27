import React, { Component } from 'react';

import { searchImages } from 'api/searchImages';

import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Modal } from './modal/Modal';
import { Loader } from './loader/Loader';
import { LoadMoreBtn } from './button/Button';

export class App extends Component {
  state = {
    query: '',
    images: [],
    modalImg: {},
    status: 'idle',
    page: 1,
    totalPages: null,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { page } = this.state;
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    if (prevQuery !== nextQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });
      searchImages(nextQuery, page)
        .then(this.handleReceivedData)
        .catch(this.setState({ status: 'rejected' }));
    }
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleReceivedData = ({ totalPages, normalizedHits }) => {
    this.setState({ status: 'resolved' });
    this.setState(({ images }) => {
      return { images: [...images, ...normalizedHits], totalPages };
    });
  };

  addLargeImgToState = modalImg => {
    this.setState({ modalImg });
    this.setState({ showModal: true });
  };

  handleError = msg => {
    console.log(msg);
    this.setState({ status: 'rejected' });
  };

  onLoadMoreClick = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  render() {
    const { status, images, totalPages, page, showModal, modalImg } =
      this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            addLargeImgToState={this.addLargeImgToState}
          />
        )}
        {status === 'pending' && <Loader />}

        {showModal && <Modal modalImg={modalImg} onClose={this.toggleModal} />}

        {status === 'resolved' && (
          <>
            {totalPages > 1 && page < totalPages && (
              <LoadMoreBtn onLoadMoreClick={this.onLoadMoreClick} />
            )}
          </>
        )}

        {status === 'rejected' && <h2>sorry, no results for your query</h2>}
      </div>
    );
  }
}
