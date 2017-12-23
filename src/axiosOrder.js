import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-bfd95.firebaseio.com/'
});

export default instance;