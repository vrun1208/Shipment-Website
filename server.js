const express = require('express');
const moment = require('moment');
const IP = require('ip');

const app = express();
const port = process.env.PORT || 3000;

//app.use(express.static(__dirname));

// Store visited IP addresses and timestamps
const visitedIPs = new Map();

app.get('/', (req, res, next) => {
  const userIP = IP.address(); // Get the user's IP address
  const currentTime = moment();
  //console.log(userIP);
  if (!visitedIPs.has(userIP)) {
    // The user's IP hasn't visited before
    visitedIPs.set(userIP, currentTime);
    next();
  } else {
    const lastVisitTime = visitedIPs.get(userIP);
    const cooldownDuration = 365 *24 * 60 * 60 * 1000; // 24 hours in milliseconds
    if (currentTime - lastVisitTime >= cooldownDuration) {
      // The cooldown period has expired
      //console.log("not yet set")
      visitedIPs.set(userIP, currentTime);
      next();
    } else {
      // The user is still in the cooldown period, redirect them to an error page
      //console.log("set")
      res.redirect('/a.html')
    }
  }
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
