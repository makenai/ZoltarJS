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

});