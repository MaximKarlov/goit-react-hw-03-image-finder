import { React, Component } from 'react';
import { Watch } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
    return (
      <Watch
        height="60"
        width="60"
        radius="48"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
        wrapperClassName=""
        visible={true}
      />
    );
  }
}
