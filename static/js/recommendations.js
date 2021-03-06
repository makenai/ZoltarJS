var RecommendationGrabber = {
  
  BASE_URL: 'http://api.zappos.com/Search?key=ea094499f485656d3e06eaf8688b94a8d1b224f8&filters=',
  
  FILTERS: {
    female    : '"txAttrFacet_Gender":["Women"]',
    male      : '"txAttrFacet_Gender":["Men"]',
    cold      : '"personalityFacet":["Winter","Snow"]',
    warm      : '"personalityFacet":["Summer","Beach"]',
    fancy     : '"personalityFacet":["Dress","Fashion","Elegant","Designer","Sophisticated","Luxury","Fashionable"]',
    casual    : '"personalityFacet":["Casual","Athleisure","Comfort","Novelty","Street","Librarian"]',
    colourful : '"colorFacet":["Multi","Red","Pink","Orange","Yellow","Animal+Print"]',
    drab      : '"colorFacet":["Black","Brown","Gray","Navy","Beige","Tan","Taupe","Olive","Khaki"]',
    expensive : '"priceFacet":["$200.00+and+Over"]',
    cheap     : '"priceFacet":["$100.00+and+Under"]'
  },
  
  CATEGORIES: [
    '"categoryFacet":["Tops"]',
    '"categoryFacet":["Bottoms"]',
    '"productType":["footwear"]'
  ],

  CORE_VALUES: [
    "Deliver WOW Through Service",
    "Embrace and Drive Change",
    "Create Fun and A Little Weirdness",
    "Be Adventurous, Creative, and Open-Minded",
    "Pursue Growth and Learning",
    "Build Open and Honest Relationships With Communication",
    "Build a Positive Team and Family Spirit",
    "Do More With Less",
    "Be Passionate and Determined",
    "Be Humble",
    "Your Face"
  ],

  getCoreValue: function() {
    return this.CORE_VALUES[ Math.floor(Math.random()*this.CORE_VALUES.length) ];
  },

  getRecommendations: function(answers, callback) {
    var outfit = [],
      filters = [],
      requests = [];
    // Get answer filters
    for (var i=0;i<answers.length;i++)
      filters.push( this.FILTERS[ answers[i] ] );
    // For each category...
    for (var i=0;i<this.CATEGORIES.length;i++) {
      var category = this.CATEGORIES[ i ],
        url = this.BASE_URL + '{' + filters.concat([ category ]).join(',') + '}';

      (function(i) {
        var req = $.getJSON( url + '&callback=?', function( data ) {
          var item = data.results[ Math.floor(Math.random()*data.results.length) ];
          if (!item)
            return;
          outfit[i] = {
            thumb : item.thumbnailImageUrl,
            image : '/thermalImage/' + item.styleId,
            price : item.price,
            sku   : item.productId,
            name  : item.productName
          };
        });
        requests.push( req );
      })(i);

    }

    $.when.apply($, requests).done(function() {
      callback( outfit );
    });
  }
}