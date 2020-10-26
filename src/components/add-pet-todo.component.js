import React, { Component } from 'react';
import axios from 'axios';

export default class AddPetTodo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      petName: '',
      petTodos: [],
      todo_description:'',
      todo_completed: false
    }
  }
  componentDidMount = () => {
    // console.log(`http://localhost:4000/todos/${this.props.match.params.id}`);
      axios.get('http://localhost:4000/pets/'+this.props.match.params.id)
          .then(response => {
            console.log(response.data);
              this.setState({
                  pet_id: response.data._id,
                  petName: response.data.petName,
                  petTodos: response.data.petTodos
              })
          })
          .catch(function (error) {
              console.log(error);
          })
  }
  onChangeTodoDescription = (event) => {
    console.log(event.target.value);
    console.log(this.state.todo_description);
    this.setState({
      todo_description: event.target.value
    });
  }
  createTodo = (event) => {
    event.preventDefault()
    const todoArr = [...this.state.petTodos]
    const newTodo = {
      todo_description: this.state.todo_description,
      todo_completed: this.state.todo_completed
    };
    todoArr.push(newTodo);
    const updatedPet = {
      pet_id:this.state.pet_id,
      petName: this.state.petName,
      petTodos: todoArr
    }
    axios.post(`http://localhost:4000/pets/${this.props.match.params.id}`, updatedPet).then((response) => {
      window.location = '/';
    })

  }


render() {
  return (
    <div>
      <form onSubmit={this.createTodo}>
        <div className='form-group'>
          <label>Todo</label>
          <input type='text' className='form-control' onChange={this.onChangeTodoDescription}/>
        </div>
        <div className='form-group'>
          <input type='submit' value='+' className='btn btn-primary'/>
        </div>
      </form>
    </div>

  )
}


}
