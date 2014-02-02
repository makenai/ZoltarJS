$(function() {

  setTimeout(function() {
    // Get rid of snow
    Z.showScreen('title');

    // Flicker marquee
    setTimeout(function() { $('#marquee').addClass('on')  }, 100);
    setTimeout(function() { $('#marquee').removeClass('on')  }, 300);
    for (var i=0;i<400;i+=50) {
      setTimeout(function() { $('#marquee').addClass('on')  }, 400 + i);
      i = i + 25;
      setTimeout(function() { $('#marquee').removeClass('on')  }, 400 + i);      
    }
    setTimeout(function() { $('#marquee').addClass('on')  }, 850);
    
  },1000);

  $(document).keydown(function(e) {

    // Any ket gets us past the intro screen
    if ( Z.startGame() == true )
      return;

    switch(e.which) {
      case 37: // left
        Z.pressLeft();
      break;

      case 39: // right
        Z.pressRight();
      break;

      default:
        Z.pressButton();
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  // Joystick controls!
  var joysticked = false;
  Z.joystick.on('change', function(e) {
    if ( this.distance > 40 ) {

      if ( Z.startGame() == true )
        return;

      if ( !joysticked && this.angle > 60 && this.angle < 120 ) {
        Z.pressRight();
        joysticked = true;
        return;
      }

      if ( !joysticked && this.angle < 300 && this.angle > 240 ) {
        Z.pressLeft();
        joysticked = true;
        return;
      }

    } else {
      joysticked = false;
    }
  });


});