export class Task {
    public title: string;
    public description: string;
    public person: string;
    public date: any;

    constructor(title: string, description: string, person: string, date: any){
        this.title = title;
        this.description = description;
        this.person = person;
        this.date = date;
    }
}