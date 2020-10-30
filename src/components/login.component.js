import React, { Component } from 'react';
// import axios from 'axios';

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

  // onChangeUsername = (event) => {
  //   this.setState({
  //     usernameField: event.target.value
  //   });
  // }
  // onChangePassword = (event) => {
  //   this.setState({
  //     passwordField: event.target.value
  //   })
  // }
  // onSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('Form submitted');
  //   const user = {
  //     email: this.state.usernameField,
  //     password: this.state.passwordField
  //   }
  //   axios.post('http://localhost:4000/auth/login', user).then((response) => {
  //     console.log(response.data);
  //     console.log(response.data.body._id);
  //     console.log(response.data.token);
  //     this.setState({
  //       token: response.data.token,
  //       user_id: response.data.body._id
  //     })
  //   })
  // }
  render() {
    return (
      <div>
        <form onSubmit={ this.props.login }>
          <div className = 'form-group'>
            <label>E-mail: </label>
            <input type = 'text' className='form-control' value={this.props.usernameField} onChange={ this.props.onChangeUsername }/>
            <label className='my-2'>Password: </label>
            <input type= 'password' className='form-control' value={this.props.passwordField} onChange={this.props.onChangePassword}/>
          </div>
          <div className='form-group'>
            <input type='submit' value='Log-in' className='btn btn-info'/>
          </div>
        </form>
      </div>
    )
  }
}
