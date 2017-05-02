class SearchHistory {

    searchArray = []

    constructor() {
        var search = window.localStorage.getItem('search')
        this.searchArray = search != undefined && search != null && search != "" ? search.split(',') : []


    }

    setSearchHistory(value) {
        this.del(value);
        this.searchArray.push(value)
        window.localStorage.setItem('search', this.searchArray.join(','))
    }

    getSearchHistory() {
        return this.searchArray.reverse()
    }

    del(value) {
        for (var i = 0; i < this.searchArray.length; i++) {
            if (this.searchArray[i] == value) {
                this.searchArray.splice(i, 1)
            }
        }
        window.localStorage.setItem('search', this.searchArray.join(','))
    }

}


export {SearchHistory}
