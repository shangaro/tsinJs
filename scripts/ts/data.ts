import axios from "axios";
import { Helper } from "./helper";
export class Data {
    private readonly axiosInstance;
    private readonly helper;
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "http://localhost:3000/",
        });
        this.helper = new Helper();
    }
    public getItem(): void {
        this.axiosInstance
            .get("/orders/3")
            .then(({ data }) => {
                console.log(`data is`, data);
            })
            .catch((err) => console.error(err));
    }
    public getAddress(): void {
        this.helper.showWaiting();
        this.axiosInstance
            .get("/orders/3")
            .then(({ data }) => {
                return this.axiosInstance.get(
                    `/addresses/${data.shippingAddress}`
                );
            })
            .then(({ data }) => {
                console.log("address is a", data.city);
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setTimeout(() => {
                    this.helper.hideWaiting();
                }, 1500);
            });
    }
    xhr(): void {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:3000/users/1");
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = () => reject("Internal Server Error 500");
            xhr.send();
        });
        promise
            .then((result) => this.helper.printText(String(result)))
            .catch((reason) => this.helper.printText(String(reason)));
    }

    returnAll(): void {
        const categories = this.axiosInstance.get("/itemCategories");
        const statuses = this.axiosInstance.get("/orderStatuses");
        const userTypes = this.axiosInstance.get("/userTypes");
        const addresses = this.axiosInstance.get("/addresses");
        this.helper.showWaiting();
        Promise.all([categories, userTypes, addresses, statuses])
            .then(([cat, add, utypes, status]) => {
                console.log(`order status ${cat.data}`);
                this.helper.printText(
                    JSON.stringify(cat.data) +
                        JSON.stringify(status.data) +
                        JSON.stringify(utypes.data) +
                        JSON.stringify(add.data)
                );
            })
            .catch((err) => this.helper.printText(err))
            .finally(() => {
                this.helper.hideWaiting();
            });
    }
}
