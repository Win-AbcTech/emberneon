import Ember from 'ember';
import socketMixin from 'ember-websockets/mixins/sockets';

export default Ember.Route.extend(socketMixin, {
  socketURL: 'ws://admin.api.no/api/neon/v1/ws',
  keepSocketAlive: true,
   actions: {
    showModal: function(name, appName, data, color) {   
      this.controller.set("selectedappName", appName);   
      this.controller.set("selectedappColor", color);      
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
