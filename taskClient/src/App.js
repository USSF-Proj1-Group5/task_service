import React from 'react'
import './App.css';

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      taskList: ['task1', 'task2', 'task3'],
      currentTask: '',
    }
  }

  getCurrentTask = (event) => {
    this.setState({currentTask: event.target.value})
  }
 
  addTask = () => {
    let newList = this.state.taskList;
    newList.push(this.state.currentTask)
    this.setState({taskList: newList})
  }

  deleteTask = () => {

  }

  editTask = () => {

  }

  displayTasks = () => {
    return (
      <div>
        <h1>Maintenance Tasks</h1>
        <ul>
          {this.state.taskList.map(task => <li>{task}</li>)}
        </ul>
      </div>
    )
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <input onChange={this.getCurrentTask} />
          <button onClick={this.addTask}>Add Task</button>
          {this.displayTasks()}
        </header>
      </div>
    );
  }
}

export default App;