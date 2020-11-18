import { getInitials } from '../utils/FormatFields';

import Connection from './class/Connection';

class DeliveryPeopleService extends Connection {

    constructor(){
        super('http://localhost:3333');
    }

    async create(data){
        return await this.AsyncPost('deliverypeople', data, true);
    }

    async getAll(){
        const response = await this.AsyncGet('deliverypeople', true);

        if(response.success)
            response.data = this.formatData(response.data);

        return response;
    }

    async getById(id){
        const response = await this.AsyncGet(`deliverypeople/${id}`, true);

        if(response.success){
            response.data = this.formatData(response.data);
            response.data = response.data[0];
        }

        return response;
    }

    async getByQuery(query){
        const response = await this.AsyncGet(`deliverypeople?q=${query}`, true);

        if(response.success)
            response.data = this.formatData(response.data);

        return response;
    }

    async updateById(id, data){
        return await this.AsyncPut(`deliverypeople/${id}`, data, true);
    }

    async deleteById(id){
        return await this.AsyncDelete(`deliverypeople/${id}`, null, true);
    }

    formatData(data){  
        try {
            return data.map(deliveryman => {
                return {
                            ...deliveryman, 
                            initials: getInitials(deliveryman.name).toUpperCase(),
                        };
            });
        } catch (error) {
            return data;
        }
    }

};

export default new DeliveryPeopleService();