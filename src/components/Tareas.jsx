import React, { Component } from 'react';
import Tarea from './Tarea';
import './Tareas.css';


class Tareas extends Component {
    constructor(props) {
        super(props);
        const INITIAL = {
            tasks: [],
            taskText: "",
        };
        this.state = JSON.parse(localStorage.getItem('TareasState')) || INITIAL;


        this.onTareaTextChanged = this.onTareaTextChanged.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.onClickCompleteTask = this.onClickCompleteTask.bind(this);
        this.onClickDeleteTask = this.onClickDeleteTask.bind(this);
        this.onClickChangeColorTask = this.onClickChangeColorTask.bind(this);

    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.createNewTaskOnTasksArray()
        }
    }

    onTareaTextChanged(event) {
        this.setState({ taskText: event.target.value })
    }

    onBtnCreateClicked() {
        this.createNewTaskOnTasksArray()
    }


    onClickCompleteTask(task) {
        task.completed = !task.completed;
        let arrayTasksModified = this.state.tasks.map(item => item.id === task.id ? task : item)
        this.saveTasksChanged(arrayTasksModified)
    }

    onClickDeleteTask(task) {
        let arrayTasksModified = this.state.tasks.filter(item => item.id !== task.id)
        this.saveTasksChanged(arrayTasksModified)
    }

    onClickChangeColorTask(task, newColor) {
        console.log(task)
        console.log(newColor)
        console.log(this.state.tasks)


        task.color = newColor;
        let arrayTasksModified = this.state.tasks.map(item => item.id === task.id ? task : item)
        this.saveTasksChanged(arrayTasksModified)
    }

    createNewTaskOnTasksArray() {
        if (this.state.taskText === "") {
        } else {
            let arrayTasks = this.state.tasks
            let date = new Date()
            let keyTarea = date.getTime()
            arrayTasks = [{
                id: keyTarea,
                text: this.state.taskText,
                completed: false,
                color: "white",
            },
            ...arrayTasks]
            this.setState({
                taskText: "",
            })
            this.saveTasksChanged(arrayTasks)
        }
    }

    saveTasksChanged(arrayTasks) {
        this.setState({
            tasks: arrayTasks,
        }, () => {
            this.saveToLocalStorage()
            console.log('in the callback',this.state)
        })
        console.log('after setState run',this.state)

    }

    saveToLocalStorage() {
        localStorage.setItem('TareasState', JSON.stringify(this.state));
    }


    fillCardsTasks() {
        return this.state.tasks.map(tarea =>
            <Tarea
                key={tarea.id}
                data={tarea}
                onComplete={this.onClickCompleteTask}
                onDelete={this.onClickDeleteTask} 
                onChangeColor={this.onClickChangeColorTask} />)
    }


    render() {

        //onChange={(e) => this.onTareaTextChanged(e)} == {this.onTareaTextChanged}

        return (
            <div className="Tareas">
                <div>
                    <input
                    className = "newTaskBar"
                        type="text"
                        placeholder="Cual es tu tarea?"
                        onChange={(ev) => this.onTareaTextChanged(ev)}
                        onKeyDown={this.handleKeyDown}
                        value={this.state.taskText} />
                    <button className="buttonSearch" onClick={() => this.onBtnCreateClicked()}>Crear</button>
                </div>
                <div className="tasksList">
                    {this.fillCardsTasks()}
                </div>
            </div>
        );
    }
}

export default Tareas;