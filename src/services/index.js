import axios from 'axios'

let Service = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 2000
})

let Knjige = {
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