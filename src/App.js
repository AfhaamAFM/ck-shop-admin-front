import React from 'react';
import Adminroutes from './compoennts/adminRoutes/Adminroutes';
import store from './REDUX/store';
import {Provider} from 'react-redux'
import axios  from 'axios';

const production=false

let url=production?'/api':'http://localhost:5000'
axios.defaults.baseURL=url
 axios.defaults.withCredentials=true
// /api changed everthing
function App() {
  return (
    <Provider store ={store}>
      <Adminroutes/>
    </Provider>
  );
}

export default App;
