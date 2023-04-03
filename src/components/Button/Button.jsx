import { React, Component } from 'react';
import { Loader } from '../Loader/Loader';
import btnCss from './Button.module.css';

let nextPages = '';
let isLoad = false;

export class LoadMore extends Component {
  componentDidUpdate = () => {
    const { pages, isLoading } = this.props.options;
    console.log(pages);
    console.log(nextPages);
    isLoad = isLoading;
    if (nextPages === pages) {
      return;
    }
  };
  resetConstants = () => {
    nextPages = '';
    isLoad = false;
  };
  // };

  onLoadMore = () => {
    nextPages = this.props.options.pages + 1;
    isLoad = true;
    this.props.onClick(isLoad, nextPages);
    this.resetConstants();
  };
  render() {
    console.log('button isLoad>>>', isLoad);
    return isLoad ? (
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
