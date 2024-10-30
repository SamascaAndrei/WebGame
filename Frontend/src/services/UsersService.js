import axios from "axios";

const USERS_BASE_REST_API_URL='http://localhost:8080/api/v1/users';

class UsersService{
    getAllUsers(){
        return axios.get(USERS_BASE_REST_API_URL);
    }
    createUser(user) {
        return axios.post(USERS_BASE_REST_API_URL, user);
    }
    getUserById(id) {
        return axios.get(USERS_BASE_REST_API_URL + '/' + id);
    }

    updateUser(user, id) {
        return axios.put(USERS_BASE_REST_API_URL + '/' + id, user);
    }
    deleteUser(id) {
        return axios.delete(USERS_BASE_REST_API_URL + '/' + id);
    }
    login(user){
        return axios.post(USERS_BASE_REST_API_URL+'/login',user);
    }
    getItems(id){
        return axios.get(USERS_BASE_REST_API_URL+'/'+id+'/items');
    }
    getDropItems(userId, monId){
        return axios.put(`${USERS_BASE_REST_API_URL}/${userId}/kill/${monId}`);
    }
    addItem(userid,itemid)
    {
        return axios.put(`${USERS_BASE_REST_API_URL}/${userid}/add/${itemid}`)
    }
}

export default new UsersService();