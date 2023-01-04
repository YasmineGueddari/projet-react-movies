import React ,{useState}from "react";
import { Provider } from "react-redux";
import Movies from "./components/Movies";
import movieAppStore from "./store/store";
import './App.css'


function App() {


  return (
    <div className="App">

                                
      <Provider store={movieAppStore}>
        <Movies />
    </Provider>


    </div>
  )
};

export default App;