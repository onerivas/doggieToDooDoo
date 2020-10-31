import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameField: '',
      passwordField: '',
    }
  }
  onChangeUsername = (event) => {
    this.setState({
      usernameField: event.target.value
    });
  }
  onChangePassword = (event) => {
    this.setState({
      passwordField: event.target.value
    })
  }
  onSubmitSignUp = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    const newUser = {
      email: this.state.usernameField,
      password: this.state.passwordField
    }
    axios.post('http://localhost:4000/auth/signup', newUser).then((response) => {
      window.location = '/'
    })
  }
  render() {
    return (
      <div>
      <div >
        <form onSubmit={ this.onSubmit }>
          <div className = 'form-group'>
            <label>E-mail: </label>
            <input type = 'text' className='form-control' value={this.state.usernameField} onChange={ this.onChangeUsername }/>
            <label className='my-2'>Password: </label>
            <input type= 'password' className='form-control' value={this.state.passwordField} onChange={this.onChangePassword}/>
          </div>
          <div className='form-group'>
            <button type='submit' value='Sign-up' className='btn btn-info'>Sign-up</button>
          </div>
        </form>
      </div>
      </div>
    )
  }
}
