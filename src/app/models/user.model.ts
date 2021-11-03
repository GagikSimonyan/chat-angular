export class User {
    id: number;
    userName: string;
    email: string;
    password: string;

    constructor(data: any) {
        this.id = data.id;
        this.userName = data.userName;
        this.email = data.email;
        this.password = data.password;

        // կամ հետևյալ ձև
        Object.assign(this, data);
    }
}
