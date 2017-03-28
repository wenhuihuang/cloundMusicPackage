var fs = require('fs')
var utils = {
    createDirByYMD : function () {
        var date = new Date();
        var dir = ''+date.getFullYear()
                    +(('00'+date.getMonth()).substring(date.getMonth().length))
                    +(('00'+date.getDate()).substring(date.getDate().length))
        return dir
    },
    createNameByTime : function () {
        var date = new Date();
        var t = ''+date.getHours()+date.getMinutes()+date.getSeconds();
        return t

    }
}

module.exports = utils