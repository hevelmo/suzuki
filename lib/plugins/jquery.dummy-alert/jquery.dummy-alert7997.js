/*
 * This helper displays a random message periodically.
 *
 * jcn.
 * */

// Base class
var _bubble = function(messages) {
  // Setting base element.
  this.el = $('#dummy-alert');

  // Invoking events.
  this.events();

  //var u = Math.random()*5000;
  var u = 0;

  // Seconds the message is displayed.
  this.displayTimeout = 10000 + u;

  // Show interval (ms).
  this.interval = 25000 + u;

  this.running = false;

  this.messages = messages;

  var $that = this;

  // Checks for remaining messages.
   $that.display_message = function(){
    if ($that.running == false) {
      // Not running, the user closed the box manually.
      return;
    };
    if ($that.messages.length > 0) {
      // Randomly choosing a message.
      var i = Math.floor(Math.random() * $that.messages.length);
      var message = $that.messages[i];
      // Removes message from the list of pending messages.
      $that.messages.splice(i, 1);
      // Shows a message with a class.
      $that.show(message['class'], message);
    };
  }
  window.setInterval(
    function() {
        $that.display_message();
    },
    this.interval
  );


};

// Adds a message to the list.
_bubble.prototype.addMessage = function(message) {
  this.messages.push(message);
};

// Event setup.
_bubble.prototype.events = function() {
  var $that = this;
  if (!this.__events) {
    // Listens for clicks on the close link.
    var a = this.el.find('i.alert-close');
    a.click(
      function() {
        $that.hide();
        $that.daemon(false);
        return false;
      }
    );
    this.__events = true;
  };
};

// Shows a message.
_bubble.prototype.show = function(className, message) {
    var push = message.url.split("#");
    var $alert_url = this.el.find('a.alert-url');
    $alert_url .attr( 'href', message.url )
    if(push[1]){
        $alert_url.attr('onclick', "ga('send', 'event', 'Tooltip', 'Clic', '" + push[1] + "'");
    }else{
        var corte = message.carro.split(" ");
        $alert_url.attr('onclick', "ga('send', 'event', 'Tooltip', 'Clic', 'Instant_" + corte[1] + "_" + message.persona+"'");
    }
    this.el.find('p.alert-message').text(message.text);
    this.el.attr('class', 'show');
    this.el.addClass(className);
    var $that = this;
    window.setTimeout(
        function() {
            $that.hide();
        },
        this.displayTimeout
    );
};

// Hides a message.
_bubble.prototype.hide = function() {
  this.el.attr('class', 'hide');
};

// Sets the daemon status (boolean).
_bubble.prototype.daemon = function(st) {
  this.running = st;


};

