import * as React from 'react';
import { Provider } from 'react-redux';
import IntlProvider from './Intl-provider';
import getStore from './store';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import './decorator/decorator-mock';
import HentInitialData from './komponenter/initialdata/hent-initial-data';
import {
    basename,
} from './utils/konstanter';
import Routes from './routes';

const store = getStore();

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <HentInitialData>
                        <Router basename={basename}>
                            <Routes/>
                        </Router>
                    </HentInitialData>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
