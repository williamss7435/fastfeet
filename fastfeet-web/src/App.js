import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';

import GlobalStyles from './styles/globalStyles';
import 'perfect-scrollbar-react/dist/style.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react'

import {store, persistor} from './store/index';
import Routes from './routes/routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>

          <Routes/>

          <ToastContainer 
            autoClose={2000} 
            position="bottom-center" 
            hideProgressBar 
            newestOnTop={true}
            draggable
          />
          <GlobalStyles/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
