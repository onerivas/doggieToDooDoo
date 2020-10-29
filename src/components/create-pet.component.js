import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePet extends Component {
  constructor(props) {
    super(props);

    this.state= {
      petName:'',
      petTodos: []
    }
  }
  onChangePetName = (event) => {
    this.setState({
      petName: event.target.value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    const newPet = {
      petName: this.state.petName,
      petTodos: this.state.petTodos,
      user: this.props.user_id
    }
    console.log(this.props.user_id);
    console.log(newPet);
    axios.post('http://localhost:4000/pets', newPet).then((response) => {
      window.location = '/';
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={ this.onSubmit }>
          <div className= " form-group " >
            <label>Pet Name: </label>
            <input type = ' text ' className = ' form-control ' value = { this.state.petName } onChange = { this.onChangePetName }/>
          </div>
          <div className="form-group">
              <input type="submit" value="Create Pet" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }



}
