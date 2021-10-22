export class chatUser {
    id?: number;
    username: string;
    email: string;
    password: string;

    constructor(data: any) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;

        // կամ հետևյալ ձև
        // Object.assign(this, data);
    }
};
