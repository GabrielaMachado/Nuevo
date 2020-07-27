import http from './httpService';
import { apiUrl } from '../config.json';

const apiEnpoint = apiUrl + '/todos';

export function getTodos(){
   return http.get(apiEnpoint);
}

export function getTodo(todoId){
    return http.get(apiEnpoint + "/" + todoId);
 }

export function saveTodo(todo){
    console.log("aqui ", todo)
    if (todo._id){
        return http.put(apiEnpoint + "/" + todo._id, todo);
    }

    return http.post(apiEnpoint, todo);
}

export function deleteTodos(todoId){
    http.delete(apiEnpoint + '/' + todoId);
}