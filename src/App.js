import React from 'react';
import Adminroutes from './compoennts/adminRoutes/Adminroutes';
import store from './REDUX/store';
import {Provider} from 'react-redux'
import axios  from 'axios';
// const myUrl= ''
axios.defaults.baseURL='https://server.afhaam.tech'
 axios.defaults.withCredentials=true

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
