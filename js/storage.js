


function createTrack(name, from, to) {
    var key = Date.now();
    window.localStorage.setItem(key.toString(), name);
    window.localStorage.setItem(key + '_from', from);
    window.localStorage.setItem(key + '_to', to);
    window.localStorage.setItem(key + '_result', '');
        
    var i;
    for (i = Number(from); i <= Number(to); i++) {
        window.localStorage.setItem(key + '__' + i, '');                
    }
    
    return key.toString();
}


function removeTrack(key) {
    window.localStorage.removeItem(key);
}


function getTrackName(key) {
    return window.localStorage.getItem(key);
}


function getTrackFrom(key) {
    key = key + '_from'
    return window.localStorage.getItem(key);
}


function getTrackTo(key) {
    key = key + '_to'
    return window.localStorage.getItem(key);
}

function getDate() {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    day = day > 9 ? day : '0' + day;
    month = month > 9 ? month : '0' + month;
    
    return day + '.' + month;
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

function getTracks() {            
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


function setSelectedTrack(track) {
    window.sessionStorage.selectedTrack = track;
}


function getSelectedTrack() {
    return window.sessionStorage.selectedTrack;
}


function setLane(track, lane, value) {
    var key = track + '__' + lane;
    window.localStorage.setItem(key, value);
}

function getLane(track, lane) {
    var key = track + '__' + lane;
    return window.localStorage.getItem(key);
}

function setTrackResult(track, result) {
    var key = track + '_result';
    var value = getDateAndTime() + ' ' + result;
    window.localStorage.setItem(key, value);
}

function getTrackResult(track) {
    var key = track + '_result';
    return window.localStorage.getItem(key);
}

function colorToName(color) {
    var result;
    
    switch (color) {
        case 'list-group-item-info': 
            result = 'Birdie';
            break;
        case 'list-group-item-success': 
            result = 'Par';
            break;
        case 'list-group-item-warning': 
            result = 'Bogey';
            break;
        case 'list-group-item-danger': 
            result = 'Double';
            break;
        default:
            result = color;
            break;
    }
    
    return result;
}

function colorToNumber(color) {
    var result;
    
    switch (color) {
        case 'birdie': 
            result = -1;
            break;
        case 'par': 
            result = 0;
            break;
        case 'bogey': 
            result = 1;
            break;
        case 'double': 
            result = 2;
            break;
        case 'triple': 
            result = 3;
            break;
        default:
            result = 999;
            break;
    }
    
    return result;
}

function formatResult(result) {
    if (result == 0) {
        return 'par';
    } else {
        return result > 0 ? '+' + result : result;
    }
}

function createResult(track) {
    var result = 0;
    var from = getTrackFrom(track);
    var to = getTrackTo(track);
    var i;
    
    for (i = Number(from); i <= Number(to); i++) {
      var color = getLane(track, i);
      var number = colorToNumber(color);
      result += number;
    }
    
    var name = getTrackName(track);
    var timestamp = Date.now();
    var key = timestamp.toString() + '___result';
    var value = getDate() + ' ' + name + ': ' + formatResult(result);
    
    window.localStorage.setItem(key, value);
    
    return value;
}

function getResults() {            
    var res = [];
    
    var i;
    for (i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        
        if (key.search('___result') != -1) {
            var value = window.localStorage.getItem(key);
            res.push(value);
        }
    }
    
    return res;
}
