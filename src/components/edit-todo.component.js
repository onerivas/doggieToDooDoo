import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
  constructor(props) {
        super(props);


        this.state = {
          todo_id:'',
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }
    componentDidMount = () => {
      // console.log(`http://localhost:4000/todos/${this.props.match.params.id}`);
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
              // console.log(response.data);
                this.setState({
                    todo_id: response.data._id,
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onChangeTodoDescription = (e) => {
       this.setState({
           todo_description: e.target.value
       });
   }

   onChangeTodoResponsible = (e) => {
       this.setState({
           todo_responsible: e.target.value
       });
   }

   onChangeTodoPriority = (e) => {
       this.setState({
           todo_priority: e.target.value
       });
   }

   onChangeTodoCompleted = (e) => {
       this.setState({
           todo_completed: !this.state.todo_completed
       });
   }

   onSubmit = (e) => {
       e.preventDefault();
       const obj = {
           todo_description: this.state.todo_description,
           todo_responsible: this.state.todo_responsible,
           todo_priority: this.state.todo_priority,
           todo_completed: this.state.todo_completed
       };
       console.log(obj);
       axios.post('http://localhost:4000/todos/'+this.props.match.params.id, obj)
           .then(res => console.log(res.data));

       window.location = '/'
   }
   deleteTodo = (event) => {
     console.log(event.target.id);
     // axios.delete(`/todo/${event.target.value}`)
     // .then((response) => {
     //   this.props.history.push('/');
     // })
   }
   render() {
       return (
           <div>
               <h3 align="center">Update Todo</h3>
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
                   <div className="form-check">
                       <input  className="form-check-input"
                               id="completedCheckbox"
                               type="checkbox"
                               name="completedCheckbox"
                               onChange={this.onChangeTodoCompleted}
                               checked={this.state.todo_completed}
                               value={this.state.todo_completed}
                               />
                       <label className="form-check-label" htmlFor="completedCheckbox">
                           Completed
                       </label>
                   </div>

                   <br />

                   <div className="form-group">
                       <input type="submit" value="Update Todo" className="btn btn-primary" />
                   </div>
               </form>
               <form onSubmit={ this.deleteTodo }>
                <div className="form-group">
                  <input type="submit" value="Delete" className="btn btn-primary" />
                </div>
              </form>
           </div>
       )
   }
}
