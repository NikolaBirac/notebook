export class Contact {
    public id: string;
    public name: string; 
    public number: string;
    public email: string;
    public tags: [];

    constructor(id: string, name: string, number: string, email: string, tags: []) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.email = email;
        this.tags = tags;
    }
}