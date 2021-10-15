export class User {
    id?: number;
    userName: string;
    email: string;

    constructor(data: any) {
        this.id = data.id;
        this.userName = data.userName;
        this.email = data.email;

        // կամ հետևյալ ձև
        // Object.assign(this, data);
    }
};