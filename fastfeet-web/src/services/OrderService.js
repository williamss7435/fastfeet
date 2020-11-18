import {parseISO, format} from 'date-fns';
import {getInitials} from '../utils/FormatFields';

import Connection from './class/Connection';

class OrderService extends Connection {

    constructor(){
        super('http://localhost:3333');
    }

    async create(data){
        return await this.AsyncPost('orders', data, true);
    }

    async deleteById(id){
        return await this.AsyncDelete(`orders/${id}`, null, true);
    }

    async updateById(id, data){
        return await this.AsyncPut(`orders/${id}`, data);
    }

    async getAll(){
        const response = await this.AsyncGet('orders', true);
        
        if(response.success)
            response.data = this.formatData(response.data);

        return response;
    }
    
    async getByQuery(query){
        const response = await this.AsyncGet(`orders?q=${query}`, true);
        
        if(response.success)
            response.data = this.formatData(response.data);

        return response;
    }

    async getById(id){
        const response = await this.AsyncGet(`orders/${id}`, true);
        
        if(response.success)
            response.data = response.data[0];

        return response;
    }

    async getAllProblems(){
        const response = await this.AsyncGet('problems/orders', true);

        if(response.success){
            response.data = this.formatProblem(response.data);
        }

        return response;
    }

    formatProblem(data){
        try {
            return data.map(problem => {
                return {
                    ...problem,
                    descriptionFormatted: problem.description.length < 50 ? problem.description : problem.description.substring(0, 50)+" ...",
                }
            })
        } catch (error) {
            return data;
        }
    }

    formatData(data) {
        try {
            return data.map(order => {
                return {
                    id: order.id,
                    product: order.product,
                    signature_url: order.signature ? order.signature.url : null,
                    start_date: (order.start_date ? format(parseISO(order.start_date), "d'/'MM'/'yyyy") : null),
                    end_date: (order.end_date ? format(parseISO(order.end_date), "d'/'MM'/'yyyy") : null),
                    status: this.getOrderStatus(order),
                    deliveryman: {
                        id: order.deliveryman.id,
                        name: order.deliveryman.name,
                        initials: getInitials(order.deliveryman.name).toUpperCase(),
                        photo: order.deliveryman.photo 
                    },
                    recipient:{
                        id: order.recipient.id,
                        name: order.recipient.name,
                        city: order.recipient.city,
                        state: order.recipient.state,
                        street: order.recipient.street,
                        number: order.recipient.number,
                        zip_code: order.recipient.zip_code,
                    } 
                }
            });
        } catch (error) {
            return data;
        }
    }

    getOrderStatus(order) {
        if(order.canceled_at){
            return {name: "canceled", message: "CANCELADO"};
        }else if (order.end_date){
            return {name: "delivered", message: "ENTREGUE"};
        }else if (order.start_date){
            return {name: "withdrawn", message: "RETIRADA"};
        }else {
            return {name: "pending", message: "PENDENTE"};
        }
    }

};

export default new OrderService();