(function(window){

	'use strict';

	var App=window.App ||{};
	// when added script tag it created function
	//named jQuery and variable $
	var $=window.jQuery;
	function FormHandler(selector){
		if(!selector){
			throw new Error('No selector provided');
		}
	
		// this.$FormElement is the instance variable
		this.$formElement=$(selector);
					// length property tells you how many elements match the object
					// returtned from the $( )
					// in this case the sselector from form
					// if there is no match or ===0 throw error
		if(this.$formElement.length===0){
						throw new Error('could not find element with selector:' + selector);
					}
					// fn is a call back function. its the createorder method from
					// truck.js file
	}
		// pg 219-20 once u submit form it becomes a single object
		// need to pass that to other non accessible instances like Truck and Checklist
		// passing function argument, fn which is called 
		
		//inside event handler on
		FormHandler.prototype.addSubmitHandler = function(fn) {
			// pg 240 explains fn
			//doing this because we want formhandler to be flexible and 
			// use methods from other js files and pass
			//single parameter, data in main js file while submitting form
			console.log('setting submit handler');
			this.$formElement.on('submit',function(event){
				event.preventDefault();
				
				var data={};
				$(this).serializeArray().forEach(function(item){
					// this is a ref to the formElement
					// item is current value or index in each mini object
					// in data, array of mini objects object
					//array is at end of entire program
					data[item.name]=item.value;
					console.log(item.name + " is "+ item.value);
					/*
						running the Datastore function
						var fh=new App.FormHandler(' [data-coffee-order="form"]'); 
						undefined
						fh.addSubmitHandler();
						formhandler.js:22 setting submit handler
						undefined
						formhandler.js:29 coffee is green tea
						formhandler.js:29 email is hdhd@123.com
						formhandler.js:29 size is Tall
						formhandler.js:29 flavor is almond
						formhandler.js:29 strength is 30

					*/
					
				});

				console.log(data);
				//fn is your callback function.It could any method like createorder or addRow
				// fn is your call back and is passed single coffee order
				// called data
				fn(data);
			});
		};
	

	App.FormHandler=FormHandler;
	window.App=App;
})(window);

/*
﻿
datastore.js:8 running the Datastore function
var fh=new App.FormHandler(' [data-coffee-order="form"]'); 
undefined
fh.addSubmitHandler();
formhandler.js:22 setting submit handler
undefined
formhandler.js:26 
(5) [Object, Object, Object, Object, Object]
0
:
Object
name
:
"coffee"
value
:
"green tea"
__proto__
:
Object
1
:
Object
name
:
"email"
value
:
"hdhd@123.com"
__proto__
:
Object
2
:
Object
name
:
"size"
value
:
"on"
__proto__
:
Object
3
:
Object
name
:
"flavor"
value
:
"almond"
__proto__
:
Object
4
:
Object
name
:
"strength"
value
:
"6"
__proto__
:
Object
length
:
5
*/
