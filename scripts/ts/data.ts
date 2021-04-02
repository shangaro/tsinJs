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

    returnAll(settled = false): void {
        const categories = this.axiosInstance.get("/itemCategories");
        const statuses = this.axiosInstance.get("/orderStatuses");
        const userTypes = this.axiosInstance.get("/userTypes");
        const addresses = this.axiosInstance.get("/addressesType");
        this.helper.showWaiting();
        if (!settled) {
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
        } else {
            Promise.allSettled([categories, userTypes, addresses, statuses])
                .then((values) => {
                    const results = values.map((v) => {
                        if (v.status === "fulfilled") {
                            const { data } = v.value;
                            console.log(JSON.stringify(data));
                            return `Fulfilled ${JSON.stringify(data)} `;
                        } else {
                            return `Rejected ${v.reason.message} `;
                        }
                    });
                    const str = "".concat(...results);
                    console.log(`str ${str}`);
                    this.helper.printText(str);
                })
                .catch((err) => this.helper.printText(err))
                .finally(() => {
                    this.helper.hideWaiting();
                });
        }
    }
    // fastest promise gets processed
    race(): void {
        const instance2 = axios.create({ baseURL: "http://localhost:3001" });
        const users2 = instance2.get("/users");
        const users = this.axiosInstance.get("/users");

        Promise.race([users, users2])
            .then(({ data }) => this.helper.printText(JSON.stringify(data)))
            .catch((err) => this.helper.printText(err));
    }
}
