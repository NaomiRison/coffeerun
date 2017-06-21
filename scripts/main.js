
(function (window) {
	// body...

	var FORM_SELECTOR='[data-coffee-order="form"]';
	var CHECKLIST_SELECTOR='[data-coffee-order="checkbox"]';
	//assigning namespaces to variables
	var App=window.App;
	var Truck=App.Truck;
	var Datastore=App.Datastore;
	var FormHandler=App.FormHandler;
	var CheckList=App.CheckList;

	var myTruck= new Truck( 'ncc-17',new Datastore());
	//to intercact with protected  instance of Truck write
	// code below and export it to global namespace

	/*
      myTruck.printOrders();
        truck.js:44 Truck # ncc-17 has pending orders: 

	*/
	window.myTruck=myTruck;
	


    var myCheckList= new CheckList(CHECKLIST_SELECTOR);
	var myForm = new FormHandler(FORM_SELECTOR);
	
	// myForm.addSubmitHandler(myTruck.createOrder.bind(myTruck));
	
	// 	want createorder from truck.js to be called on but cannot pass a reference to
	// 	myForm.addSubmitHandler(); instead use bind reference above
	// 	 if we didnt do this the value of " this"  in createorder
	// 	  is changed and not be truck instance therfore we have errors
	// console.log(myForm);

	//passing a bound version of deliverOrder from truck.js to checkLsit.addClickHandler
	myCheckList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

	
	
	myForm.addSubmitHandler(function(data){
		// createorder(data) is the fn(data) and same below it
		myTruck.createOrder(data);
		myCheckList.addRow(data);
	});



})(window);

