class Cookie{
    /**
     *
     * @param key
     * @param value
     * @param expires 天
     */
    setCookie(key,value,day){
        let day = day || 7;
        const date = new Date();
        date.setTime(date.getTime()+day*24*60*60*1000);
        document.cookie=key + "="+ encodeURIComponent(value) + ";expires=" + date.toGMTString();
    }

    getCookie(name){
        let arr = document.cookie.split(';')
        for(var i =0;i < arr.length;i++){
            var itemArray = arr[i].split('=');
            if(itemArray[0] == name){
                return itemArray[1];
            }
        }
        return ""
    }

    deleteCookie(name){
        this.setCookie(name,1,-1);
    }

}

export {Cookie}