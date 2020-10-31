import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameField: '',
      passwordField: '',
      token: '',
      user_id: ''
    }
  }

  render() {
    return (
      <div>
        <div className=' card text-center intro p-4'>
          <h3> Welcome To DoggieToDooDoo!</h3>
          <p>DoggieToDooDoo is an app to help you track your pets day. Keep track of when you need to feed them, walk them, or anything you need! Log in or sign up below to start.</p>
        </div>
        <div className=''>
          <form onSubmit={ this.props.login }>
            <div className = 'form-group'>
              <label>E-mail: </label>
              <input type = 'text' className='form-control' value={this.props.usernameField} onChange={ this.props.onChangeUsername }/>
              <label className='my-2'>Password: </label>
              <input type= 'password' className='form-control' value={this.props.passwordField} onChange={this.props.onChangePassword}/>
            </div>
            <div className='form-group'>
              <button type='submit' value='Log-in' className='btn btn-info'>Log-in</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
