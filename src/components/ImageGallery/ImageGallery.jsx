import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGallery/ImageGalleryItem';
import ImageCss from './Image.module.css';

export const ImageGallery = ({ options, onClick }) => (
  <>
    {options.length > 0 && (
      <ul className={ImageCss.gallery}>
        {options.map(({ id, largeImageURL, tag, webformatURL }) => (
          <ImageGalleryItem
            largeImage={largeImageURL}
            id={id}
            key={webformatURL}
            tag={tag}
            webFormat={webformatURL}
            onClick={onClick}
          />
        ))}
      </ul>
    )}
  </>
);

ImageGallery.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
