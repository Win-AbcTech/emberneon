import Ember from 'ember';

export default Ember.Controller.extend({
    preData: [],
    getAllAppServersStatus: [],
    actions: {         
        onopen: function(e) {
           console.log('On open called: ' + e.target.url);          
        },
        onmessage: function(e) {
           console.log('On message called: ' + e.target.url);          
           var JSONData = JSON.parse(e.data); 	           
           if(this.preData.length <= 0) {this.preData = JSONData.message.appStatus;}
	   //console.log(JSONData);    
	   //console.log(JSONData.message.appStatus);   
	   if(JSONData.operation === "app_status_new")
           {       
           	this.preData = JSONData.message.appStatus;
           }
           else if(JSONData.operation === "app_status_update")
	   {
		var updateData = JSONData.message.appStatus;
   		for(var i=0;i<this.preData.length;i++){
                       for(var j=0;j<updateData.length;j++){
                           if(this.preData[i].appName===updateData[j].appName){
                               //replace new updates to neondata
                               for(var k=0;k<this.preData[i].appStatusServers.length;k++){
                                  for(var l=0;l<updateData[j].appStatusServers.length;l++){
                                      if(this.preData[i].appStatusServers[k].serverName===updateData[j].appStatusServers[l].serverName){
                                          //here it is.. replace the updated server
                                          this.preData[i].appStatusServers[k]=updateData[j].appStatusServers[l];
                                      }
                                  }
                               }
                           }
                       }
                   }
                
	   } 	   
          
	   for(var x=0;x<this.preData.length;x++){
		    if(typeof this.preData[x].healthStatus === "undefined") {this.preData[x].healthStatus = 'healthy';}
		    if(typeof this.preData[x].colorStatus === "undefined") {this.preData[x].colorStatus = 'green';}             
		    for(var y=0;y<this.preData[x].appStatusServers.length;y++){
		        if(this.preData[x].appStatusServers[y].status==="Still sick"){
		            this.preData[x].healthStatus = 'sick';
			    if(typeof this.preData[x].colorStatus !== "undefined") {this.preData[x].colorStatus = 'yellow';}		            
		        }
		        if((this.preData[x].appStatusServers[y].status==="Still healthy" ||this.preData[x].appStatusServers[y].status==="Back healthy") && this.preData[x].appStatusServers[y].flaky){
		            this.preData[x].healthStatus = 'flaky';   
                            if(typeof this.preData[x].colorStatus !== "undefined") {this.preData[x].colorStatus = 'red';}                         
		        }
		    }                 
               
            }           
 		
             this.set("DataValue", this.preData);
          
        },
        onclose: function(e) {
           console.log('On close called: ' + e.target.url);
          
        },
        onerror: function(e) {
            console.log('On error called: ' + e.target.url);
           
        }
    }
});
