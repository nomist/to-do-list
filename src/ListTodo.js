import React, { Component } from 'react';

class ListTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      currentTask: ''
    };

    this.addTask = this.addTask.bind(this);
    this.setCurrentTask = this.setCurrentTask.bind(this);
    this.checkTask = this.checkTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  setCurrentTask(e) {
    this.setState({
      currentTask: e.target.value
    })
  }

  addTask() {
    const { tasks, currentTask } = this.state;
    if (currentTask.length) {
      this.setState({
        tasks: [ ...tasks, {
          text: currentTask,
          checked: false
        }],
        currentTask: ''
      });
    }
  }

  checkTask(num) {
    return function() {
      const { tasks } = this.state;
      this.setState ({
        tasks: tasks.map( (item, i) => {
          if (i === num) {
            return {...item, checked: !item.checked}
          }
          return item;
        })
      });
    }.bind(this)
  }

  deleteTask(num) {
    return function() {
      const { tasks } = this.state;
      this.setState ({
        tasks: tasks.filter( (item, i) => {
          return i !== num;
        })
      });
    }.bind(this)
  }

  render() {
    const { tasks, currentTask } = this.state;
    return (
      <div>
        <ul>
          {tasks.map((item, i) =>
            <li key={i + item.text}>
              <span onClick={this.checkTask(i)} style={
                item.checked
                  ? {textDecoration: 'line-through'}
                  : {}
              }>{item.text}</span>
              <button>Edit</button>
              <button onClick={this.deleteTask(i)}>Delete</button>
            </li>
          )}
        </ul>
        <input type="text" size="40" onChange={this.setCurrentTask} value={currentTask} />
        <button onClick={this.addTask}>Add</button>
      </div>
    );
  }
}

export default ListTodo;
