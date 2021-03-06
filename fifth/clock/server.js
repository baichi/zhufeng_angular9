var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');
http.createServer(function (req,res) {
    var urlObj =  url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        res.setHeader('Content-Type','text/html;charset=utf8');
        fs.createReadStream('./index.html').pipe(res);
    }else if(pathname=='/clock'){//判断是否是获取时间的接口
        res.end(new Date().toLocaleString());//buffer或者string
    }else{
       fs.exists('.'+pathname,function (exists) {
           if(exists){
               res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf8');
               fs.createReadStream('.'+pathname).pipe(res);
           }else{
                res.statusCode = 404;
                res.end('');
           }
       })
    }
}).listen(3000,'localhost');

