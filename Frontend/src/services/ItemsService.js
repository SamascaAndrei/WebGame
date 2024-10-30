import axios from "axios";

const USERS_BASE_REST_API_URL='http://localhost:8080/api/v1/items';

class ItemsService{
    getAllItems(){
        return axios.get(USERS_BASE_REST_API_URL);
    }
    createItem(item) {
        return axios.post(USERS_BASE_REST_API_URL, item);
    }
    getItemById(id) {
        return axios.get(USERS_BASE_REST_API_URL + '/' + id);
    }

    updateItem(item, id) {
        return axios.put(USERS_BASE_REST_API_URL + '/' + id, item);
    }
    deleteItem(id) {
        return axios.delete(USERS_BASE_REST_API_URL + '/' + id);
    }

}

export default new ItemsService();