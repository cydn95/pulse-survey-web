import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from 'Containers/App';
import { configureStore } from 'Redux/store';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { 
  faComment, 
  faTimesCircle, 
  faPlusCircle, 
  faMinusCircle, 
  faPlay, 
  faUser, 
  faPlus 
} from '@fortawesome/free-solid-svg-icons';

library.add(faComment, faTimesCircle, faPlusCircle, faMinusCircle, faPlay, faUser, faPlus);
dom.watch();

const MainApp = () => (
	<Provider store={configureStore()}>
			<Router>
				<Switch>
					<Route path="/" component={App} />
				</Switch>
			</Router>
	</Provider>
);

export default MainApp;
