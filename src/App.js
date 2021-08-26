import React from 'react';
import './App.css';
import Routing from './Router';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { PersonalDetailsReducer } from './Store/personalDetails/reducers';

export const appReducer = combineReducers({
  personalDetail: PersonalDetailsReducer,
})
let store = createStore(appReducer)

function App() {
  return (
    <div className="App">
      <Provider store={store}  >
        <Routing>
        </Routing>
      </Provider>
    </div>
  );
}

export default App;
