var PIANO_KEYS = 88;

var d = {
  "a": "3C",
  "s": "3D",
  "d": "3E",
  "f": "3F",
  "j": "3G",
  "k": "3A",
  "l": "3B",

  "q": "4C",
  "w": "4D",
  "e": "4E",
  "r": "4F",
  "u": "4G",
  "i": "4A",
  "o": "4B",

  "z": "2C",
  "x": "2D",
  "c": "2E",
  "v": "2F",
  "m": "2G",
  ",": "2A",
  ".": "2B"
};

var flag = {};
for (var i in d) {
  flag[i] = true;
}

for (var i in d) {
  $(document).bind("keydown", i, function(evt) {
    var key = evt.data.keys;
    if (flag[key]) {
      flag[key] = false;
      $('#'+d[key]).addClass('pressed');
      play_multi_sound("tone-"+d[key]);
    }
  });
  $(document).bind("keyup", i, function(evt) {
    var key = evt.data.keys;
    flag[key] = true;
    $('#'+d[key]).removeClass('pressed');
  });
}













var channel_max = 32;										// number of channels
audiochannels = new Array();

for (a=0;a<channel_max;a++) {									// prepare the channels
  audiochannels[a] = new Array();
  audiochannels[a]['channel'] = new Audio();						// create a new audio object
  audiochannels[a]['finished'] = -1;							// expected end time for this channel
  audiochannels[a]['keyvalue'] = '';
}

//PLAY SOUND
function play_multi_sound(s) {


  for (a=0;a <audiochannels.length; a++) {
    thistime = new Date();
    if (audiochannels[a]['finished'] < thistime.getTime()) {			// is this channel finished?

      try
      {
        audiochannels[a]['finished'] = thistime.getTime() + document.getElementById(s).duration*1000;
        audiochannels[a]['channel'] = document.getElementById(s);
        audiochannels[a]['channel'].currentTime = 0;
        audiochannels[a]['channel'].volume=1;
        audiochannels[a]['channel'].play();
        audiochannels[a]['keyvalue'] = s;

      }
      catch(v)
      {
      }

      break;
    }
  }
}


function stop_multi_sound(s, sender) {

  for (a=0;a <audiochannels.length; a++) {

    //console.log('chanel keyvalue = '+audiochannels[a]['keyvalue']);

    if (audiochannels[a]['keyvalue'] == s) {			// is this channel finished?

      try
      {
        audiochannels[a]['channel'] = document.getElementById(s);

        //audiochannels[a]['channel'].currentTime =  audiochannels[a]['channel'].duration;
        //audiochannels[a]['keyvalue'] = 'nema';

        if(sender != undefined && sender == 'mouse') {
          setTimeout ("audiochannels[a]['channel'].pause()", 2500 );
          setTimeout ("audiochannels[a]['channel'].currentTime = 0", 2500 );
        }else {
          audiochannels[a]['channel'].volume=0;
          setTimeout ( "audiochannels[a]['channel'].pause()", 500 );
          setTimeout ("audiochannels[a]['channel'].currentTime = 0", 500 );
        }

        //console.log("the key is UP - stop sound " + s + ' = ' + audiochannels[a]['channel'].duration + '== ' + audiochannels[a]['channel'].currentTime);
        //console.log(audiochannels[a]['keyvalue']);
      }
      catch(v)
      {
        //show the error message (alert or log) or hide it when public
        //alert(v.message);
        console.log(v.message);
      }

      break;
    }
  }
}
