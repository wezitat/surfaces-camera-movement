define(function(require, exports, module) {
	var Engine  = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var VideoSurface    = require('famous/surfaces/VideoSurface');
  var EventHandler = require('famous/core/EventHandler');



  var mainContext = Engine.createContext();

  function createSurface1() {
    var surface1 = new Surface({
      size: [100, 100],
      content: 'surface1',
      properties: {
        color: 'black',
        textAlign: 'center',
        backgroundColor: '#FA5C4F'
      }
    });

    var stateModifier = new StateModifier({
      transform: Transform.translate(250, 100, 0)
    });

    mainContext.add(stateModifier).add(surface1);
  }

  function createWit1() {
    var wit1 = new Surface({
      size: [20, 20],
      content: 'wit1',
      properties: {
        fontSize:'12px',
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#8a0000'
      }
    });
    var witMod = new StateModifier({
      transform: Transform.translate(25, 25, 0)
    });

    mainContext.add(witMod).add(wit1);

    witMod.setTransform(
      Transform.translate(150, 150, 0),
      { duration : 1000, curve: 'easeInOut' }
      );






  }


  function createWit2() {
    var wit2 = new Surface({
      size: [20, 20],
      content: 'wit2',
      properties: {
        fontSize:'12px',
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#8a008a'
      }
    });
    var witMod = new StateModifier({
      transform: Transform.translate(25, 225, 0)
    });

    mainContext.add(witMod).add(wit2);

    witMod.setTransform(
      Transform.translate(150, 350, 0),
      { duration : 1000, curve: 'easeInOut' }
      );

  }


  var mySurface = new Surface({
    size: [200, 200],
    content: 'mySurface<br><small>click to run wit</small>',
    properties: {
      color: 'white',
      fontSize:'22px',
      textAlign: 'center',
      backgroundColor: '#4A006A',
      borderRadius: '22px'
    }
  })
  var opacityMod = new StateModifier({
    opacity:.25
  })
  



  mainContext.add(opacityMod).add(mySurface);
  createSurface1();
  mySurface.on('click', function() {
    createWit1();
    mySurface.setContent('mySurface');
  });



  var videoSurface = window.videoSurface =new VideoSurface({
    autoplay: 'true',
    size: [400, 400],
    //classes: ['controls'],
    properties:{
      backgroundColor: '#FA5C4F',
      borderWidth:'10px',
      borderColor:'#ff0000'
    }
  });

  var errorCallback = function(e) {
    console.log('Rejected yep yep!', e);
  };
  

  navigator.getUserMedia  = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

    //var video = document.querySelector('video');

    if (navigator.getUserMedia) {
      navigator.getUserMedia({audio: false, video: true}, function(stream) {
    //        video.src = window.URL.createObjectURL(stream);
    videoSurface.setContent(window.URL.createObjectURL(stream));
    //videoSurface.setContent("www.yahoo.com");
  }, errorCallback);
    } else {
           videoSurface.setContent('failure');  // fallback.
         }

         var stateModifier = new StateModifier({
          transform: Transform.translate(100, 0, 0)
        });

         mainContext.add(stateModifier).add(videoSurface);


       });