import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';
import { store } from './services/redux/store';
import { App } from './components/app/app';

console.log(process.env.NODE_ENV);

const Root = () => (
    <ReduxProvider store={store}>
        <Router>
            <App />
        </Router>
    </ReduxProvider>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
