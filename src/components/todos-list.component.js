import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pet = props => (
    <div>
      <div>{props.pet.petName}</div>
      {props.pet.petTodos.map((todo, index) => {
        return (
        <div className='todo'>
          <div>
            {todo.todo_description}
          </div>
          <div>
            <div>
              {todo.todo_completed ? 'true' : 'false' }
            </div>
            <div>
              <button onClick={(event) => {
                props.todoCompleted(event, props.pet.petTodos[index]._id)
              }} className='btn btn-primary' type='button'> completed? </button>
            </div>
          </div>
          <div>
            <form id={index} onSubmit={ (event) => {props.deleteTodo(
              props.pet._id, props.pet.petTodos[index]._id, event)} }>
              <br/>
              <div className="form-group">
                <input type="submit" value="X" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>

      )}
      )}
        <p>
            <Link to={"/edit/"+props.pet._id}>Edit</Link>
            <Link to={"/add/"+props.pet._id}>+</Link>
        </p>
    </div>
)

export default class TodosList extends Component {
  constructor(props){
    super(props);
    this.state = { pets: [] };
  }
  componentDidMount = () => {
    // axios.get('https://doggie-to-doodoo-back-end.herokuapp.com/pets')
    axios.get('http://localhost:4000/pets')
    .then((response) => {
      console.log(response.data);
      this.setState({ pets: response.data});
    })
    .catch((error) => {
      console.log(error);
    })
  }
  todoCompleted = (event, todo_id) => {
    this.state.pets.map((currentPet, index) => {
      currentPet.petTodos.map((todo, index) => {
        if (todo._id === todo_id) {
          console.log(currentPet._id);
          console.log(todo.todo_completed);
          todo.todo_completed = !todo.todo_completed
          console.log(todo.todo_completed);
          const updatedPet = currentPet
          console.log(updatedPet);
          axios.post(`http://localhost:4000/pets/${currentPet._id}`, updatedPet).then((response) => {
            console.log(this.state.pets);
            this.setState({
              pets:this.state.pets
            })
          })
        }
      })
    })
  }
  deleteTodo = (pet_id, todo_id, event) => {
    event.preventDefault();
    this.state.pets.map((currentPet, index) => {
      console.log(currentPet.petTodos);
      currentPet.petTodos.map((todo, index) => {
        if (todo._id === todo_id) {
          currentPet.petTodos.splice(index, 1)
          console.log(currentPet);
          const updatedPet = currentPet
          axios.post(`http://localhost:4000/pets/${pet_id}`, updatedPet).then((response) => {
            this.setState({
              pets:this.state.pets
            })
          })
        }
      })
    })
  }
  PetsList = () => {
      return this.state.pets.map((currentPet, index) => {
        // console.log(currentPet.petName);
        // console.log(currentPet.petTodos);
        // console.log(currentPet.petTodos.map((todo) => {
        //   return todo.todo_description
        // }));
        // currentPet.petTodos.map((todo,i) => {
        //   console.log(todo);
        //   console.log(todo.todo_description);
        //   console.log(todo.todo_completed);
        //   const todoObj = todo
        //   console.log(todoObj);
        //   return todoObj
        // })
        // console.log(todoObj);
        return <Pet
        todoCompleted={this.todoCompleted} deleteTodo={this.deleteTodo} pet={currentPet} key={index} />;
      })
  }
  render() {
    return (
      <div>
        <h3>Pets List</h3>
        <div>
          { this.PetsList() }
        </div>

      </div>
    )
  }
}
