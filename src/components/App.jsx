import { React, Component } from 'react';
import { Loader } from './Loader/Loader';

import Api from '../Api/Api_query';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

const STATUS = {
  pending: 'pending',
  loading: 'loading',
};

export class App extends Component {
  state = {
    pages: 0,
    searchImages: [],
    search: '',
    isLoading: STATUS.pending,
    newSearch: false,
    totalImages: 0,
    modal: null,
  };

  api_searching = (search, pages) => {
    Api.serching(search, pages)
      .then(response => {
        return response.data;
      })
      .then(({ hits, totalHits }) => {
        this.setState({ totalImages: totalHits });
        hits.map(el => {
          let articles = {
            id: el.id,
            tag: el.tags,
            largeImageURL: el.largeImageURL,
            webformatURL: el.webformatURL,
          };
          return this.setState(prevState => {
            return {
              searchImages: [...prevState.searchImages, articles],
            };
          });
        });
        return hits;
      })
      .catch(error => {
        alert(error.message);
      })
      .finally(() => {
        this.setState({ isLoading: STATUS.pending });
      });
  };

  componentDidUpdate(_, prevState) {
    const { search, pages } = this.state;
    if (prevState.search !== this.state.search) {
      this.setState({ searchImages: [] });
    }
    if (prevState.pages !== this.state.pages && prevState !== this.state) {
      try {
        this.api_searching(search, pages);
      } catch (error) {
        console.error('ERROR....', error);
      }
    }
  }

  onSubmitHandler = ({ newSearch, search, pages }) => {
    this.setState({ newSearch, pages, search, isLoading: STATUS.loading });
  };
  handleClick = largeImage => {
    this.setState({ modal: largeImage });
  };
  closeModal = () => {
    this.setState({ modal: null });
  };

  onloadMoreImages = () => {
    this.setState(prevState => {
      return { pages: prevState.pages + 1, isLoading: STATUS.loading };
    });
  };

  sendMessage = () => {
    if (this.state.totalImages === 0) return;
    else if (this.state.searchImages.length < this.state.totalImages) return;
    return;
  };

  render() {
    const result = this.state.isLoading;
    const modal = this.state.modal;
    const currentImages = this.state.pages * 12;
    const isMoreImages = this.state.pages > 0 && this.state.pages * 12 < this.state.totalImages;
    console.log(currentImages);

    return (
      <div>
        <Searchbar onSubmit={this.onSubmitHandler} />
        {result === STATUS.loading && <Loader />}
        <ImageGallery
          images={this.state.searchImages}
          status={this.state.isLoading}
          totalHits={this.state.totalImages}
          currentImages={currentImages}
          isMoreImages={isMoreImages}
          onClick={this.handleClick}
          loadMoreImages={this.onloadMoreImages}
        />
        {modal ? <Modal options={modal} closeModal={this.closeModal} /> : ''}
      </div>
    );
  }
}
