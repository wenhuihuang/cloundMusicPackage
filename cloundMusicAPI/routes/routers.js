var express = require('express');
var router = express.Router();
var request = require('request')

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('进入')
    res.json({'code':200})
    //res.render('index', { title: 'Express' });
});

//歌单
router.get('/newAlbumsList/:offset/:limit',function (req,res) {
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

module.exports = router;
