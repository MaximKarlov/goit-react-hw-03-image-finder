import { React, Component } from 'react';
import { Loader } from '../Loader/Loader';
import Notiflix from 'notiflix';
import btnCss from './Button.module.css';

export class LoadMore extends Component {
  state = {
    isLoading: false,
    pages: 0,
  };

  componentDidMount = () => {
    const { pages } = this.props.options;
    this.setState({ pages: pages });
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.isLoading !== this.state.isLoading) {
      this.props.onClick(this.state);
      setTimeout(() => this.setState({ isLoading: false }), 1000);
    }
  };

  onLoadMore = () => {
    try {
      this.setState({ isLoading: true });
      console.log(this.state);
      let page = this.state.pages + 1;
      this.setState({ pages: page, isLoading: true });
    } catch (error) {
      Notiflix.Notify.error(error);
    }
  };

  render() {
    const loading = this.state.isLoading;
    return loading ? (
      <Loader />
    ) : (
      <button type="submit" className={btnCss.btn} onClick={this.onLoadMore}>
        <span> load more</span>
      </button>
    );
  }
}

// onLoadMore = options => {
//   this.setState({ loading: true });
//   this.props.onClick(false);
// };
