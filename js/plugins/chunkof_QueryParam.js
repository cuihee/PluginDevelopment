// author chunkof (http://chunkof.net/)
// ライセンス：MIT
// 自由に改変・使用ください。
(function() {

  //--------------------
  var _DataManager_setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function(){
    // start
    var startMapId = getQueryVariable('map');
    if (startMapId) {
      $dataSystem.startMapId = Number(startMapId);
    }

    _DataManager_setupNewGame.call(this);
  };


  //--------------------
  var getQueryVariable = function(variable){
    var query = window.location.search.substring(1);
    var params = query.split("&");
    for (var i=0; i<params.length; ++i){
      var pair = params[i].split("=");
      var key = decodeURIComponent(pair[0]);
      if (key != variable){
        continue;
      }
      var value = decodeURIComponent(pair[1]);
      return escapeJsHTML(value);
    }
    return undefined;
  };

  //--------------------
  // escape (to preventing xss)
  var escapeJsHTML = function (str) {
    var escaped =
      str
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\//g, '\\/')
        .replace(/</g, '\\x3c')
        .replace(/>/g, '\\x3e')
        .replace(/(0x0D)/g, '\r')
        .replace(/(0x0A)/g, '\n')
        .replace(/&/g, '&amp;');

    return escaped;
  };


})();