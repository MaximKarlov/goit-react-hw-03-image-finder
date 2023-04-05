import PropTypes from 'prop-types';
// import { Loader } from '../Loader/Loader';
import btnCss from './Button.module.css';

export const LoadMore = ({ onClick }) => {
  // componentDidUpdate = () => {
  //   const { pages, isLoading } = this.props.options;
  //   isLoad = isLoading;
  //   if (nextPages === pages) {
  //     return;
  //   }
  // };
  // resetConstants = () => {
  //   nextPages = '';
  //   isLoad = false;
  // };
  // };

  // onLoadMore = currentPages => {
  //   console.log('currentPages', currentPages);
  //   nextPages = currentPages + 1;
  //   isLoad = true;
  //   this.props.onClick(isLoad, nextPages);
  //   // this.resetConstants();
  // };

  return (
    <>
      <button type="submit" className={btnCss.btn} onClick={onClick}>
        <span> load more</span>
      </button>
    </>
  );
};

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
