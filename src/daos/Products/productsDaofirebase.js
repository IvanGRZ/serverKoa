import firebaseProducts from "../../container/firebaseProducts.js";

class productsDaofirebase extends firebaseProducts {

  constructor() {
    super("Productos");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new productsDaofirebase();
    }
    return this.instance;
  }
}

export default productsDaofirebase;