import axios from 'axios';
import authHeader from './auth-header';
import {API_URL} from "../../config";

class UserService {
    getProfile() {
        return axios.post(API_URL + 'api/auth/me', {},{headers: authHeader()});
    }
}

export default new UserService();