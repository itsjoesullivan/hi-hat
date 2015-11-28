var context = new AudioContext();
var hihat = require('./index');
document.getElementById('closed-hat').addEventListener('click', function(e) {
  var hat = hihat(context);
  hat.connect(context.destination);
  hat.start(context.currentTime);
});

document.getElementById('open-hat').addEventListener('click', function(e) {
  var hat = hihat(context, true);
  hat.connect(context.destination);
  hat.start(context.currentTime);
});
