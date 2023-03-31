import { React, Component } from 'react';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';
import Api from './Api/Api_query';
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

  componentDidUpdate(_, prevState) {
    const { search, pages, newSearch } = this.state;

    if (prevState.pages !== this.state.pages) {
      if (prevState.search === this.state.search) {
        if (newSearch === false) {
          try {
            const resp = Api.serching(search, pages);
            resp.then(({ hits }) => {
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
          } catch (error) {
            Notiflix.Notify.error(error);
          } finally {
            this.setState({ isLoading: false });
          }
        }
      }
    }
    return;
  }

  onSubmitHandler = data => {
    const { search, newSearch } = data;
    this.setState({ newSearch: newSearch });
    const articlesArray = [];
    if (newSearch === true) {
      this.setState({ search: search, pages: 1, searchImages: [], isLoading: true, newSearch: true });
    }
    try {
      const response = Api.serching(search, 1);
      response.then(({ hits, totalHits }) => {
        this.setState({ totalImages: totalHits });
        hits.map(el => {
          let articles = {
            id: el.id,
            tag: el.tags,
            largeImageURL: el.largeImageURL,
            webformatURL: el.webformatURL,
          };
          return articlesArray.push(articles);
        });

        return this.setState({ isLoading: false, newSearch: false, searchImages: articlesArray });
      });
    } catch (error) {
      Notiflix.Notify.error(error);
    }
  };
  handleClick = largeImage => {
    this.setState({ modal: largeImage });
  };
  closeModal = () => {
    this.setState({ modal: null });
  };

  onloadMoreImages = data => {
    this.setState({ pages: data.pages, isLoading: data.isLoading });
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
        {isMoreImages ? <LoadMore options={this.state} onClick={this.onloadMoreImages} /> : this.sendMessage()}
        {modal ? <Modal options={modal} closeModal={this.closeModal} /> : ''}
      </div>
    );
  }
}
