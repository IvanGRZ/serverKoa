import messageDaoFirebase from './Message/messageDaoFirebase.js'
import productsDaofirebase from "./Products/productsDaofirebase.js";
import authDaofirebase from "./Auth/authDaofirebase.js"

let ProductDAO = null;
let CartDAO = null;
let AuthDao = null;
let OrderDAO = null;

const type = process.env.PERS || "fs";


switch (type) {
  case "archive":
    ProductDAO = productsDaoArchive.getInstance();
    CartDAO = cartDaoArchive.getInstance();
    break;

  case "fs":
    //messageDao = messageDaoFirebase.getInstance();
    ProductDAO = productsDaofirebase.getInstance();
    AuthDao = authDaofirebase.getInstance();
    break;
}

export { ProductDAO, CartDAO, AuthDao, OrderDAO };
