import Ember from 'ember';
import socketMixin from 'ember-websockets/mixins/sockets';

export default Ember.Route.extend(socketMixin, {
  socketURL: 'ws://admin.api.no/api/neon/v1/ws',
  keepSocketAlive: false,
   actions: {
    showModal: function(name, appName, data) {   
      this.controller.set("selectedappName", appName);      
      for(var i =0; i<data.appStatusServers.length;i++)
      {
	var versionArray = data.appStatusServers[i].appVersion.split(" ");	
	data.appStatusServers[i].version = versionArray[0];
	data.appStatusServers[i].branch =  versionArray[1];	 
      }
      console.log(data.appStatusServers);   
      this.controller.set("serverStatusList", data.appStatusServers);       
      this.render(name, {
        into: 'application',
        outlet: 'modal'
      });       
    },
    removeModal: function() {  
      this.controller.set("selectedappName", "");  
      this.controller.set("serverStatusList", "");	   
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
