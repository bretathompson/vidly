import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";


class App extends Component {
  state = { 
    counters: [
        { id: 1, value: 4},
        { id: 2, value: 0},
        { id: 3, value: 0},
        { id: 4, value: 0},
    ]
 }; 

 constructor() {
  super();
  console.log('App - Constructor');
 }

 componentDidMount() {
  console.log('App - Mounted');
 }

 handleIncrement = counter => {
  const counters = [...this.state.counters];
  const index = counters.indexOf(counter);
  counters[index] = { ...counter };
  counters[index].value++;
  this.setState({ counters });
};

handleDecrement = counter => {
  const counters = [...this.state.counters];
  const index = counters.indexOf(counter);
  counters[index] = { ...counter };
  counters[index].value--;
  this.setState({ counters });
};

 handleReset = () => {
    const counters = this.state.counters.map(c => {
        c.value = 0;
        return c;
    });
    this.setState({ counters });
 };

 handleDelete = (counterId) => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({counters});
 };

  render () {
    console.log('App - Rendered');

  return ( 
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/movies/:id' component={MovieForm} />
            <Route path='/movies' component={Movies}></Route>
            <Route path='/customers' component={Customers}></Route>
            <Route path='/rentals' component={Rentals}></Route>
            <Route path='/not-found' component={NotFound}></Route>
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

