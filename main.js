var context = new AudioContext();
var hihat = require('./index');
document.getElementById('hat').addEventListener('click', function(e) {
  var hat = hihat(context);
  hat.connect(context.destination);
  hat.start(context.currentTime);
});
