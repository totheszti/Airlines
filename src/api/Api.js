import axios from "axios";

const BASE_URL = 'http://localhost:8080';

export default class Api {

    /*VÁROSOK*/

    //összes város lekérése
    static getAllCity() {
        const url = BASE_URL + '/city';
        return axios.get(url)
    }

    static findCityById(id){
        const url = BASE_URL +'/city/' +id;
        return axios.get(url);
    }

    static saveCity(airline) {
        debugger
        const url = BASE_URL +'/city';
        return axios.post(url, airline)
    }

    static updateCity(params) {
        debugger
        const url = BASE_URL +'/city/' + params.id;
        return axios.put(url, params)
    }

    static deleteCity(id) {
        const url = BASE_URL +'/city/' +id;
        return axios.delete(url)
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
        debugger
        const url = BASE_URL +'/airline';
        return axios.post(url, airline)
    }

    static updateAirline(params) {
        debugger
        const url = BASE_URL +'/airline/' + params.id;
        return axios.put(url, params)
    }

    static deleteAirline(id) {
        const url = BASE_URL +'/airline/' +id;
        return axios.delete(url)
    }

    /*LÉGITÁRSASÁGOK*/

}
