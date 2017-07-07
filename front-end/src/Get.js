/**
 * Created by mephisto on 7/6/17.
 */
import React, {Component} from 'react';
import $ from 'jquery'
import {Redirect, Link} from 'react-router-dom'

class Get extends Component{
    constructor(props) {
        super(props);
        this.confirmDelete = this.confirmDelete.bind(this)
        this.runForCover = this.runForCover.bind(this)
        this.state = {
            taskData: {}
        }
    }

    componentDidMount() {
        var taskId = this.props.match.params.taskId;
        $.getJSON(`http://localhost:3000/getTask/${taskId}`, (taskData)=>{
            this.setState({
                taskData: taskData
            })
        })
    }

    confirmDelete(event){
        var taskId = this.props.match.params.taskId;
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/deleteTask",
            data: {
                taskId: taskId,
            }
        }).done((tasksArray)=>{
            this.props.history.push('/');
            console.log("Delete!!")
        });
    }

    runForCover(){
        console.log('Don\'t Delete')
        this.props.history.push('/');
    }

    render(){
        // console.log(this.props.match.params)
        var taskId = this.props.match.params.taskId;
        return(
            <div className="container">
                <h2>Are you sure you want to delete {this.state.taskData.taskName}?</h2>
                <div>{this.state.taskData.taskName} - {this.state.taskData.taskDate}</div>
                <Link to={`/`}>Home</Link>
            </div>
        )
    }

}

export default Get;