import PropTypes from 'prop-types';
import { ImgCard, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  addLargeImgToState,
}) => {
  return (
    <ImgCard onClick={() => addLargeImgToState({ largeImageURL, tags })}>
      <Image src={webformatURL} alt={tags} />
    </ImgCard>
  );
};

ImageGalleryItem.propTypes = {
  addLargeImgToState: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
