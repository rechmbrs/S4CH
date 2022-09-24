// cookie.js

function getCookieValues() {

  var version = localStorage.getItem("S4CH");
  if (version != "") {
    let kk = 0;
    for (kk = 0; kk < numParm; kk++) {
      parmUser[kk] = JSON.parse(localStorage.getItem(parmNames[kk]));
    }
    return 0;
  } else {
    return 1;
  }
};

// cookie.js