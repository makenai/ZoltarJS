$(function() {

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