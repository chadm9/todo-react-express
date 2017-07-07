import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import { Link } from 'react-router-dom';


class Edit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            taskList: []
        }
        this.editTask = this.editTask.bind(this)
        // Make sure addNewTask uses the class "this"
    }

    // compondentDidMount runs AFTER the first render
    componentDidMount() {
        var taskId = this.props.match.params.taskId;

        //console.log(taskId)
        $.getJSON(`http://localhost:3000/getTask/${taskId}`, (taskData)=>{
            this.setState({
                taskData: taskData
            })

        })

    }

    editTask(event){
        event.preventDefault();
        var newTask = document.getElementById('new-task').value;
        var newTaskDate = document.getElementById('new-task-date').value;
        // console.log(newTask)
        // console.log(newTaskDate)
        // THis is a POST request, so we can't use $.getJSON (only does get)
        // $.ajax expects an object that tells it what to send (data),
        // where to send it (url), and how to send it (method)
        // $.ajax is a promise which has a "done" method that will run when
        // ajax is back. It gets a param of whatever JSON was returned by the API request
        // Inside that funciton, we update REact state (theClass), which causes
        // a re-render, which updates the list because we are mapping through this.state.theClass.

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/editTask",
            data: {
                taskName: newTask,
                taskDate: newTaskDate
            }
        }).done((tasksArray)=>{
            this.setState({
                taskList: tasksArray
            })
        })
    }


    render(){
        // Create an array to dump into our return. It will contain
        // components or HTML tags
        var taskArray = [];
        // Loop throuhg our state var. The frist time through, it will be empty
        this.state.taskList.map((task,index)=>{
            // push an li tag onto our array for each element in the state var
            taskArray.push(
                <div key={index}>
                </div>);
        });

        return(
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">

                </p>

                <form onSubmit={this.editTask} className="add-box">
                    <input type="text" id="new-task" placeholder='newtask'/>
                    <input type="date" id="new-task-date" />
                    <button type="submit" className="btn btn-primary">Add Task</button>
                </form>

                <p>
                    {taskArray}
                </p>
            </div>
        )
    }

}

export default Edit;/**
 * Created by mephisto on 7/6/17.
 */
