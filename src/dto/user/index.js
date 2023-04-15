class UserDTO{
    constructor(data){
        this.username = data.Email
    }

    build(){
        return this
    }
}

export default UserDTO;