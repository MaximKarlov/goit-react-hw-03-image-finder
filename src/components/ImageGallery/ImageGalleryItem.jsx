import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImageCss from './Image.module.css';

export class ImageGalleryItem extends Component {
  render() {
    const { id, largeImage, tag, webFormat } = this.props;
    return (
      <li className={ImageCss.gallery_item} id={id}>
        <img src={webFormat} alt={tag} onClick={() => this.props.onClick(largeImage)} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  props: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
