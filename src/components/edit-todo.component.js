import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
  constructor(props) {
        super(props);


        this.state = {
          pet_id:'',
          petName:'',
          petTodos: [],
          todo_description: '',
          todo_completed: ''
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
       this.setState({
           todo_description: event.target.value
       });
   }

   // onChangeTodoCompleted = (event) => {
   //     this.setState({
   //         todo_completed: !this.state.todo_completed
   //     });
   // }
   updateTodo = (index, event) => {
     console.log(index);
     event.preventDefault()
     const todoArr = [...this.state.petTodos]
     const updatedTodo = {
       todo_description: this.state.todo_description,
       todo_completed: this.state.petTodos[index].todo_completed
     };
     todoArr.splice(index, 1, updatedTodo);
     console.log(updatedTodo);
     this.setState({
       pet_id:this.state.pet_id,
       petName: this.state.petName,
       petTodos: todoArr
     })
      const updatedPet = {
       pet_id:this.state.pet_id,
       petName: this.state.petName,
       petTodos: todoArr
     }
     console.log(updatedPet);
     console.log(updatedPet.pet_id);

     axios.post(`http://localhost:4000/pets/${this.props.match.params.id}`, updatedPet).then((response) => {
       window.location = '/';
     })
   }
   deletePet = (event) => {
     event.preventDefault();
     axios.delete(`http://localhost:4000/pets/${this.props.match.params.id}`).then((response) => {
       window.location = '/';
     })
   }
   // onSubmit = (event) => {
   //     event.preventDefault();
   //     const obj = {
   //       pet_id: this.state.pet_id,
   //       petName: this.state.petName,
   //       petTodos: this.state.petTodos
   //     };
   //     console.log(obj);
   //     // axios.post('https://localhost:4000/'+this.props.match.params.id, obj)
   //     //     .then(response => window.location = '/')
   // }
   deleteTodo = (event) => {
     event.preventDefault();
     console.log(this.state.todo_id);
     console.log(`/todo/${this.state.todo_id}`);
     axios.delete(`https://localhost:4000/pets/${this.state.todo_id}`)
     .then((response) => {
       window.location = '/'
     })
   }
   render() {
       return (
          <div>
            <div>
              {this.state.petTodos.map((todo, index) => {
                return (
                  <form onSubmit={(event) => {
                    this.updateTodo(index, event)
                  }}>
                    <div>
                      <label>Desctiption: </label>
                      <input  type="text"
                        className="form-control"
                        defaultValue={todo.todo_description}

                        onChange={this.onChangeTodoDescription}
                        />
                      <div className="form-group">
                        <button type='submit' className='btn btn-sm btn-info  my-3'>Update</button>
                      </div>
                    </div>
                  </form>
                )
              })}
              <div>
                <form onSubmit={this.deletePet} >
                  <button type='submit' className='btn btn-sm btn-info my-3'>Delete Pet</button>
                </form>
              </div>
            </div>
           </div>
       )
   }
}
