



function createArea(name, from, to) {
    var key = Date.now();
    window.localStorage.setItem(key.toString(), name);
    window.localStorage.setItem(key + '_from', from);
    window.localStorage.setItem(key + '_to', to);
        
    var i;
    for (i = Number(from); i <= Number(to); i++) {
        window.localStorage.setItem(key + '__' + i, '');                
    }
    
    return key.toString();
}


function removeArea(area) {
    window.localStorage.removeItem(area);
}


function getAreaName(key) {
    return window.localStorage.getItem(key);
}


function getAreaFrom(area) {
    var key = area + '_from'
    return window.localStorage.getItem(key);
}


function getAreaTo(area) {
    var key = area + '_to'
    return window.localStorage.getItem(key);
}


function getWeekDay() {
    const WEEK_DAYS = ['SU', 'MA', 'TI', 'KE', 'TO', 'PE', 'LA'];
    var d = new Date();
    
    return WEEK_DAYS[d.getDay()];
}

function getDateAndTime() {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var hours = d.getHours();
    var minutes = d.getMinutes();
    minutes = minutes > 9 ? minutes : '0' + minutes;
    
    return day + '.' + month + ' ' + hours + ':' + minutes;
}


function getAreas() {            
    var res = [];
    
    var i;
    for (i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        
        if (key.search('_') === -1) {
            res.push(key);
        }
    }
    
    return res;
}


function getDoors(area) {            
    var res = [];
    
    var i;
    for (i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        
        if (key.search('_') === -1) {
            res.push(key);
        }
    }
    
    return res;
}


function setSelectedArea(area) {
    window.sessionStorage.selectedArea = area;
}


function getSelectedArea() {
    return window.sessionStorage.selectedArea;
}


function setDoor(area, door, color) {
    var key = area + '__' + door;
    var value = color + ' ' + getDateAndTime() + ' ' + getWeekDay();
    
    window.localStorage.setItem(key, value);
}


function getDoor(area, door) {
    var key = area + '__' + door;
    return window.localStorage.getItem(key);
}
