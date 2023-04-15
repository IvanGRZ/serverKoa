import {db} from '../utils/firebase.js'

class firebaseAuth {

    constructor(collectionName) {
        this.collection = db.collection(collectionName);
    }

    async signUp(email, password, direccion, edad, foto, nombre, numero){
        try{
            const userRef = this.collection;
            const exist = await userRef.where('Email', '==', email).get();
    
            if (exist.empty) {
                const snapshot = await this.collection.get();
                const users = [];
                let newUser;

                snapshot.forEach(doc => { users.push(doc.data())})
                let id = Math.max(...users.map(item => item.id))

                newUser = {
                    Direccion: direccion,
                    Edad: edad,
                    Email: email,
                    Foto: foto,
                    Nombre: nombre,
                    NumeroTel: numero,
                    Password: password,
                    id: id == '-Infinity' ? 0 : id + 1
                }

                await this.collection.doc(id == '-Infinity' ? "0" : (id + 1).toString()).set(newUser);
                return newUser;
            }
            else{
                return true;
            }            
        }
        catch(error){
            console.log(error)
        }

    }

    async login(email, password){

        const userRef = this.collection;
        const snapshot = await userRef.where('Email', '==', email).get();
        let user;

        try {
            if (snapshot.empty) {
                return false;
            }
            else {
                snapshot.forEach(doc => { user = doc.data()});
                if(user.Password == password){
                    return user;
                }
                else{
                    return false
                }
            }

        } catch (error) {
            console.log(error)
        }        
    }

    async findById(id){
        try{
            const userRef = this.collection.doc(id.toString());
            const doc = await userRef.get();
            let user;

            if (!doc.exists) {
              console.log('No such document!');
            } else {
              user = doc.data()
              return user;
            }
    
        }
        catch(error){
            console.log(error)
        }
    }

}

export default firebaseAuth;