// setup.js

function nonlinear(x, forInv) {
    let y = x;
    if (forInv == true) {
        if (x > 1.0) y = Math.pow(x, 3.0).toFixed(0);
        return y;
    } else {
        if (x > 1.0) y = Math.pow(x, -3.0).toFixed(0);
        return y;
    }
}

function testForStorage() {
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage
    } else {
        // No web storage Support.
    }
}

const parmNames = ["scale", "scaleLo", "scaleHi", "dir", "step", "vol", "length"];
const numParm = parmNames.length;
const parmDef = [0, 0, 0, 0, 1, 0.5, 1.0];
//const parmDef = [2, 3, 4, 5, 6, 0.75, 1.2];
var parmUser = [];
var key;
for (key = 0; key < numParm; key++) {
    parmUser[key] = parmDef[key];
}

var cookieStatus = getCookieValues();// =0 OK  =1 no cookie
// console.log("cstatus " + cookieStatus);

key = 0;
var config = "";
config = config
    + '<hr style="height: 4px"></hr>';

config = config
    + '<div class="tooltip">Scale:&nbsp;'
    + '<img src="icons8-select-name-96-white.png" alt="eye" width="24px" height="24px">&nbsp;'
    + '<select name="scales" id="scales" class="heightText">';

for (var k = 0; k < scaleNames.length; k++) {
    var a = scaleNames[k];
    if (a.includes("A_M")) {
        config = config
            + '<option style="font-size: 12pt;" value="" disabled>&nbsp;</option>';
    }
    var b = a.replaceAll("s", "#");
    var d = b.replaceAll("P", "Pent");
    var e = d.replaceAll("Bl", "Blues");
    config = config
        + '<option value="'
        + e
        + '">'
        + e
        + '</option>';

    // <option style="font-size: 1pt; background-color: #000000;" disabled>&nbsp;</option>
    // <option disabled>──────────</option>
}
config = config
    + '<option style="font-size: 12pt;" value="" disabled>&nbsp;</option>'
    + '<option value="USER" disabled>USER Input</option>'
    + '</select>'
    + '<span class="tooltipText" style="margin-left: -200px; margin-top:-15px;">'
    + 'Scale - Chromatic, standard key, and Pentatonic scales. Default = Chromatic. '
    + 'See note in HELP file on choosing the particular scale.'
    + '</span>'
    + '</div>';

config = config
    + '<br><hr style="height: 4px"></hr>';

key++;
config = config
    + '<div class="tooltip">Scale low note:&nbsp;'
    + '<img src="icons8-select-name-96-white.png" alt="eye" width="24px" height="24px">&nbsp;'
    + '<select name="scaleLo" id="scaleLo" class="heightText">';

for (var k = 1; k < chromScale.length; k++) {
    var a = chromScale[k];
    config = config
        + '<option value="'
        + a
        + '">'
        + a
        + '</option>';
}
config = config
    + '</select>'
    + '<span class="tooltipText" style="margin-left: -200px; margin-top: -40px;">'
    + 'Scale low note - notes lower pitched than this will be ignored.  Default is C3.'
    + '</span>'
    + '</div>';

config = config
    + '<br><hr style="height: 4px"></hr>';

key++;
config = config
    + '<div class="tooltip">Scale high note:&nbsp;'
    + '<img src="icons8-select-name-96-white.png" alt="eye" width="24px" height="24px">&nbsp;'
    + '<select name="scaleHi" id="scaleHi" class="heightText">';

for (var k = chromScale.length - 1; k >= 1; k--) {
    var a = chromScale[k];
    config = config
        + '<option value="'
        + a
        + '">'
        + a
        + '</option>';
}
config = config
    + '</select>'
    + '<span class="tooltipText" style="margin-left: -200px; margin-top: -40px;">'
    + 'Scale high note - notes higher pitched than this will be ignored.  Default = D7.'
    + '</span>'
    + '</div>';

config = config
    + '<br><hr style="height: 4px"></hr>';

key++;
config = config
    + '<div class="tooltip">Scale direction:&nbsp;'
    + '<img src="icons8-select-name-96-white.png" alt="eye" width="24px" height="24px">&nbsp;'
    + '<select name="direction" id="direction" class="heightText">'
    + '<option value="up">Up</option>'
    + '<option value="down">Down</option>'
    + '<option value="upDown">Up/Down</option>'
    + '<option value="downUp">Down/Up</option>'
    + '<option value="random">Random</option>'
    + '</select>'
    + '<span class="tooltipText" style="margin-left: -200px;  margin-top: -40px;">'
    + 'Scale direction - Up, Down, Up / Down, Down / Up, Random.  Default = Up.'
    + '</span>'
    + '</div>';

config = config
    + '<br><hr style="height: 4px"></hr>';

