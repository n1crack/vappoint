import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://estateagent.test/api/auth/';

class UserService {
    getProfile() {
        return axios.post(API_URL + 'me', {},{headers: authHeader()});
    }
}

export default new UserService();