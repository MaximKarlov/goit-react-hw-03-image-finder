import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGallery/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import Notiflix from 'notiflix';
import { LoadMore } from '../Button/Button';
import ImageCss from './Image.module.css';

export const ImageGallery = ({ options, load, onClick, loadMore }) => (
  <>
    {options.length > 0 && (
      <ul className={ImageCss.gallery}>
        {options.map(({ id, largeImageURL, tag, webformatURL }) => (
          <ImageGalleryItem
            largeImage={largeImageURL}
            id={id}
            key={webformatURL}
            tags={tag}
            webFormat={webformatURL}
            onClick={onClick}
          />
        ))}
      </ul>
    )}
    {load ? <Loader /> : <LoadMore onClick={loadMore} />}
    {/* {options.length <= 500 && Notiflix.Notify.warning('Це остання сторінка')} */}
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
