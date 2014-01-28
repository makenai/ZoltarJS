var Session = function() {
  this.answers   = [];
  this.shuffleQuestions();
}

Session.available_questions = [
  {
    screen : 'gender',
    left   : 'female',
    right  : 'male'
  },
  {
    screen : 'cost',
    left   : 'expensive',
    right  : 'cheap'
  },
  {
    screen : 'colour',
    left   : 'colourful',
    right  : 'drab'
  },
  {
    screen : 'fanciness',
    left   : 'fancy',
    right  : 'casual'
  },
  {
    screen : 'weather',
    left   : 'warm',
    right  : 'cold'
  }
]

Session.prototype = {

  shuffleQuestions: function() {
    var o = [];
    for (var i=0;i<Session.available_questions.length;i++)
      o.push( Session.available_questions[i] );
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    this.questions = o;
  },

  nextQuestion: function() {
    return this.questions.pop();
  },

  storeAnswer: function(answer) {
    this.answers.push( answer );
  }

}