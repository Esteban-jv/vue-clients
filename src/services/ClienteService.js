import api from "@/lib/axios";

export default {
    getClients() {
        return api.get('/clients')
    },
    storeClient(client) {
        return api.post('/clients', client)
    },
    getClient(id) {
        return api.get(`/clients/${id}`)
    },
    updateClient(id, client) {
        return api.patch(`/clients/${id}`, client) //IMPORTANT: put elimina status porque reemplaza todo el objeto
    },
    /*changeStatus(id, data) { //not realli necesary
        return api.patch(`/clients/${id}`, data)
    },*/
    deleteClient(id) {
        return api.delete(`/clients/${id}`)
    }
}