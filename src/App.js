import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreatePet from "./components/create-pet.component";
import CreateUser from "./components/create-user.component";
import LoginUser  from "./components/login.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import AddTodo from './components/add-pet-todo.component.js';
import axios from 'axios';

console.log(LoginUser);

class App extends Component {
  constructor(){
    super();
    this.state = {
      usernameField: '',
      passwordField: '',
      token: '',
      user_id: ''
    }
  }
  onChangeUsername = (event) => {
    console.log(event.target.value);
    this.setState({
      usernameField: event.target.value
    });
  }
  onChangePassword = (event) => {
    this.setState({
      passwordField: event.target.value
    })
  }
  login = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    const user = {
      email: this.state.usernameField,
      password: this.state.passwordField
    }
    console.log(this.state.usernameField);
    axios.post('http://localhost:4000/auth/login', user).then((response) => {
      console.log(response.data);
      console.log(response.data.body._id);
      console.log(response.data.token);
      this.setState({
        token: response.data.token,
        user_id: response.data.body._id
      })
      localStorage.setItem('token', this.state.token)
      localStorage.setItem('user_id', this.state.user_id)
      console.log(this.state.token);
      console.log(localStorage);
    })
  }
  logOut = () => {
    console.log('logged out');
    this.setState({
      usernameField: '',
      passwordField: '',
      token: '',
      user_id: ''
    })
  }
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">DoggieToDooDoo</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
              {this.state.user_id ? <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Pet</Link>
                </li> : ('')}
              { this.state.user_id ? <li className="navbar-item">
                  <Link onClick={this.logOut} className='nav-link'>Log-out </Link>
                </li> : ('')}
              </ul>
            </div>
          </nav>
          <br/>
          { !this.state.user_id ? (<Route path="/" component={CreateUser} />) : ('') }
          { !this.state.user_id ? <Route path="/" render={(props) =>
            <LoginUser {...props} logOut={ this.logOut } login={ this.login } onChangeUsername={ this.onChangeUsername } onChangePassword={ this.onChangePassword }
            />} /> : ('')}
          { this.state.user_id ? <Route path="/" render={(props) =>
            <TodosList {...props} user_id={ this.state.user_id } token={ this.state.token }
          />} /> : ('') }
          <Route path="/edit/:id" render={(props) =>
            <EditTodo {...props} user_id={ this.state.user_id } token={ this.state.token }
          />} />
          <Route path="/create" render={(props) =>
            <CreatePet {...props} user_id={ this.state.user_id } token={ this.state.token }
          />} />
          <Route path="/add/:id" render={(props) =>
            <AddTodo {...props} user_id={ this.state.user_id } token={ this.state.token }
          />} />
        </div>
      </Router>
    );
  }
}

export default App;
