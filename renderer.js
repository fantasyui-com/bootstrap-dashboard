// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const pkg = require(__dirname + '/package.json')
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const faker = require('faker');

class MyEmitter extends EventEmitter {}
const ee = new MyEmitter();




/* * *
  BODY DROP INIT
* * */

document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault();
}
document.body.ondrop = (ev) => {
  ev.preventDefault()
  const file = ev.dataTransfer.files[0].path;
  ee.emit('document-drop', {file})
}

ee.on('background-color', (data) => {
  $("body").css({background: data.color})
});

ee.on('foreground-color', (data) => {
  $("body").css({color: data.color})
});



/* * *
  VUE COMPONENT EXAMPLE
* * */

var appTitle = new Vue({
  el: '#app-title',
  data: pkg
});




/* * *
  JQUERY EXAMPLE
* * */

$(function(){
  $('title').text(pkg.productName||pkg.name);
});




/* * *
  INTERNAL API EXAMPLE
* * */

ee.on('document-drop', (data) => {
  alert('Dropped ' + data.file);
});


Vue.component('card', {

  template: `
    <div v-bind:class="cardClass">
      <div class="card-header">{{header}}</div>
      <div class="card-body">
        <h4 class="card-title">{{title}}</h4>
        <p class="card-text">{{text}}</p>
      </div>
    </div>
  `,

  props: ['level','header','title','text'],

  data: function () {
    return {
      cardClass: 'card text-white bg-warning mb-3',
      cardClasses: [
        'card text-white bg-success mb-3',
        'card text-white bg-info mb-3',
        'card text-white bg-warning mb-3',
        'card text-white bg-danger mb-3',
      ]
    }
  },

  created: function(){

    setInterval(()=>{
      this.level++;
      if(this.level > (this.cardClasses.length-1)) this.level = 0;
      this.cardClass = this.cardClasses[this.level];
    },500);

  }
});

var workspace = new Vue({
  el: '#workspace',
  data: {
    cards: [
      { id:0,  header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 0},
      { id:1,  header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 1},
      { id:2,  header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 2},
      { id:3,  header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 3},
      { id:4,  header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 0},
      { id:5,  header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 1},
      { id:6,  header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 2},
      { id:7,  header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 3},
      { id:8,  header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 0},
      { id:9,  header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 1},
      { id:10, header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 2},
      { id:11, header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 3},
      { id:12, header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 0},
      { id:13, header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 1},
      { id:14, header:faker.company.companyName(), title: faker.hacker.ingverb() + ' ' + faker.hacker.noun(), text:'Last Run: '+faker.date.past(), level: 2},
    ]
  },

})


/* * *
  INTERNAL API EXAMPLE
* * */

$(function(){


  $( "#emitter-example-form" ).submit(function( event ) {
    const eventName = $( "#event-name-select" ).val();
    const color = $( "#example-color-input" ).val();
    console.log((eventName, {color}))
    ee.emit(eventName, {color})
    event.preventDefault();
  });


});
