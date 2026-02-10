import { JSDOM } from 'jsdom';

let dom = new JSDOM('<h2 class="title">Hello world</h2>');
let document = dom.window.document;

const heading = document.querySelector('.title');
heading.textContent = 'Hello there!';
heading.classList.add('welcome');

console.log(heading.outerHTML);
// <h2 class="title welcome">Hello there!</h2>

const HTML = `
<html>
  <body>
    <button onclick="const e = document.createElement('div'); e.id = 'myid'; this.parentNode.appendChild(e);">Click me</button>
  </body>
</html>
`;

dom = new JSDOM(HTML, {
    runScripts: 'dangerously',
    resources: 'usable'
});

document = dom.window.document;
const button = document.querySelector('button');

console.log('Element before click:', document.querySelector('#myid'));
button.click();
console.log('Element after click:', document.querySelector('#myid'));