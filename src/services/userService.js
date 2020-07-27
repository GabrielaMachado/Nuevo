import http from './httpService';
import { apiUrl } from '../config.json';

const apiEnpoint = apiUrl + '/users';

export function register(user) {
    return http.post(apiEnpoint, {
        email: user.email,
        name: user.name,
        password: user.password
    });
}