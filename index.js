var st = require('st')
  , http = require('http')
  , thermalImage = require('./lib/thermal_imager')

var mount = st({ 
  path: __dirname + '/static', 
  index: 'index.html',
  cache: false
})

function writeThermalImage( styleId, req, res ) {
  thermalImage.getZapposImageUrl(styleId, function(url) {
    thermalImage.thermalizeImage( url, res ).stream('gif', function( err, stdout, stdin ) {
      if ( !err ) {
        res.writeHead(200,{'Content-Type': 'image/gif'})
        stdout.pipe( res )
      } else {
        console.log( err )
      }
    })
  })
}

http.createServer(function(req, res) {

  // Create thermal images
  if ( req.url.match(/^\/thermalImage\/\d+$/) ) {
    var styleId = req.url.split('/')[2]
    return writeThermalImage( styleId, req, res )
  }

  mount(req, res)
}).listen(8001)