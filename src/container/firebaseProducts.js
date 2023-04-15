import {db} from '../utils/firebase.js'

class firebaseProducts {

    constructor(collectionName) {
        this.collection = db.collection(collectionName);
    }

    async save(obj){
        try{
            const snapshot = await this.collection.get();
            const data = [];

            snapshot.forEach(doc => {
                data.push(doc.data())
            })

            const id = data.length;                        
            obj.map((item,index)=> {
                item.id = id + (index + 1)
            });
            
            const result = await this.collection.doc(obj[0].id.toString()).set(obj[0]);   
            
            return result;
        }
        catch(error){
            console.log(error)
        }
    }

    async getByID(id){
        try{
            const userRef = this.collection.doc(id.toString());
            const data = await userRef.get();

            return data._fieldsProto
        }
        catch(error){
            console.log(error)
        }
    }


    async getAll(){
        try{
            const snapshot = await this.collection.get();
            const data = [];

            snapshot.forEach(doc => {
                data.push(doc.data())
            })
            
            return data
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteById(id){
        try{
            const deleteProduct = await this.collection.doc(id.toString()).delete();
            return deleteProduct;
        }
        catch(error){
            console.log(error)
        }
    }

    async deleteAll(){
        try{
            const deleteProduct = await this.collection.doc().delete();
            return deleteProduct;
        }
        catch(error){
            console.log(error)
        }

    }

    async updateProduct(obj){
        try{
            const id = obj.id;
            const updateData = await this.collection.doc(id.toString()).update(obj);
            return updateData
        }
        catch(error){
            console.log(error)
        }
    }

}

export default firebaseProducts;