var st = require('st')
  , http = require('http')

var mount = st({ 
  path: __dirname + '/static', 
  index: 'index.html',
  cache: false
})

http.createServer(function(req, res) {
  var stHandled = mount(req, res);
  if (stHandled)
    return
  else
    res.end('this is not a static file')
}).listen(8000)