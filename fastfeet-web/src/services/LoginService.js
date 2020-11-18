import Connection from './class/Connection';

class LoginService extends Connection {

    constructor(){
        super('http://localhost:3333');
    }

    async SignIn(data){
        return await this.AsyncPost('login', data, false);
    }

};

export default new LoginService();