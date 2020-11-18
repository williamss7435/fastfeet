import Connection from './class/Connection';

class RecipientService extends Connection {

    constructor(){
        super('http://localhost:3333');
    }

    async saveImage(fileList = new FileList()){

        const formData = new FormData();

        for(let i = 0; i < fileList.length; i++){
            formData.append('photo', fileList[i]);
        }
        
        return await this.AsyncPost('photos', formData, true);
    }

};

export default new RecipientService();