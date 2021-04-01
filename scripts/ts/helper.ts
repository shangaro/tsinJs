export class Helper {
    showWaiting(): void {
        const loader = document.getElementById("loading");
        loader?.classList.remove("hidden");
    }
    hideWaiting(): void {
        const loader = document.getElementById("loading");
        loader?.classList.add("hidden");
    }
    setInterval = (): void => {
        let counter = 0;
        let interval: NodeJS.Timeout;
        const wait = new Promise((resolve) => {
            interval = setInterval(() => {
                const txt = `SetTimeout!! ${++counter}`;
                resolve(txt);
                console.log(`timer is ${txt}`);
                this.printText(txt);
            }, 1500);
        });
        wait.then((text) => console.log(text)).finally(() => {
            clearInterval(interval);
        });
    };
    setTimeout = (): void => {
        const wait = new Promise((resolve) => {
            setTimeout(() => {
                resolve("SetTimeout!!");
            }, 1500);
        });
        wait.then((text) => this.printText(String(text)));
    };

    printText(txt: string): void {
        const el = document.getElementById("print");
        if (el) {
            el.innerText = txt;
        }
    }
}
