import PropTypes from 'prop-types';
import btnCss from './Button.module.css';

export const LoadMore = ({ onClick }) => {
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
