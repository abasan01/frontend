import axios from 'axios'

let Service = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 7000
})

let Knjige = {
    async setBook(data) {

        console.log("data: ", data)

        await Service.post("/upload", data)

        return
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