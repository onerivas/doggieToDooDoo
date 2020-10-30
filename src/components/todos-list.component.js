import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pet = props => (
    <div className=' d-flex card w-75 text-center border-info my-1 '>
      <div className='card-title card-header'>{props.pet.petName}</div>
      {props.pet.petTodos.map((todo, index) => {
        return (
          <div className=''>
        <div className='d-flex flex-row justify-content-center align-items-center my-2'>
          <div className='mx-2'>
            {todo.todo_description}
          </div>
          <div>
            <div>
              <button onClick={(event) => {
                props.todoCompleted(event, props.pet.petTodos[index]._id)
              }} className={todo.todo_completed ? "btn btn-sm btn-info mx-2" : "btn btn-sm btn-danger mx-2"} type='button'> <i class="fas fa-check"></i> </button>
            </div>
          </div>
          <div>
            <form id={index} onSubmit={ (event) => {props.deleteTodo(
              props.pet._id, props.pet.petTodos[index]._id, event)} }>
                <button type='submit' className='btn btn-sm btn-info shadow-none mx-2'><i class="fas fa-trash-alt"></i></button>
            </form>
          </div>
        </div>
        </div>


      )}
      )}
      <div className=' align-items-end my-2'>
            <Link className='btn-sm btn-info mx-1' to={"/edit/"+props.pet._id}><i class="fas fa-edit"></i></Link>
            <Link className='btn-sm btn-info mx-1' to={"/add/"+props.pet._id}><i class="fas fa-plus"></i></Link>
      </div>
    </div>
)

export default class TodosList extends Component {
  constructor(props){
    super(props);
    this.state = { pets: [] };
  }
  componentDidMount = () => {
    // axios.get('https://doggie-to-doodoo-back-end.herokuapp.com/pets')
    console.log(this.props.user_id);
    axios.get('http://localhost:4000/pets', {params:{_id:this.props.user_id}})
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
        <div className='row row-cols-md-3 '>
          { this.PetsList() }
        </div>

      </div>
    )
  }
}
