import { React, Component } from 'react';
import PropTypes from 'prop-types';
import searchCss from '..//Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleValueChange = e => {
    let value = e.target.value;
    this.setState({ search: value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const search = this.state.search;
    const newSearch = true;
    const pages = 1;
    this.props.onSubmit({ newSearch, search, pages });
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={searchCss.searchbar}>
        <form onSubmit={this.onSubmitHandler} className={searchCss.form}>
          <button type="submit" className={searchCss.button}>
            <span className={searchCss.button_label}>Search</span>
          </button>
          <input
            className={searchCss.input}
            name="value"
            value={this.state.search}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleValueChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
