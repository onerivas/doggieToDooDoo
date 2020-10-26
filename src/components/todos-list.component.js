import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pet = props => (
    <div>
      <div>{props.pet.petName}</div>
      {props.pet.petTodos.map((todo, index) => {
        return (
        <div>
          <div>
            {todo.todo_description}
          </div>
          <div>
            <form id={index} onSubmit={ () => {props.deleteTodo(index)} }>
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
  deleteTodo = (index, event) => {
    event.preventDefault();
    const todoArr = [...this.state.pets.petTodos]
    todoArr.splice(index, 1);
    axios.post(`http://localhost:4000/pets/${this.state.pets.P}`)

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
        return <Pet deleteTodo={this.deleteTodo} pet={currentPet} key={index} />;
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
