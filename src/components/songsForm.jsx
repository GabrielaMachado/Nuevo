import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getTodo, saveTodo } from '../services/todoService';

class SongsForm extends Form {
    state = {
        data: { 
            title: "",
            userId: "5f1dbdba901e6c667e3d8dd8",
            completed: false
        },
        errors:{}
    };
    
    async componentDidMount() {

        const todoId = this.props.match.params.id;
        if (todoId === "new") return;

        const { data: todo} = await getTodo(todoId);
        if (!todo) return this.props.history.replace("/");

        this.setState( {data: this.mapToViewModel(todo) });
    }

    mapToViewModel(todo) {
        return {
            _id: todo._id,
            title: todo.title,
            userId: todo.user._id,
            completed: todo.completed
        };
    }

    doSubmit = async () => {
        console.log(this.state.data)
        await saveTodo(this.state.data);
        this.props.history.push("/");
    }

    render(){
        return (
            <div>
                <h1>Nueva tarea</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Tarea")}
                    {this.renderButton("Guardar")}
                </form>
            </div>
        )
    }
}

export default SongsForm;