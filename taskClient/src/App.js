import React from 'react'
import './App.css';

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      taskList: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6'],
      currentTask: '',
    }
  }

  // async componentDidMount() {
  //   const response = await fetch('http://localhost:3001/service_requests');
  //   const json = await response.json();
  //   //const importServiceRequests = json.sort((a, b) => new Date(b.date) - new Date(a.date));
  //   this.setState({ listSR: this.state.listSR.concat(json) });
  // }

  getCurrentTask = (event) => {
    this.setState({currentTask: event.target.value})
  }
 
  addTask = () => {
    let newList = this.state.taskList;
    newList.push(this.state.currentTask)
    this.setState({taskList: newList})
  }

  deleteTask = (event) => {
    let newList = this.state.taskList
    let taskIndex = newList.indexOf(event.target.name)
    newList.splice(taskIndex, 1)
    this.setState({taskList: newList})
  }

  editTask = () => {

  }

  displayTasks = () => {
    return (
      <div>
        <h1>Maintenance Tasks</h1>
        <ul>
          {this.state.taskList.map(task => <li>{task}
                                            <button name={task} onClick={this.deleteTask}>Delete</button>
                                            </li>)}
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