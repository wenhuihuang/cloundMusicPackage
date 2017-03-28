var express = require('express');
var router = express.Router();
var request = require('request')
var fs = require('fs')
var utils = require('../utils/utils')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('进入')
    res.json({'code':200})
    //res.render('index', { title: 'Express' });
});

//歌单（网友精选碟）
router.get('/playlist/list/:offset/:limit',function (req,res) {
    console.log(req.params)
    var params = req.params;

    var category = encodeURIComponent("全部"); //分类
    var order = 'hot'; //排列
    var offset = params.offset != "" && params.offset != null && params.offset != undefined ? params.offset : 0;
    var limit =  params.limit != "" && params.limit != null && params.limit != undefined ? params.limit : 50;
    var dataList = [];


    // 歌单（网友精选碟） hot||new http://music.163.com/#/discover/playlist/
    var options = {
        url: 'http://music.163.com/api/playlist/list?cat='+category+'&order='+order+'&offset='+offset+'&&limit='+limit,
        headers: {
            'User-Agent': 'request'
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
           //console.log(info)
            res.json(info);

        }
    }

    request(options, callback);

})

//歌单详情
router.get('/playlist/detail/:playlist_id',function (req,res) {



    var params = req.params;
    var playlist_id = params.playlist_id;


    // 歌单详情
    var options = {
        url: 'http://music.163.com/api/playlist/detail?id='+playlist_id,
        headers: {
            'User-Agent': 'request'
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            //console.log(info)
            //var dir = utils.createDirByYMD();
            var dir = 'temp';
            if(!fs.existsSync('public/images/'+dir)){
                fs.mkdirSync('public/images/'+dir)
            }
            console.log(info.result.coverImgUrl)
          /*  var r = request(info.result.coverImgUrl);
            var filenameArray = info.result.coverImgUrl.split('/');
            var filename = filenameArray[filenameArray.length-1]
            r.on('response',  function (resp) {
               // res.pipe(fs.createWriteStream('public/images/'+dir+'/'+filename));
                resp.pipe(fs.createWriteStream('public/images/'+dir+'/playlist_detail_top_bg.'+filename.split('.')[1]));
                info.tempBg = 'static/images/'+dir+'/playlist_detail_top_bg.'+filename.split('.')[1]
            });*/
            res.json(info);



        }
    }

    request(options, callback);
})

//歌曲详情
router.get('/song/detail/:music_id',function (req,res) {
    var params = req.params;
    var music_id = params.music_id
    var options = {
        url: "http://music.163.com/api/song/detail/?id=" + music_id + "&ids=[" + music_id + "]",
        headers: {
            'User-Agent': 'request'
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            res.json(info);
        }
    }

    request(options, callback);
})


module.exports = router;



