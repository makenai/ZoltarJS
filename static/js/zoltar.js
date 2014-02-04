var Zoltar = function() {

  window.AudioContext =  window.AudioContext || window.webkitAudioContext;
  this.audioContext = new AudioContext();

  this.sounds = new AbbeyLoad( [{
    'blip'     : 'mp3/blip.mp3',
    'meow'     : 'mp3/cutemeow.mp3',
    'printing' : 'mp3/printing.mp3',
    'welcome'  : 'mp3/welcome.mp3'
  }], function (buffers) {
    this.buffers = buffers;
  }.bind(this));

  this.joystick = new RetroJoyStick({ 
    container: document.getElementById('container'),
    position: 'custom'
  });

  this.current_session = null;

}

Zoltar.prototype = {

  playSound: function(name) {
    if ( this.buffers && this.buffers[name] ) {
      source = this.audioContext.createBufferSource();
      source.buffer = this.buffers[name];
      source.connect(this.audioContext.destination);
      source.start(0);
    }
  },

  showScreen: function(name) {
    // TODO - fun transition?
    $('#screen').attr('class', name );
  },

	startGame: function() {
    if ( this.current_session == null ) {
      this.current_session = new Session();
      this.nextQuestion();
      this.playSound('welcome');
      return true;
    }
    return false;
	},

  showReceipt: function() {
    $('#receipt').imagesLoaded(function( instance ) {
      $('#receipt').show();
    });
  },

  printReceipt: function() {
      RecommendationGrabber.getRecommendations( this.current_session.answers, function( outfit ) {
        $('#receipt')
          .html('')
          .append('<img src="img/receiptheader.png">');
        for (var i=0;i<outfit.length;i++) {
          var item = outfit[i];
          $('#receipt').append('SKU# ' + item.sku + "<br>" )
            .append(item.name + "<br>")
            .append('<img class="" src="' + item.image + '"><br><br>');
        }
        $('#receipt').append("Your core value of the day is:<br>")
          .append( RecommendationGrabber.getCoreValue() );
          this.showReceipt();
      }.bind(this));
  },

  nextQuestion: function() {
    this.current_question = this.current_session.nextQuestion();
    if ( this.current_question == null ) {
      this.showScreen('wait');
      this.printReceipt();
    } else {
      // Load question image
      this.showScreen( this.current_question.screen );
    }
  },

	answerQuestion: function( direction ) {
    this.current_session.storeAnswer( this.current_question[ direction ] )
    this.playSound('blip');
    this.nextQuestion();
	},

	// Controls

	pressLeft: function() {
		this.answerQuestion('left');
	},

	pressRight: function() {
		this.answerQuestion('right');
	},

	pressButton: function() {
    this.playSound('meow');
	}

}

var Z = new Zoltar();