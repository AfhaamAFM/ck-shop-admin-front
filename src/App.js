import React from 'react';
import Adminroutes from './compoennts/adminRoutes/Adminroutes';
import store from './REDUX/store';
import {Provider} from 'react-redux'
import axios  from 'axios';
// const myUrl= ''
axios.defaults.baseURL='/api'
 axios.defaults.withCredentials=true
// /api changed everthing
function App() {
  return (
    <div className="App">
    <Provider store ={store}>
      <Adminroutes/>
    </Provider>
    </div>
  );
}

export default App;
