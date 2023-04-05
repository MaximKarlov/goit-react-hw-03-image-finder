import { React, Component } from 'react';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';
import Api from '../Api/Api_query';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { LoadMore } from './Button/Button';

export class App extends Component {
  state = {
    pages: 0,
    searchImages: [],
    search: '',
    isLoading: false,
    newSearch: false,
    totalImages: 0,
    modal: null,
  };

  api_searching = (search, pages) => {
    const response = Api.serching(search, pages);
    response
      .then(({ hits, totalHits }) => {
        this.setState({ totalImages: totalHits });
        return hits;
      })
      .then(data => {
        return data;
      });

    return response;
  };

  componentDidUpdate(_, prevState) {
    const { search, pages, newSearch, isLoading } = this.state;
    if (newSearch === true) {
      this.setState({ searchImages: [], isLoading: true });
      if (prevState.search !== this.state.search) {
        const articles = this.api_searching(search, pages);
        articles.then(data => {
          const { hits } = data;
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
        });
        this.setState({ newSearch: false, isLoading: false });
        // this.setState({ newSearch: false });
      }
    }
    if (prevState.pages !== this.state.pages) {
      if (prevState.search === this.state.search) {
        if (isLoading === true) {
          const articles = this.api_searching(search, pages);
          articles.then(data => {
            const { hits } = data;
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
          });
        }
      }
      this.setState({ isLoading: false });
    }
  }

  onSubmitHandler = ({ newSearch, search, pages }) => {
    this.setState({ newSearch, pages, search, isLoading: true });
  };
  handleClick = largeImage => {
    this.setState({ modal: largeImage });
  };
  closeModal = () => {
    this.setState({ modal: null });
  };

  onloadMoreImages = () => {
    this.setState(prevState => {
      return { pages: prevState.pages + 1, isLoading: true };
    });
  };

  sendMessage = () => {
    if (this.state.totalImages === 0) return;
    else if (this.state.searchImages.length < this.state.totalImages) return;
    return Notiflix.Notify.warning('Це остання сторінка');
  };

  render() {
    const result = this.state.isLoading;
    const modal = this.state.modal;
    const isMoreImages = this.state.pages > 0 && this.state.pages * 12 < this.state.totalImages;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmitHandler} />
        {result && <Loader />}
        <ImageGallery options={this.state.searchImages} onClick={this.handleClick} />
        {isMoreImages ? result ? <Loader /> : <LoadMore onClick={this.onloadMoreImages} /> : this.sendMessage()}

        {modal ? <Modal options={modal} closeModal={this.closeModal} /> : ''}
      </div>
    );
  }
}
