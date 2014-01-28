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

  nextQuestion: function() {
    this.current_question = this.current_session.nextQuestion();
    if ( this.current_question == null ) {
      this.showScreen('wait');
      RecommendationGrabber.getRecommendations( this.current_session.answers, function( outfit ) {
        console.log('Got One!');
        console.log( outfit );
      });
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