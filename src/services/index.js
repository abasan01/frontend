import axios from 'axios'
import $router from "@/router"

let Service = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 70000
})

Service.interceptors.request.use((request) => {
    try {
        request.headers['Authorization'] = 'Bearer ' + Auth.getToken();
    } catch (e) {
        console.error(e);
    }
    return request;
});


Service.interceptors.response.use((response) => response, (err) => {
    if (err.response.status == 401 || error.response.status == 403) {
        Auth.logout();
        $router.go()
    }
})

let Knjige = {
    async setBook(data) {

        console.log("data: ", data)

        let response = await Service.post("/add", data)

        return response.data
    },
    async getOne(id) {

        let response = await Service.get(`/knjige/${id}`)
        return response.data;
    },
    async getAll(term) {
        let response = await Service.get(`/knjige?search=${term}`);
        let data = response.data
        console.log(data)

        return data;
    }
}

let Auth = {
    async login(email, password) {
        try {
            const response = await Service.post("/auth", {
                email: email,
                password: password,
            });

            const user = response.data

            localStorage.setItem("user", JSON.stringify(user))
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    },
    async signup(email, name, password) {
        try {
            await Service.post("/users", {
                email: email,
                name: name,
                password: password,
            });

            return true
        } catch (e) {
            console.error(e)
            return false
        }
    },
    logout() {
        localStorage.removeItem("user");
    },
    getAuth() {
        return (localStorage.getItem("user"))
    },
    getToken() {
        const user = JSON.parse(Auth.getAuth())
        if (user && user.token) {
            return user.token
        } else {
            return false
        }
    }
}

export {
    Service,
    Knjige,
    Auth
}