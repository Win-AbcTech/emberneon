import Ember from 'ember';
import socketMixin from 'ember-websockets/mixins/sockets';

export default Ember.Route.extend(socketMixin, {
  socketURL: 'ws://admin.api.no/api/neon/v1/ws',
  keepSocketAlive: false,
   actions: {
    showModal: function(name, appName) {             
      this.render(name, {
        into: 'application',
        outlet: 'modal'
      });  
      $('.modal').show();
     
    },
    removeModal: function() {  
       $('.modal').hide();  
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
