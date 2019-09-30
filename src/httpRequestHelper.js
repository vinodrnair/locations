import axios from 'axios'
import GLOBAL_CONFIG from './config.json'
const httpRequestHelper = {
    addLocation: async (position) => {
        try {
            let resp = await axios.post(`${GLOBAL_CONFIG.API_BASE_URL}/addLocation`, position)
            return resp
        } catch(e) {
            return e.data
        }
        
    },

    getAllLocations: async () => {
        try {
            let resp = await axios.get(`${GLOBAL_CONFIG.API_BASE_URL}/allLocations`)
            return resp
        } catch(e) {
            return undefined
        }
        
    },

    editLocation: async (id, position) => {
        let data = {
            id,
            position
        }
        try {
            let resp = await axios.post(`${GLOBAL_CONFIG.API_BASE_URL}/editLocation`, data)
            return resp
        } catch(e) {
            return e.data
        }
        
    },

    deleteLocation: async (id) => {
        try {
            let resp = await axios.delete(`${GLOBAL_CONFIG.API_BASE_URL}/deleteLocation?id=${id}`)
            return resp
        } catch(e) {
            return e.data
        }
    }
}

export default httpRequestHelper