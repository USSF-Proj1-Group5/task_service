import React from 'react'
import './App.css';

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      taskList: [],
      currentTask: '',
    }
  }

  async componentDidMount() {
    const taskList = await this.getTaskList();
    this.setState({ taskList: this.state.taskList.concat(taskList)});
  }

  async getTaskList() { 
    const response = await fetch('http://localhost:3001/tasks');
    const json = await response.json();
    console.log(json)
    //this.setState({ taskList: json});
    return json
  }

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
    var displayTasks = this.state.taskList.map(each => {
      return ( <tr>
                  <td>{each.name}</td>
                  <td>{each.category}</td>
                  <td>{each.recurrence}</td>
                  <td>{each.last_serviced}</td>
                  <td><button name={each.id} onClick={this.deleteTask}>Delete</button></td>
      </tr>

      )
    })
    return (
      <div>
        <h1>Task List</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Categroy</th>
              <th>Recurrence</th>
              <th>Last Serviced Date</th>
            </tr>
          </thead>
          <tbody>
            {displayTasks}
          </tbody>

          {/* {this.state.taskList.map(task => <li>{task.id}
                                            <button name={task} onClick={this.deleteTask}>Delete</button>
                                            </li>)} */}
        </table>
      </div>
    )
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <input placeholder="Enter Task" onChange={this.getCurrentTask} />
          <input placeholder="Enter Category" onChange={this.getCurrentTask} />
          <button onClick={this.addTask}>Add Task</button>
          {this.displayTasks()}
        </header>
      </div>
    );
  }
}

export default App;