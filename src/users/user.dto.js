export default class UserDto {
    id;
    roles;
    //ip;

    constructor(model) {
        this.id = model._id;
        this.roles = model.roles;
        //this.ip = model.ip;
    }
}