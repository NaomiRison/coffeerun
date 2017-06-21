(function(window) {
	
	// body...
	'use strict';
	var App=window.App || {};
	// importing APP and jQuery namespace line above and below
	var $=window.jQuery;
	function CheckList(selector){
		if(!selector){
			throw new Error('no selector provided');
		}
		this.$element=$(selector);
		if(this.$element.length===0){
			throw new Error('not find element with selector '+ selector);
		}

	}
	// check list event on the input tag
	//use same technique of passing fn and calling it in event callback
	// with fn(email)
	CheckList.prototype.addClickHandler = function(fn) {
		// body...
		this.$element.on('click','input',function(event){
			//The target property can be the element that registered for 
			//the event or a descendant of it
			//more on page 241
			var email=event.target.value;
			this.removeRow(email);
			fn(email);
			//CONSOLE, after checking checkbox:
			// Deliver order for qgq@123.com
		}.bind(this));
	};

	// the parameter, coffeorder is data passed that contains a
	//single coffe order like strength size etc...
	CheckList.prototype.addRow= function(coffeeOrder) {
		//Removes existing rows of orders from same email
		this.removeRow(coffeeOrder.emailAddress);
		// pg 234
		var rowElement=new Row(coffeeOrder);
		//add the new row instance $row property to the checklist instance
		//this.$element with append() method
		this.$element.append(rowElement.$row);
	};
	CheckList.prototype.removeRow= function(email) {
		// if person with same passed email makes a second order
		// first order gets  deleted with thr following
		this.$element.find('[value=" '+email + '" ]').closest('[data-coffee-order="checkbox"]').remove();
		//  find () from this.$element returns descendent input element conating passed email
		// removes whole div with the data attribute
	};// from input element retunrs ancestor containg that data attribute

		// want mark up to appear after form submits, create another constructor!
		//accepts coffeOrder which is same data form createorder from Truck.js file
		function Row(coffeeOrder){
			// use jquery to build DOM elements, more on pgs 229-231
			var $div=$('<div></div>',{
				'data-coffee-order':'checkbox',
				'class':'checkbox'
			});
			var $label=$('<label></label>');
			
			var $checkbox=$('<input></input>',{
				type:'checkbox',
				value:coffeeOrder.emailAddress
			});
			var description=coffeeOrder.size + ' ';
			if(coffeeOrder.flavor){
				description+=coffeeOrder.flavor+ ' ';
			}
			description+=coffeeOrder.coffee+ ' , ';
			description+='(' + coffeeOrder.emailAddress + ')';
			description+= '[' + coffeeOrder.strength +' x ]';
			// below append() adds jquery collection or DOM elements
			// as child elements
			//start with inner tag, $checkbox and finish with outer tag, $div
			$label.append($checkbox);
			$label.append(description);
			
			$div.append($label);

			this.$row=$div;

	}
	// exporting checklist to app namespace below
	App.CheckList=CheckList;
	console.log('checklist running');
	window.App=App;

})(window);

/*  CONSOLE


 coffee is mocha
 emailAddress is qgq@123.com
 size is short
 flavor is caramel
 strength is 15

Object {coffee: "mocha", emailAddress: "qgq@123.com", size: "short", flavor: "caramel", strength: "15"}coffee: "mocha"emailAddress: "qgq@123.com"flavor: "caramel"size: "short"strength: "15"__proto__: Object
 adding order for qgq@123.com


coffee is latte
 emailAddress is gdvvd@155.com
size is grande
flavor is almond
strength is 40
Object {coffee: "latte", emailAddress: "gdvvd@155.com", size: "grande", flavor: "almond", strength: "40"}
 adding order for gdvvd@155.com

 myTruck.printOrders();
Truck # ncc-17 has pending orders: 
Object {coffee: "mocha", emailAddress: "qgq@123.com", size: "short", flavor: "caramel", strength: "15"}coffee: "mocha"emailAddress: "qgq@123.com"flavor: "caramel"size: "short"strength: "15"__proto__: Object
 Object {coffee: "latte", emailAddress: "gdvvd@155.com", size: "grande", flavor: "almond", strength: "40"}

*/
