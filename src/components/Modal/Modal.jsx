import { React, Component } from 'react';
import PropTypes from 'prop-types';
import ModalCss from '../Modal/Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyESC);
  }

  handleClick = ({ target: { nodeName } }) => {
    if (nodeName === 'DIV') this.props.closeModal();
  };

  handleKeyESC = ({ code }) => {
    if (code === 'Escape') this.props.closeModal();
  };

  render() {
    const largeImage = this.props.options;
    return (
      <div className={ModalCss.overlay} onClick={this.handleClick}>
        <div className={ModalCss.modal}>
          <img src={largeImage} alt="bigFoto" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  props: PropTypes.shape({
    largeImage: PropTypes.string.isRequired,
  }),
  closeModal: PropTypes.func.isRequired,
};
