import axios from 'axios'

let Service = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 70000
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

export {
    Service,
    Knjige
}