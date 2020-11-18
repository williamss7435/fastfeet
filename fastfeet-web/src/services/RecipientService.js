import Connection from './class/Connection';

class RecipientService extends Connection {

    constructor(){
        super('http://localhost:3333');
    }

    async getAll(){
        return await this.AsyncGet('recipients', true);
    }

    async getByQuery(query){
        return await this.AsyncGet(`recipients?q=${query}`, true);
    }

    async getById(id){
        const response = await this.AsyncGet(`recipients/${id}`, true);

        if(response.success)
            response.data = response.data[0];

        return response;
    }

    async create(data){
        return await this.AsyncPost('recipients', data, true);
    }

    async updateById(id, data){
        return await this.AsyncPut(`recipients/${id}`, data, true);
    }

};

export default new RecipientService();