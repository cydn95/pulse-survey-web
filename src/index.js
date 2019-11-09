import React from 'react';
import ReactDOM from 'react-dom';

import 'Assets/css/custom/fix.css';
import 'materialize-css/dist/css/materialize.min.css';

const rootEl = document.getElementById("root");

let render = () => {
    const MainApp = require('./App').default;
    ReactDOM.render(
      <MainApp />,
      rootEl
    );
};

if (module.hot) {
  module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      render(
        <NextApp />,
        rootEl
      );
  });
}

render() 