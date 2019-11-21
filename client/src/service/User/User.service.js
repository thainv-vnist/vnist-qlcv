import { authHeader } from '../../helpers/AuthHeader';
import { LOCAL_SERVER_API } from '../../redux-constants/config';
import axios from 'axios';

export const userService = {
    getRoles,
    getLinkOfRole,
    resetPassword
};

function getRoles() {
    const id = localStorage.getItem('id');
    const requestOptions = {
        url: `${LOCAL_SERVER_API}/roles/${id}`,
        method: 'GET',
        headers: authHeader()
    };

    return axios(requestOptions);
}

function getLinkOfRole() {
    const currentRole = localStorage.getItem('currentRole');
    const requestOptions = {
        url: `${LOCAL_SERVER_API}/links/role/${currentRole}`,
        method: 'GET',
        headers: authHeader()
    };

    return axios(requestOptions);
}

function resetPassword(email) {
    const requestOptions = {
        url: `${LOCAL_SERVER_API}/users/reset-password`,
        method: 'POST',
        data: { email },
        headers: authHeader()
    };

    return axios(requestOptions);
}
