(function(window){

	'use strict';
	//ref.  to global namespace if it exists to var app.
	// so is App.ANYTHING TO START THE PROGRAM
	var App=window.App ||{};
	function Datastore(){
		console.log('running the Datastore function');
		this.data={};
	} //method for i teracting with data below called add:

	Datastore.prototype.add= function(key,value) {
		// body...
		this.data[key]=value;
		// data[email]=johndoe@112.com
			//data[coffee]=mocha

		/*

		var ds=new App.Datastore();
		datastore.js:6 running the Datastore function
			undefined
			ds.add('email','sbbc@bhhc.com');
		undefined
		ds.add('order','expresso');
		undefined
		ds.data;
	Object {email: "sbbc@bhhc.com", order: "expresso"}


		*/
	};
	Datastore.prototype.get=function(key){
		// pass in email to get the beverage or value
		 return this.data[key];

	};
	Datastore.prototype.getAll=function(){

		 return this.data;
	};
	Datastore.prototype.remove=function(key){
		delete this.data[key];
		/*	
		var ds=new App.Datastore();
		datastore.js:8 running the Datastore function
		undefined
		ds.add('mrddg@88.com','tea');
		undefined
		ds.add('sbbc@bhhc.com', 'coffee');
		undefined
		ds.getAll();
		Object {mrddg@88.com: "tea", sbbc@bhhc.com: "coffee"}

		ds.remove('mrddg@88.com');
		undefined
		ds.getAll();
			Object {sbbc@bhhc.com: "coffee"}


		*/
	};

	App.Datastore=Datastore;
	window.App=App;

})(window);