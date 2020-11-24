import React from 'react'
import './App.css';
import DisplayTasks from './DisplayTasks';
import AddTask from './AddTask';
const urlAPI = 'http://localhost:3001'

class App extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
                  currentTaskName: '',
                  currentCategory: '',
                  currentRecurrence: '',
                  currentServicedDate: '',
                  taskList: [],
                  toRender: true,
                  }
  }


  async componentDidMount() {
    const response = await fetch(`${urlAPI}/tasks`);
    const json = await response.json();
    this.setState({ taskList: json,
                      toRender: false });
  }

  handleCurrentTaskName = (event) => {
    this.setState({currentTaskName: event.target.value})
  }

  handleCurrentCategory = (event) => {
    this.setState({currentCategory: event.target.value})
  }

  handleCurrentRecurrence = (event) => {
    this.setState({currentRecurrence: event.target.value})
  }

  handleCurrentServicedDate = (event) => {
    this.setState({currentServicedDate: event.target.value})
  }
 
  handleAddTask = async(event) => {
    let addTask = { name: this.state.currentTaskName,
                    category: this.state.currentCategory,
                    recurrence: this.state.currentRecurrence,
                    serviced_date: this.state.currentServicedDate,
                  }
                  //console.log(addTask)
      this.addTask(addTask);
      this.setState({toRender: true})
    
    // let newList = this.state.taskList;
    // newList.push({
    //               name: this.state.currentTask.name,
    //               category: this.state.currentTask.category,
    //               recurrence: this.state.currentTask.recurrence,
    //               last_serviced: this.state.currentTask.last_serviced,
    //               })
    // this.setState({taskList: newList})
  }

  addTask = async(body) => {
    //console.log(body)
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };
    await fetch(`${urlAPI}/addTask`, requestOptions)
        .then(response => response.json())
        .then(response => {
          if(response.status === "failed")
          alert(response.message)
        })
  }

  handleDeleteTask = async(event) => {
    let deleteTask = {
      id: event.target.value
    }
    console.log(deleteTask)
    this.deleteTask(deleteTask)
    // let newList = this.state.taskList
    // let taskIndex = newList.indexOf(event.target.name)
    // newList.splice(taskIndex, 1)
    // this.setState({taskList: newList})
  }

  deleteTask = async(body) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };
    await fetch(`${urlAPI}/deleteTask`, requestOptions)
    .then(response => response.json())
    .then(response => {
      if(response.status === "failed")
      alert(response.message)
    })
  }

  editTask = () => {

  }

  render () {
    return (
      <div className="App">
        <AddTask  onCurrentTaskName={this.handleCurrentTaskName}
                  onCurrentCategory={this.handleCurrentCategory}
                  onCurrentRecurrence={this.handleCurrentRecurrence}
                  onCurrentServicedDate={this.handleCurrentServicedDate}
                  onAddTask={this.handleAddTask} />
        <header className="App-header">
          <DisplayTasks listTasks={this.state.taskList} onDeleteTask = {this.handleDeleteTask} />
        </header>
      </div>
    ); 
  }
}

export default App;