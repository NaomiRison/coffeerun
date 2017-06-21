

(function(window) {
	'use strict';
	// body...
	var App=window.App || {};

	function Truck(truckId, datastoreObject){
		this.truckId=truckId;
		this.datastoreObject=datastoreObject;

	}
	Truck.prototype.createOrder = function(order) {
		// body...
		console.log('adding order for '+order.emailAddress);
		// now storing from add method in datastore.js
		this.datastoreObject.add(order.emailAddress,order);
		/*
		notice the brackets when we use createOrder function,
		because passing an object!
		var myTruck=new App.Truck('007', new App.Datastore);
		datastore.js:8 running the Datastore function
      undefined
		myTruck.createOrder({emailAddress:'gge@162.com', coffee:'decafe' });
		truck.js:14 adding gge@162.com
		undefined


		*/
	};
	//customer id is email or the name attrubute in the form
		Truck.prototype.deliverOrder=function(customerId){
			console.log('Deliver order for ' + customerId);
			this.datastoreObject.remove(customerId);
			/*
				console:
				myTruck.deliverOrder('gge@162.com');
			*/
		};

		Truck.prototype.printOrders=function(){
			// syntax, object.keys(obj) returns array of a given objects
			// properties
			var customerArray=Object.keys(this.datastoreObject.getAll());
			
			console.log('Truck # '+ this.truckId+ ' has pending orders: ');
			customerArray.forEach(function(id){

				console.log(this.datastoreObject.get(id));
			 }
			 .bind(this)
			);
		};
   // updating old App.Truck with new Truck
	App.Truck=Truck;
	window.App=App;
})(window);