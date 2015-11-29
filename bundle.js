(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(context) {
  var currentlyPlayingNodes = [];

  return function(open) {
    var audioNode = context.createGain();

    var fundamental = 40;
    var ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

    var gain = context.createGain();

    // Bandpass
    var bandpass = context.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 10000;

    // Highpass
    var highpass = context.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 7000;

    // Connect the graph
    bandpass.connect(highpass);
    highpass.connect(gain);
    gain.connect(audioNode);

    // Create the oscillators
    var oscs = ratios.map(function(ratio) {
      var osc = context.createOscillator();
      osc.type = "square";
      // Frequency is the fundamental * this oscillator's ratio
      osc.frequency.value = fundamental * ratio;
      osc.connect(bandpass);
      return osc;
    });

    audioNode.start = function(when) {
      currentlyPlayingNodes.forEach(function(node) {
        node.stop(when + 0.1);
      });
      currentlyPlayingNodes = [];
      currentlyPlayingNodes.push(audioNode);
      if (typeof when !== "number") {
        when = context.currentTime;
      }
      oscs.forEach(function(osc) {
        osc.start(when);
        if (open) {
          osc.stop(when + 1.3);
        } else {
          osc.stop(when + 0.3);
        }
      });
      // Define the volume envelope
      gain.gain.setValueAtTime(0.00001, when);
      gain.gain.exponentialRampToValueAtTime(1, when + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.3, when + 0.03);
      if (open) {
        gain.gain.exponentialRampToValueAtTime(0.00001, when + 1.3);
      } else {
        gain.gain.exponentialRampToValueAtTime(0.00001, when + 0.3);
      }
    };
    audioNode.stop = function(when) {
      oscs.forEach(function(osc) {
        osc.stop(when);
      });
    };
    return audioNode;
  };
};

},{}],2:[function(require,module,exports){
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

},{"./index":1}]},{},[2]);
