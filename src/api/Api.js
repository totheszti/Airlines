import axios from "axios";

const BASE_URL = 'http://localhost:8080';

export default class Api {

    /*VÁROSOK*/

    //összes város lekérése
    static getAllCity() {
        const url = BASE_URL + '/city';
        return axios.get(url)
    }

    /*VÁROSOK*/

    /*LÉGITÁRSASÁGOK*/

    static getAllAirline() {
        const url = BASE_URL + '/airline';
        return axios.get(url)
    }

    static findAirlineById(id){
        const url = BASE_URL +'/airline/' +id;
        return axios.get(url);
    }


    static saveAirline(airline) {
        const url = BASE_URL +'/airline';
        return axios.post(url, airline)
    }

    static updateAirline(airline) {
        const url = BASE_URL +'/airline';
        return axios.put(url, airline)
    }

    static deleteAirline(id) {
        const url = BASE_URL +'/airline/' +id;
        return axios.delete(url)
    }

    /*LÉGITÁRSASÁGOK*/

}
