import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://estateagent.test/api/appointment/';


class AppointmentService {
    all() {
        return axios.get(API_URL, {headers: authHeader()});
    }

    create(appointment) {
        return axios.post(API_URL, {appointment}, {headers: authHeader()});
    }

    show(id) {
        return axios.get(API_URL + id, {headers: authHeader()});
    }

    update(id, appointment) {
        return axios.post(API_URL + id, {appointment, _method: 'PATCH'}, {headers: authHeader()});
    }

    delete(id) {
        return axios.delete(API_URL + id, {headers: authHeader()});
    }


}

export default new AppointmentService();