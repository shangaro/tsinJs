import axios, { AxiosInstance } from "axios";
export class Car {
    private readonly instance: AxiosInstance;
    constructor(public model: string) {
        this.instance = axios.create({ baseURL: "http://localhost:3000" });
    }
    /* this prints engine
     WatchIgnore*/
    public printEngine(): string {
        const str = `This car ${this.model} has v8 engine version 1.2`;
        console.log(str);
        return str;
    }
}
