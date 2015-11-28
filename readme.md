##Usage

`npm install --save hi-hat`

```javascript
var hat = require('hi-hat');

// Initialize AudioContext
var context = new AudioContext();

// Create hat audio node (one time use only)
var hatNode = hat(context);

// Connect to target node
hatNode.connect(context.destination);

// Start
hatNode.start(context.currentTime);
```
