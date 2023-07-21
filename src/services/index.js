import axios from 'axios'
import $router from "@/router"
import {
    error
} from 'jquery';

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
    console.log(err.response.status)
    if (err.response.status == 401) {
        return
    }
    if (err.response.status == 403) {
        console.log("logout")
        Auth.logout();
        $router.go()
        return
    }
})

let Napretci = {
    async addProgress(id, data) {
        const response = await Service.post(`/knjige/${id}`, data)
        return response.data
    },
    async changeProgress(id, data) {
        const response = await Service.patch(`/knjige/${id}`, data)
        return response.data
    },
}

let Liste = {
    async getUserLists() {
        const response = await Service.get("/")
        return response.data
    },
    async getPublicLists() {
        const response = await Service.get("/liste")
        return response.data
    },
    async addList(data) {
        const response = await Service.post("/liste", data)
        return response.data
    },
    async patchList(data) {
        const response = await Service.patch("/liste", data)
        return response.data
    },
    async deleteList(id) {
        console.log(id)
        const response = await Service.delete(`/liste?delete=${id}`)
        return response.data
    }
}

let Knjige = {
    async setBook(data) {

        console.log("data: ", data)

        const response = await Service.post("/add", data)

        return response.data
    },
    async getOne(id) {

        const response = await Service.get(`/knjige/${id}`)

        if (response) {
            return response.data;
        } else {
            console.error("Greška sa dobavljanjem")
            return
        }

    },
    async getAll(term) {
        const response = await Service.get(`/knjige?search=${term}`);

        if (response) {
            return response.data;
        } else {
            console.error("Greška sa dobavljanjem")
            return
        }
    }
}

let Auth = {
    async login(email, password) {
        try {
            console.log("jel se ovo izvodi?")
            const response = await Service.post("/auth", {
                email: email,
                password: password,
            });
            console.log("response: ", response)
            if (response) {


                const user = response.data

                localStorage.setItem("user", JSON.stringify(user))
                return true
            } else return false
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
    Auth,
    Liste,
    Napretci
}