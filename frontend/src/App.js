import React from 'react'
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Products from './Pages/Products.js'
import Search from './Components/Search';
import LoginSignUp from './Components/User/LoginSignUp'

function App() {
  return (
    <Router>
      <Navbar/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/product/:id' component={ProductDetails}/>
          <Route exact path='/products' component={Products}/>
          <Route path='/products/:keyword' component={Products}/>
          <Route exact path='/Search' component={Search}/>
          <Route exact path='/Login' component={LoginSignUp}/>
        </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
