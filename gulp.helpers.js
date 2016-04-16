// **************  Zona de importación de paquetes
// Plugin que nos permite acceso directo al resto de plugins de Gulp
// Para poder ejecutarse tienen que estar instalados
var $ = require('gulp-load-plugins')({lazy: true});
// Archivo de configuración con variables para ser usadas
var config = require('./gulp.config')();


// **************   Inicio de las funciones que actúan como helpers
// Función que muestra por consola la tarea que estamos realizando
exports.log = function(msg){
  if (typeof(msg) === 'object'){
    for (var item in msg) {
      if (msg.hasOwnProperty(item)){
        $.util.log($.util.colors.bgBlue.white(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.bgBlue.white(msg));
  }
};
