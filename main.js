var HiHat = require('./index');

var context = new AudioContext();

var hihat = HiHat(context);

document.getElementById('closed-hat').addEventListener('click', function(e) {
  var closedHatNode = hihat();
  closedHatNode.connect(context.destination);
  closedHatNode.start(context.currentTime);
});

document.getElementById('open-hat').addEventListener('click', function(e) {
  var openHatNode = hihat(true);
  openHatNode.connect(context.destination);
  openHatNode.start(context.currentTime);
});
