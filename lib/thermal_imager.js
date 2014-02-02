var request = require('request'),
  gm = require('gm')

const API_KEY = 'ea094499f485656d3e06eaf8688b94a8d1b224f8'

module.exports = {

  getZapposImageUrl: function( styleId, callback ) {
    var url = 'http://api.zappos.com/Image?key=' + API_KEY + '&styleId=' + styleId + '&recipe=[%22AMAZON%22]&type=[%22PAIR%22]'
    request({ url: url, json: true }, function (error, response, obj) {
      if (!error && response.statusCode == 200) {
        callback( obj[styleId][0].filename )
      }
    })
  },

  thermalizeImage: function(url, writeStream ) {
    // return gm(request(url), 'img.jpg').resize(180).modulate(100,120).monochrome()
    return gm(request(url), 'img.jpg').resize(180).dither().colorspace('gray').colors(2)
  }

}

