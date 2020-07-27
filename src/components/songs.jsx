import React, { Component } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { getTodos, deleteTodos } from '../services/todoService';
import { Link } from 'react-router-dom';
import Like from './common/like'
import SearchBox from "./searchBox";
import jwtDecode from 'jwt-decode';

const apiEndpoint = 'https://jsonplaceholder.typicode.com/todos';
class Songs extends Component {
  state = {
      todos: [],
      songs: [],
      searchQuery: "",
      user:""
  };


  async componentDidMount(){
    const jwt = localStorage.getItem('token');
    const users = jwtDecode(jwt);

    this.setState({user: users, searchQuery: ""})
//this.getPagedData();
    const { data: todos } = await getTodos();

    this.setState({ todos });
  }

  handleCreate = async () => {
      const obj = { 
          "userId": 1,
      "title": "Newwww",
      "completed": true };
      const {data: todo} = await axios.post(apiEndpoint, obj);

      const todos = [todo, ...this.state.todos];
      this.setState({ todos })
  }

  handleSearch = query => {
    this.setState({ searchQuery: query});
  };

  handleUpdate = async todo => {
    todo.title = "UPDATED";
    await axios.put(apiEndpoint + '/' +todo.id, todo);
    const todos = [...this.state.todos];
    const index = todos.indexOf(todo);
    todos[index] = {...todo};
    this.setState({ todos })
};

  handleDelete = async (todo) => {
      const originalTodos = this.state.todos;
    const todos = originalTodos.filter(t => t.id !== todo.id);
    this.setState({todos});

    try{
        await deleteTodos(todo._id);
    }
    catch (ex) {
        if(ex.response && ex.response.status === 404)
        toast.error('Esta tarea ya se ha borrado');

        this.setState({ todos: originalTodos });
    }
}

  handleLike = song => {
      const todos = [...this.state.todos];
      const index = todos.indexOf(song);
      todos[index] = { ...todos[index] }
      todos[index].completed = !todos[index].liked;
      this.setState({ todos });
  }

  getPagedData = () => {
    const {
      searchQuery,
      songs: allSongs,
      user
    } = this.state;

    
    let filtered = allSongs;
    if (searchQuery)
      filtered = allSongs.filter(m =>
        m.titulo.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        m.artista.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        m.genero.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      else if (user && user._id)
        filtered = allSongs.filter(t => t.user._id === user._id );

console.log(filtered);

    return { totalCount: filtered.length, data: filtered };
  };

  render() {

    const { length: count } = this.state.songs;
    const { user } = this.props;

    //const { totalCount, data: songs} = this.getPagedData();
    return ( 
        <React.Fragment>
            <h1>Lista de tareas</h1>
            <Link to="/newSong/new" 
                className="btn btn-primary" 
                style = {{ marginBottom: 20, marginTop:20 }}
            >
                Nueva tarea
            </Link>
            <SearchBox value={this.state.searchQuery} onChange={this.handleSearch} />
            <table className="table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th/>
                        <th/>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    { this.state.todos.map(todo => (
                    
                    <tr key={todo._id}>
                        <td>{todo.title}</td>
                        <td>
                            <Like liked={todo.completed} onClick={() => this.handleLike(todo)}/>
                        </td>
                        <td>
                            <Link to={`/newSong/${todo._id}`}>
                                <button 
                                    className="btn btn-primary sm">
                                        <i className="fa fa-pencil-square-o" 
                                        aria-hidden="true">
                                        </i>
                                </button>
                            </Link>
                        </td>
                        <td>
                            <button 
                                onClick={() => this.handleDelete(todo)} 
                                className="btn btn-danger sm">
                                    <i className="fa fa-trash" 
                                    aria-hidden="true">
                                    </i>
                            </button>
                        </td>
                    </tr>
                    ))}            
                </tbody>
            </table>
        </React.Fragment>
    );
  }
}

export default Songs;
