import { React, Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGallery/ImageGalleryItem';
import ImageCss from './Image.module.css';
import { Loader } from '../Loader/Loader';
import { LoadMore } from '../Button/Button';

export class ImageGallery extends Component {
  state = {
    searchImages: [],
    isLoading: false,
    search: '',
  };

  componentDidMount() {
    try {
      const { options } = this.props;
      this.setState({ searchImages: options.searchImages, search: options.search });
      console.log('options>>>>', this.state);
      // this.setState({ isLoading: false });
    } catch (e) {
      console.error('ERROR....', e);
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.searchImages !== this.state.searchImages) {
      if (prevState.isLoading === false) {
        try {
          this.setState({ isLoading: true });
          const searchImages = this.state.searchImages;
          console.log('searchImages', searchImages);
          searchImages.map(search =>
            this.setState(prevState => {
              console.log('search', search);
              return { searchImages: [...prevState.searchImages, search] };
            })
          );
          this.setState({ isLoading: false });
        } catch (e) {
          console.error('ERROR....', e);
        }
        // this.setState({ isLoading: false });
      }
    }
    //   this.setState(prevState => {
    //     return { searchImages: [...prevState.searchImages, this.searchImages] };
    //   });
    // }
  }

  onClick(event) {
    console.log('Click');
  }

  render() {
    const options = this.state.searchImages;
    const result = this.state.isLoading;
    console.log(result);
    return (
      options.length > 0 && (
        <ul className={ImageCss.gallery}>
          {result ? (
            <Loader />
          ) : (
            options.map(({ id, largeImageURL, tag, webformatURL }) => (
              <ImageGalleryItem
                largeImage={largeImageURL}
                id={id}
                key={webformatURL}
                tags={tag}
                webFormat={webformatURL}
                onClick={this.onClick}
              />
            ))
          )}
        </ul>
      )
    );
  }
}

//     { options.isLoading && <Loader /> }
//     <LoadMore />)

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
