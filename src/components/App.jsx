import React, { useState, useEffect } from 'react';

import { searchImages } from 'api/searchImages';

import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Modal } from './modal/Modal';
import { Loader } from './loader/Loader';
import { LoadMoreBtn } from './button/Button';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [modalImg, setModalImg] = useState({});
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    setStatus('pending');

    searchImages({ query, page })
      .then(({ totalImages, normalizedHits }) => {
        setImages(PrevImages => [...PrevImages, ...normalizedHits]);
        setTotalImages(totalImages);
        setStatus('resolved');
      })
      .catch(setStatus('rejected'));
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addLargeImgToState = modalImg => {
    setModalImg(modalImg);
    setShowModal(true);
  };

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} addLargeImgToState={addLargeImgToState} />
      )}
      {status === 'pending' && <Loader />}

      {showModal && <Modal modalImg={modalImg} onClose={toggleModal} />}

      {status === 'resolved' && (
        <>
          {totalImages !== images.length && (
            <LoadMoreBtn onLoadMoreClick={onLoadMoreClick} />
          )}
        </>
      )}

      {status === 'rejected' && <h2>sorry, no results for your query</h2>}
    </div>
  );
}
