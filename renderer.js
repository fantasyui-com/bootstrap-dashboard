// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const pkg = require(__dirname + '/package.json')
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const request = require('request');

const civilized = require('civilized');

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
      <div class="card-header">{{header}} &middot; defcon-{{defcon}} - {{defconMessage}}</div>
      <div class="card-body">
        <h4 class="card-title">{{title}}</h4>
        <p class="card-text">{{text}} </p>
        <p class="card-text">{{error}}</p>
      </div>
    </div>
  `,

  props: ['defcon','header','title','text', 'error'],

  data: function () {
    return {


      defconMessages: [
        /* DEFCON 0 */ 'One Moment...',
        /* DEFCON 1 */ 'End of the world',
        /* DEFCON 2 */ 'Um, problems',
        /* DEFCON 3 */ 'Something is off',
        /* DEFCON 4 */ 'No Problemo',
        /* DEFCON 5 */ 'All is well',
      ],
      cardClasses: [
        /* DEFCON 0 */ 'card fadeds mb-3',
        /* DEFCON 1 */ 'card text-white bg-secondary mb-3',
        /* DEFCON 2 */ 'card text-white bg-danger mb-3',
        /* DEFCON 3 */ 'card text-dark bg-warning mb-3',
        /* DEFCON 4 */ 'card text-white bg-success mb-3',
        /* DEFCON 5 */ 'card text-white bg-primary mb-3',
      ]
    }

  },

  computed: {

   defconMessage: function(){
     return this.defconMessages[this.defcon];
   },
   cardClass: function(){
     return this.cardClasses[this.defcon];
   }

 }

});

var workspace = new Vue({
  el: '#workspace',
  data: {
    cards: [


    ]
  },

  created: function(){

    let story = civilized(__dirname + '/configure.md').filter(i=>i.name==='monitor-server');

    story.forEach((item,index)=>{

      let thing = { id:this.cards.length, header:`${item.data.url}`, title: item.data.title, text:item.data.input, defcon: 0};
      let exec = function(){
        request(item.data.url, function (error, response, body) {

          if(body && body.match(new RegExp(item.data.string))){
          thing.defcon = 4;
          thing.error = ""; // clears error message


          }else if(error.code === 'ENOTFOUND'){
            thing.defcon = 1;
            thing.error = `Error, get address info returned error NOT FOUND, is ${item.data.url} hosted anywhere?`;

          }else if(error){
            thing.defcon = 2;
            thing.error = error.message;

          }else{
            thing.defcon = 2;
            thing.error = error.message;
          }
        });
      }
      thing.intervalId = setInterval(exec, item.data.interval*1000)
      exec();

      this.cards.push( thing );


    });


  }

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
