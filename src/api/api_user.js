import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:3000/users/"
    // baseURL: "http://localhost:4000/api/"
    // withCredentials: true
})

// API.interceptors.request.use((req) => {
//     if (localStorage && JSON.parse(localStorage.getItem("user"))) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`;
//     }
//     return req;
// })


async function login(mail, password) {
    try {
        return (await API.post('/login', { mail: mail, password: password })).data
        // return (await axios.post('http://localhost:4000/auth', { user: { email: email, password: password } })).data
    } catch(e) {
        console.log(e)
        return false
    }
}

async function authGoogle() {
    try {
        return (await API.get('/auth/:google'))
        // return (await axios.post('http://localhost:4000/auth', { user: { email: email, password: password } })).data
    } catch(e) {
        console.log(e)
        return false
    }
}

export default({
    login
})