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


  function resizeContainer() {
    $('#container').height( $(window).height() );
  }
  resizeContainer();
  $(window).resize( resizeContainer );

  $('#receipt').draggable({
    axis: 'y',
    drag: function(event,ui) {
      // Fix the position of the close button
      if ( ui.position.top < 0 ) {
        $('#closeReceipt').css('top', Math.abs(ui.position.top) + 2);
      } else {
        $('#closeReceipt').css('top', 2);
      }
    },
    stop: function(event,ui) {
      // Fix up positions so they can't drag off screen
      var windowHeight = $(window).height(),
        receiptHeight = $('#receipt').height();
      // Scrolled too high
      if ( ui.position.top < -(receiptHeight - 100) )
        $('#receipt').animate({ top: -(receiptHeight - 200) }, {
          duration: 300,
          easing: 'easeInOutCirc',
          step: function(n) {
            $('#closeReceipt').css('top', Math.abs(n) + 2);
          }
      });
      // Scrolled too low
      if ( ui.position.top > windowHeight - 100 ) {
        $('#closeReceipt').css('top', 2);
        $('#receipt').animate({ top: windowHeight - 200 }, {
          duration: 300,
          easing: 'easeInOutCirc'
        });
      }
    }
  });

  $(document).click('#closeReceipt', function(e) {
    e.preventDefault();
    $('#receipt').animate({ top: -($('#receipt').height() + 200) }, {
      duration: 600,
      easing: 'easeOutCirc',
      complete: function() {
        $('#receipt').html('').hide();
        Z.reset();
      }
    })
  });

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