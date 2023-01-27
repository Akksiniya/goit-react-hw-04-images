import PropTypes from 'prop-types';
import { ImgList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, addLargeImgToState }) => {
  return (
    <ImgList>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
            addLargeImgToState={addLargeImgToState}
          />
        );
      })}
    </ImgList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  addLargeImgToState: PropTypes.func.isRequired,
};
