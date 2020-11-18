import Connection from './class/Connection';
import {format, parseISO} from 'date-fns';
import {store} from '../store';

class FastFeetAPI {
    constructor() {
        this.connection = new Connection('http://10.0.2.2:3333');
    }

    async getDeliverymanById(id) {
        const response = await this.connection.asyncGet(`deliverypeople/${id}`);
        if (response.success) {
            if (response.data.length > 0) {
                response.data = response.data[0];
                response.data.initialsName = this.getInitials(
                    response.data.name,
                ).toUpperCase();
                response.data.created_at_formatted = this.formatDate(
                    response.data.created_at,
                );
                if (response.data.photo) {
                    response.data.photo_url = `http://10.0.2.2:3333/files/${response.data.photo.path}`;
                }
            } else {
                response.data = null;
            }
        }
        return response;
    }

    async getOrdersByDeliverymanId(delivired, id) {
        const response = await this.connection.asyncGet(
            `/deliveryman/orders/${id}?delivered=${delivired}`,
        );

        if (response.success) {
            response.data = this.formatOrders(response.data);
        }

        return response;
    }

    async confirmOrder(file, orderId) {
        const formData = new FormData();

        formData.append('file', {
            uri: file.uri,
            name: 'signature_photo.jpg',
            type: 'image/jpg',
        });
        const signatureResponse = await this.connection.asyncPost(
            'signatures',
            formData,
        );

        if (signatureResponse.success) {
            return await this.connection.asyncPut(
                `deliveryman/orders/${orderId}/finish`,
                {signature_id: signatureResponse.data.id, end_date: new Date()},
            );
        } else {
            return {success: false, error: 'Erro ao cadastrar a foto'};
        }
    }

    async addOrderProblem(id, description) {
        return await this.connection.asyncPost(
            `deliveryman/orders/${id}/problems`,
            {description},
        );
    }

    async getAllOrderProblemByOrderId(id) {
        const response = await this.connection.asyncGet(
            `deliveryman/problems/order/${id}`,
        );

        if (response.success) {
            response.data = response.data.map((problem) => ({
                ...problem,
                start_date_formatted: this.formatDate(problem.created_at),
            }));
        }

        return response;
    }

    formatOrders(data) {
        try {
            return data.map((order) => ({
                ...order,
                start_date_formatted: order.start_date
                    ? this.formatDate(order.start_date)
                    : '--/--/----',
                end_date_formatted: order.end_date
                    ? this.formatDate(order.end_date)
                    : '--/--/----',
                created_at_formatted: order.created_at
                    ? this.formatDate(order.created_at)
                    : '--/--/----',
                status: this.getStatus(order),
            }));
        } catch (err) {
            return data;
        }
    }

    formatDate(date) {
        return format(parseISO(date), 'dd/MM/yyyy');
    }

    getStatus(order) {
        if (order.canceled_at) {
            return {name: 'Cancelado', id: -1};
        } else if (order.end_date) {
            return {name: 'Entregue', id: 3};
        } else if (order.start_date) {
            return {name: 'Retirado', id: 2};
        } else {
            return {name: 'Pendente', id: 1};
        }
    }

    getInitials(data) {
        try {
            const splitData = data.split(' ');

            return splitData.length > 1
                ? splitData[0].charAt(0) + splitData[1].charAt(0)
                : data.charAt(0) + data.charAt(1);
        } catch (error) {
            return data;
        }
    }
}

export default new FastFeetAPI();
