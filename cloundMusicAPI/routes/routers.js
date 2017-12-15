var express = require('express');
var router = express.Router();
var request = require('request')
var fs = require('fs')
var utils = require('../utils/utils')
var crypto = require('../utils/Crypto');
var { createWebAPIRequest } = require('../utils/util')


/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('进入')
    res.json({ 'code': 200 })
    //res.render('index', { title: 'Express' });
});

//歌单（网友精选碟）
router.get('/playlist/list/:offset/:limit', function (req, res) {
    console.log(req.params)
    var params = req.params;

    var category = encodeURIComponent("全部"); //分类
    var order = 'hot'; //排列
    var offset = params.offset != "" && params.offset != null && params.offset != undefined ? params.offset : 0;
    var limit = params.limit != "" && params.limit != null && params.limit != undefined ? params.limit : 50;
    var dataList = [];


    // 歌单（网友精选碟） hot||new http://music.163.com/#/discover/playlist/
    var options = {
        url: 'http://music.163.com/api/playlist/list?cat=' + category + '&order=' + order + '&offset=' + offset + '&&limit=' + limit,
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
router.get('/playlist/detail/:playlist_id', function (req, res) {


    var params = req.params;
    var playlist_id = params.playlist_id;
    var cookie = '';
    const data = {
        id: playlist_id,
        offset: 0,
        total: true,
        limit: 1000,
        n: 1000,
        csrf_token: ''
      }
      createWebAPIRequest(
        'music.163.com',
        '/weapi/v3/playlist/detail',
        'POST',
        data,
        cookie,
        function(music_req)  {
          console.log(music_req)
          // detail = music_req
          res.send(music_req)
          // mergeRes()
        },
       function (err)  {
           console.log('333')
          res.status(502).send('fetch error')
        }
      )


})

//歌曲详情
router.get('/song/detail/:music_id', function (req, res) {
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

// 搜索单曲 http://music.163.com/api/search/get
//搜索单曲(1)，歌手(100)，专辑(10)，歌单(1000)，用户(1002) MV(1004) 歌词(1006) 主播电台(1009) 用户(1002) *(type)*
router.post("/search/get", function (req, res) {
    var params = req.body;
    var s = params.searchWord; //关键词
    var stype = params.stype; //搜索类型
    var offset = params.offset;
    var limit = params.limit;

    var formData = {
        's': s,
        'type': stype,
        'offset': offset,
        'total': true,
        'limit': limit
    };
    console.log(formData)
    //request.post({url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */ })
    request.post({
        url: 'http://music.163.com/api/search/get',
        form: formData
    },
        function (error, response, body) {
            if (error) {
                res.json({
                    code: 500,
                    msg: '出错了！'
                });
            }
            if (!error && response.statusCode == 200) {
                console.log(body)
                var info = JSON.parse(body);
                res.json(info);
            }

        })
})

//手机登录 现在还有使用
router.post('/weapi/login/cellphone', function (req, res) {
    var params = req.body;
    var username = params.username
    var password = params.password


    var formData = {
        username: username,
        password: password
    };
    console.log(formData)
    request.post({
        url: 'https://music.163.com/weapi/login/cellphone',
        formData: formData
    }, function (error, response, body) {
        console.log(response)
        console.log(body)
        // if (!error && response.statusCode == 200) {
        //     console.log(body)
        //     var info = JSON.parse(body);
        //     res.json(info);
        // }
    })

});

/**
 * 获取歌词
 */
router.get('/song/lyric/:music_id', function (req, res) {
    var music_id = req.params.music_id;
    var options = {
        url: "http://music.163.com/api/song/lyric?os=osx&id=" + music_id.trim() + "&lv=-1&kv=-1&tv=-1"
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            //console.log(info)
            res.json(info);

        }
    }

    request(options, callback);
});

/**
 * 获取mp3url(播放)
 */
router.post('/song/getMp3', function (req, res) {
    var params = req.body,
        ids = params.ids; //关键词

        const br = req.query.br || 999000
        const data = {
          ids: ids,
          br: br,
          csrf_token: ''
        }
        const cookie = req.get('Cookie') ? req.get('Cookie') : ''
      
        createWebAPIRequest(
          'music.163.com',
          '/weapi/song/enhance/player/url',
          'POST',
          data,
          cookie,
          music_req => {
            res.setHeader('Content-Type', 'application/json')
            res.send(music_req)
          },
          err => {
            res.status(502).send('fetch error')
          }
        )




});

function encrypted_request(text) {
    text = json.dumps(text)
    secKey = createSecretKey(16)
    encText = aesEncrypt(aesEncrypt(text, nonce), secKey)
    encSecKey = rsaEncrypt(secKey, pubKey, modulus)
    data = { 'params': encText, 'encSecKey': encSecKey }
    return data
}

module.exports = router;



