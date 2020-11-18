import axios from 'axios';

export default class Connection {
    constructor(baseURL) {
        this.connection = axios.create({
            baseURL,
        });
    }

    async asyncGet(url) {
        try {
            const response = await this.connection.get(url);

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                data: error.response ? error.response.data.error : error,
            };
        }
    }

    async asyncPost(url, data) {
        try {
            const response = await this.connection.post(url, data);

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                data: error.response ? error.response.data.error : error,
            };
        }
    }

    async asyncPut(url, data) {
        try {
            const response = await this.connection.put(url, data);

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                data: error.response ? error.response.data.error : error,
            };
        }
    }
}
