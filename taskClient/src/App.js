import React from 'react'
//import React, { useState, useEffect } from "react";
import './App.css';
import DisplayTasks from './DisplayTasks';
import AddTask from './AddTask';
import AdminTasks from './adminTasks';
const urlAPI = 'http://localhost:3001'

class App extends React.Component {
  

  constructor (props) {
    super(props)
    this.state = {
                  currentTaskName: '',
                  currentCategory: '',
                  currentRecurrence: '',
                  currentServicedDate: '',
                  currentUser: '',
                  taskList: [],
                  toRender: true,
                  }
  }

  async componentDidMount() {
    const database = await this.getTaskList();
    this.setState({ taskList: this.state.taskList.concat(database),
                      toRender: false });
  }
  
  async getTaskList() {
    const response = await fetch(`${urlAPI}/tasks`);
    const json = await response.json();
    return json;
  }
  
  async componentDidUpdate(prevProps, prevState) {
    if(prevProps.taskList !== this.props.taskList){
      const newTaskList = await this.getTaskList();
      this.setState({ taskList: this.state.taskList.concat(newTaskList) });
    }
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

  handleCurrentUser = (event) => {
    this.setState({currentUser: event.target.value})
  }
 
  handleAddTask = async(event) => {
    let addTask = { name: this.state.currentTaskName,
                    category: this.state.currentCategory,
                    recurrence: this.state.currentRecurrence,
                    last_serviced: this.state.currentServicedDate,
                    user_id: this.state.currentUser,
                  }
                  //console.log(addTask)
      this.addTask(addTask);
     // event.target.reset();
      this.setState({taskList: this.state.taskList.concat(addTask)})
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
        // console.log(body)
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        };
        await fetch(`${urlAPI}/addTask`, requestOptions)
        .then(response => {
          response.json()
        })
        // .then(response => {
        //   if(response.status === "failed")
        //   alert(response.message)
        // })
        
        // this.setState({toRender: true})
  }

  handleDeleteTask = async(event) => {
    let deleteTask = {
      id: event.target.value
    }
    console.log(deleteTask)
    this.deleteTask(deleteTask);
    this.componentDidUpdate(this.state.taskList)
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
      <div>
        <AddTask  onCurrentTaskName={this.handleCurrentTaskName}
                  onCurrentCategory={this.handleCurrentCategory}
                  onCurrentRecurrence={this.handleCurrentRecurrence}
                  onCurrentServicedDate={this.handleCurrentServicedDate}
                  onAddTask={this.handleAddTask} />
        <AdminTasks onUser={this.handleCurrentUser} />
        <header className="App-header">
          <DisplayTasks listTasks={this.state.taskList} onDeleteTask = {this.handleDeleteTask} />
        </header>
      </div>
    ); 
  }
}

export default App;