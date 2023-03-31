import { React, Component } from 'react';
// import Api from '../Api/Api_query';
import searchCss from '..//Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    search: '',
    newSearch: false,
    pages: 1,
  };

  handleValueChange = e => {
    let value = e.target.value;
    this.setState({ search: value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState({ newSearch: true });
    setTimeout(() => {
      if (this.state.newSearch === true) {
        this.props.onSubmit(this.state);
        this.setState({ search: '' });
      } else alert('Something went wrong');
    }, 1000);
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
