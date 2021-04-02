import template from "lodash/template";
import { Car } from "./car";
import { Data } from "./data";
const outputElement = document.getElementById("output");
const data = new Data();
const car = new Car("subaru");
if (outputElement) {
    const compiled = template(
        `
    <h1><%- heading %></h1>
    Current date and time: <%- dateTimeString %></br>
    Car Model:<%- carmodel%>
  `.trim()
    );
    outputElement.innerHTML = compiled({
        heading: "ts-demo-webpack",
        dateTimeString: new Date().toISOString(),
        carmodel: car.printEngine(),
    });

    // data.getItem();
    // data.getAddress();
    // helper.setTimeout();
    // data.xhr();
    // data.returnAll(true);
    data.race();
}
