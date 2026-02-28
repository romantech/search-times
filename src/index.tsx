import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import rootReducer from './modules';
import App from './App';
import GlobalStyle from './styles/globalStyle';
import 'antd/dist/antd.min.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

const enhancer = import.meta.env.PROD
  ? compose(applyMiddleware())
  : composeWithDevTools(applyMiddleware());

const store = createStore(rootReducer, enhancer);
const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyle />
      </PersistGate>
      <App />
      <Analytics />
    </Provider>
  </React.StrictMode>,
);
