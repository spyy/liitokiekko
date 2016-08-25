



function createTrack(name, from, to) {
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
