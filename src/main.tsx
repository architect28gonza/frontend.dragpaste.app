import ReactDOM from 'react-dom/client';
import App from './App';
import '../public/css/App.css'

import { store } from './store.ts';

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux';

let persistor = persistStore(store)

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as HTMLElement);
// root.render(<App />);

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
);
