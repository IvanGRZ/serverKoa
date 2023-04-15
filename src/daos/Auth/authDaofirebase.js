
import firebaseAuth from "../../container/firebaseAuth.js";

class authDaofirebase extends firebaseAuth {

  constructor() {
    super("Usuarios");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new authDaofirebase();
    }
    return this.instance;
  }
}

export default authDaofirebase;