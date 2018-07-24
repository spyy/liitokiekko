



function createTrack2(name, to) {
    var track = {
      name: name,
      routeCount: Number(to),
      routes:[],
      record: 999,
      tempScore: 0,
      latest: {
        createdAt: Date.now(),
        score: 999
      },
      createdAt: Date.now()
    };

    var i;
    for (i = 0; i < Number(to); i++) {
        track.routes.push('empty');
    }

    window.localStorage.setItem(name, JSON.stringify(track));
}


function getTrack(key) {
    var track = window.localStorage.getItem(key);

    return JSON.parse(window.localStorage.getItem(track));
}

function createTrack(name, from, to) {
    createTrack2(name, to);

    var key = Date.now();
    window.localStorage.setItem(key.toString(), name);
    window.localStorage.setItem(key + '_from', from);
    window.localStorage.setItem(key + '_to', to);
    window.localStorage.setItem(key + '_result', '');

    var i;
    for (i = Number(from); i <= Number(to); i++) {
        window.localStorage.setItem(key + '__' + i, 'empty');
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

        if (key.search(/_/) === -1 && Number.isInteger(Number(key))) {
            res.push(key);
        }
    }

    return res.reverse();
}


function setSelectedTrack(track) {
    window.sessionStorage.selectedTrack = track;
}


function getSelectedTrack() {
    return window.sessionStorage.selectedTrack;
}

function setRoute(key, route, value) {
    var track = getTrack(key);

    track.routes[Number(route) - 1] = value;
    window.localStorage.setItem(track.name, JSON.stringify(track));
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

function setTrackLatestResult(track, result) {
    setTrackLatestScore(track, result);

    var key = track + '_latest';
    var value = getDate() + ' ' + formatResult(result);
    window.localStorage.setItem(key, value);
}

function setTrackLatestScore(key, score) {
    var track = getTrack(key);

    track.latest.createdAt = Date.now();
    track.latest.score = score;

    if (score < track.record) {
        track.record = score;
    }

    window.localStorage.setItem(track.name, JSON.stringify(track));
}

function getTrackLatestResult(track) {
    var key = track + '_latest';
    return window.localStorage.getItem(key);
}

function colorToNumber(color) {
    var result;

    switch (color) {
        case 'eagle':
            result = -2;
            break;
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
        case 'quadruple':
            result = 4;
            break;
        case 'quintuple':
            result = 5;
            break;
        default:
            result = 999;
            break;
    }

    return result;
}

function colorToText(color) {
    var result;

    switch (color) {
        case 'eagle':
            result = '-2';
            break;
        case 'birdie':
            result = '-1';
            break;
        case 'par':
            result = 'Par';
            break;
        case 'bogey':
            result = '+1';
            break;
        case 'double':
            result = '+2';
            break;
        case 'triple':
            result = '+3';
            break;
        case 'quadruple':
            result = '+4';
            break;
        case 'quintuple':
            result = '+5';
            break;
        default:
            result = color;
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

function createResult2(key) {
    var track = getTrack(key);
    var result = {
        name: track.name,
        routes: track.routes,
        score: 0,
        createdAt: Date.now()
    };

    track.routes.forEach(function(color) {
      var number = colorToNumber(color);
      result.score += number;
    });


    var timestamp = Date.now();
    var key = timestamp.toString() + '_result';

    window.localStorage.setItem(key, JSON.stringify(result));
}

function createResult(track) {
    createResult2(track);

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

    return result;
}

function getResults() {
    var res = [];

    var i;
    for (i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);

        if (key.search(/___result/) !== -1) {
            var value = window.localStorage.getItem(key);
            res.push(value);
        }
    }

    return res.reverse();
}
