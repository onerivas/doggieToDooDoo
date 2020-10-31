import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      petName: '',
      petTodos: [],
      todo_description: '',
      todo_completed: false
    }
  }
  onChangePetName = (event) => {
    this.setState()
  }
  onChangeTodoDescription = (event) => {
    this.setState({
      todo_description: event.target.value
    });
  }
  onSubmit = (event) => {
    event.preventDefault()
    console.log(`Form submitted:`);
    console.log(`Todo Description: ${this.state.todo_description}`);
    const newTodo = {
      todo_description: this.state.todo_description,
      todo_completed: this.state.todo_completed
    }
    axios.post('https://doggie-to-doodoo-back-end.herokuapp.com/todos', newTodo)
    // axios.post('https://localhost:4000/todos', newTodo)
    .then( (response) => {
      window.location = '/';

    })
  }
  render() {
     return (
         <div style={{marginTop: 10}}>
             <h3>Create New Todo</h3>
             <form onSubmit={this.onSubmit}>
                 <div className="form-group">
                     <label>Description: </label>
                     <input  type="text"
                             className="form-control"
                             value={this.state.todo_description}
                             onChange={this.onChangeTodoDescription}
                             />
                 </div>
                 <div className="form-group">
                     <label>Responsible: </label>
                     <input
                             type="text"
                             className="form-control"
                             value={this.state.todo_responsible}
                             onChange={this.onChangeTodoResponsible}
                             />
                 </div>
                 <div className="form-group">
                     <div className="form-check form-check-inline">
                         <input  className="form-check-input"
                                 type="radio"
                                 name="priorityOptions"
                                 id="priorityLow"
                                 value="Low"
                                 checked={this.state.todo_priority==='Low'}
                                 onChange={this.onChangeTodoPriority}
                                 />
                         <label className="form-check-label">Low</label>
                     </div>
                     <div className="form-check form-check-inline">
                         <input  className="form-check-input"
                                 type="radio"
                                 name="priorityOptions"
                                 id="priorityMedium"
                                 value="Medium"
                                 checked={this.state.todo_priority==='Medium'}
                                 onChange={this.onChangeTodoPriority}
                                 />
                         <label className="form-check-label">Medium</label>
                     </div>
                     <div className="form-check form-check-inline">
                         <input  className="form-check-input"
                                 type="radio"
                                 name="priorityOptions"
                                 id="priorityHigh"
                                 value="High"
                                 checked={this.state.todo_priority==='High'}
                                 onChange={this.onChangeTodoPriority}
                                 />
                         <label className="form-check-label">High</label>
                     </div>
                 </div>

                 <div className="form-group">
                     <input type="submit" value="Create Todo" className="btn btn-primary" />
                 </div>
             </form>
         </div>
     )
 }
}
