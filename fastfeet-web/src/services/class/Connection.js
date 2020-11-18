import axios from 'axios';
import {store} from '../../store/index';

export default class Connection {

    constructor(baseURL){
        this.connection = axios.create({
            baseURL
        });
    }

    verifyToken(){
        if(!this.connection.defaults.headers.common['Authorization']){
            const token = store.getState().auth.token;
            this.connection.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }

    async AsyncGet(url, verifyToken = false){
        
        try {
            if(verifyToken) this.verifyToken(); 

            const response = await this.connection.get(url);
          
            return {
                data: response.data,
                success: true
            };

        } catch (error) {
            return {
                success: false,
                error: error.response.data.error,
            };

        }

    }

    async AsyncPost(url, data, verifyToken = false){
        
        try {
            if(verifyToken) this.verifyToken(); 

            const response = await this.connection.post(url, data);
          
            return {
                data: response.data,
                success: true
            };

        } catch (error) {
            return {
                success: false,
                error: error.response.data.error,
            };

        }

    }

    async AsyncPut(url, data, verifyToken = false){
        
        try {
            if(verifyToken) this.verifyToken(); 

            const response = await this.connection.put(url, data);
          
            return {
                data: response.data,
                success: true
            };

        } catch (error) {
            return {
                success: false,
                error: error.response.data.error,
            };

        }

    }

    async AsyncDelete(url, data, verifyToken = false){
        
        try {
            if(verifyToken) this.verifyToken(); 

            const response = await this.connection.delete(url, data);
          
            return {
                data: response.data,
                success: true
            };

        } catch (error) {
            return {
                success: false,
                error: error.response.data.error,
            };

        }

    }

};