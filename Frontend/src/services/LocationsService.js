import axios from "axios";

const USERS_BASE_REST_API_URL='http://localhost:8080/api/v1/locations';

class LocationsService{
    getAllLocations(){
        return axios.get(USERS_BASE_REST_API_URL);
    }
    createLocation(location) {
        return axios.post(USERS_BASE_REST_API_URL, location);
    }
    getLocationById(id) {
        return axios.get(USERS_BASE_REST_API_URL + '/' + id);
    }

    updateLocation(location, id) {
        return axios.put(USERS_BASE_REST_API_URL + '/' + id, location);
    }
    deleteLocation(id) {
        return axios.delete(USERS_BASE_REST_API_URL + '/' + id);
    }

}

export default new LocationsService();