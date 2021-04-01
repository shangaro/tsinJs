import template from 'lodash/template';
import { Car } from './car';

const outputElement = document.getElementById('output');
var car= new Car("subaru");
if (outputElement) {
  const compiled = template(`
    <h1><%- heading %></h1>
    Current date and time: <%- dateTimeString %></br>
    Car Model:<%- carmodel%>
  `.trim());
  outputElement.innerHTML = compiled({
    heading: 'ts-demo-webpack',
    dateTimeString: new Date().toISOString(),
    carmodel:car.printEngine()
  });

car.getItem();
}