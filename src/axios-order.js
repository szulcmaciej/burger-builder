import Axios from "axios";

const instance = Axios.create({
    baseURL: 'https://burger-builder-115.firebaseio.com/'
});

export default instance;