key++;
config = config
    + '<div class="slidecontainer" width="300px">'
    + '<div class="tooltip">Scale step (1-12):&nbsp;'
    + '<input type="range" id="stepIn" name="stepIn" min="1" max="12" step="1" value='
    + parmUser[key]
    + ' class="slider" style="vertical-align: middle;"><span id="slider1" width="20px" class="heightText">'
    + parmUser[key]
    + '</span>'
    + '<span class="tooltipText" style="margin-left: -200px;  margin-top: -20px;">'
    + 'Scale step (1-12) - step = 1. Octave = 12.  Default = 1.'
    + '</span>'
    + '</div>'
    + '</div>';

config = config
    + '<br><hr style="height: 8px"></hr>';

key++;
config = config
    + '<div class="slidecontainer">'
    + '<div class="tooltip">Volume (0.0-1.0):&nbsp;'
    + '<input type="range" id="volumeIn" name="volumeIn" min="0.00" max="1.00" step="0.05" value='
    + parmUser[key]
    + ' class="slider" style="vertical-align: middle;"><span id="slider2" class="heightText">'
    + parmUser[key]
    + '</span>'
    + '<span class="tooltipText"  style="margin-left: -200px;  margin-top: -20px;">'
    + 'Volume level (0.0-1.0) - default = 0.5 step = 0.05'
    + '</span>'
    + '</div>'
    + '</div>';

config = config
    + '<br><hr style="height: 8px"></hr>';

key++;
config = config
    + '<div class="slidecontainer">'
    + '<div class="tooltip">Length (0.0-8.0s):&nbsp;'
    + '<input type="range" id="lengthIn" name="lengthInName" min="0.00" max="2.00" step="0.05" value='
    + parmUser[key]
    + ' class="slider" style="vertical-align: middle;"><span id="slider3" class="heightText">'
    + nonlinear(parmUser[key], true) + '</span>'
    + '<span class="tooltipText" style="margin-left: -200px; margin-top: -60px;">'
    + 'Length (0.0-8.0s) - default = 1.0; step = 0.05 for 0s - 1s and = 1.0 from 1s through 8s.'
    + ' A value of 1s = 60 bpm, 0.5s = 120 bpm, and 0.25s = 240 bpm.'
    + '</span>'
    + '</div>'
    + '</div>';

config = config
    + '<br><hr style="height: 12px"></hr>';

config = config
    + '<div class="tooltip">'
    + '<span class="tooltipText" style="margin-left: -50px; margin-top: -48px;">'
    + 'OK - start'
    + '</span>'
    + '<input class="heightBtn" id="okBtn" type="button" value="OK" onclick="oker()">'
    + '</div>'
    + '<div class="tooltip">'
    + '<span class="tooltipText" style="margin-left: -50px; margin-top: -48px;">'
    + 'LOOP - start looping'
    + '</span>'
    + '<input class="heightBtn" id="loopBtn" type="button" value="LOOP" onclick="looper()">'
    + '</div>'
    + '<div class="tooltip">'
    + '<span class="tooltipText" style="margin-left: -80px; margin-top: -85px;">'
    + 'RESET - User parameters:'
    + ' OK - Previously saved'
    + ' Cancel - Default'
    + '</span>'
    + '<input class="heightBtn" id="resetBtn" type="button" value="RESET" onclick="resetter()">'
    + '</div>'
    + '<div class="tooltip">'
    + '<span class="tooltipText" style="margin-left: -50px; margin-top: -48px;">'
    + 'STOP - execution'
    + '</span>'
    + '<input class="heightBtn" id="stopBtn" type="button" value="STOP" onclick="stopper()">'
    + '</div>'
    + '<div class="tooltip">'
    + '<span class="tooltipText" style="margin-left: -50px; margin-top: -48px;">'
    + 'SAVE - setup'
    + '</span>'
    + '<input class="heightBtn" id="saveBtn" type="button" value="SAVE" onclick="saver()">'
    + '</div>'
    + '<div class="tooltip">'
    + '<span class="tooltipText" style="margin-left: -50px; margin-top: -48px;">'
    + 'HELP - document'
    + '</span>'
    + '<input class="heightBtn" id="helpBtn" type="button" value="HELP" onclick="helper()">'
    + '</div>';

config = config + ' <br>'
    + '<div style="margin-top: 10px;">'
    + '<textarea id="errorPanel" name="errorPanel" readonly disabled visibility="hidden" rows="2" cols="26">'
    + '</textarea>'
    + '</div>';

// console.log(config);
document.getElementById("column3").innerHTML = config;

key = 0;
scales.selectedIndex = parmUser[key];

key++;
scaleLo.selectedIndex = parmUser[key];

key++;
scaleHi.selectedIndex = parmUser[key];

key++;
direction.selectedIndex = parmUser[key];

key++;
stepIn.value = parmUser[key];
slider1.innerHTML = parmUser[key];

key++;
volumeIn.value = parmUser[key];
slider2.innerHTML = parmUser[key];

key++;
lengthIn.value = parmUser[key];
slider3.innerHTML = nonlinear(parmUser[key], true);

// setup.js