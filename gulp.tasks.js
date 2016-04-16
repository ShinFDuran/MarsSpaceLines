// **************  Zona de importación de paquetes
var gulp = require('gulp');
// Plugin que nos permite acceso directo al resto de plugins de Gulp
// Para poder ejecutarse tienen que estar instalados
var $ = require('gulp-load-plugins')({lazy: true});
// Funciones que actúan como helpers
var _ = require('./gulp.helpers');
// Archivo de configuración con variables para ser usadas
var config = require('./gulp.config')();

var browserSync = require('browser-sync');
var reload      = browserSync.reload;


// **************   Inicio de las tareas
// Tarea: Listado de las tareas disponibles
exports.listado = $.taskListing;

// Tarea: Lint de código con JSHint
exports.lintJS = function(){
  _.log('Linteo de código con JSHint');

  gulp.src(config.alljs)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
};

// Tarea: Generar HTML a partir de las plantillas Jade
exports.jade = function(){
  _.log('Generación archivos HTML a partir de Jade');

  gulp.src(config.jade.src)
    .pipe($.jade(config.jade.dev))
    .pipe(gulp.dest('./build/dev/'));
};

// Tarea: Lintear con Bootstrap Lint el html resultante de Jade
exports.bootlint = function(){
  _.log('Lint de archivos HTML a partir del resultado de Jade');

  return gulp.src('./build/dev/')
    .pipe($.bootlint({
        stoponerror: true,
        stoponwarning: true,
        loglevel: 'debug',
        disabledIds: ['W009', 'E007'],
        reportFn: function(file, lint, isError, isWarning, errorLocation) {
            var message = (isError) ? "ERROR! - " : "WARN! - ";
            if (errorLocation) {
                message += file.path + ' (line:' + (errorLocation.line + 1) + ', col:' + (errorLocation.column + 1) + ') [' + lint.id + '] ' + lint.message;
            } else {
                message += file.path + ': ' + lint.id + ' ' + lint.message;
            }
            console.log(message);
        },
        summaryReportFn: function(file, errorCount, warningCount) {
            if (errorCount > 0 || warningCount > 0) {
                console.log("please fix the " + errorCount + " errors and "+ warningCount + " warnings in " + file.path);
            } else {
                console.log("No problems found in "+ file.path);
            }
        }
    }));

};

// Tarea: Generar CSS a partir de archivos Sass
exports.sass = function(){
  _.log('Generación archivos CSS a partir de los archivos Sass');

  gulp.src(config.sass.watch_src)
    // Generamos el archivo CSS
    // .pipe($.sass())
    // Pero de forma que si hay un error, lo mostramos por consola
    .pipe($.sass(config.sass.options).on('error', $.sass.logError))
    .pipe(gulp.dest('./build/dev/css/'));
};

// Tarea: Servidor desarrollo con  nodemon para reinicarse y BrowserSync
exports.server_dev = function(){
  _.log('Servidor de desarrollo');

  return $.nodemon(nodeOptions)
    .on('restart', function(){
      _.log('**** Reiniciando servidor ***');
    })
    .on('start', function(){
      _.log('**** Servidor Inicializado ***');
    })
    .on('crash', function(){
      _.log('**** Ups, tenemos un problema ***');
    })
    .on('exit', function(){
      _.log('**** ¡¡Hasta pronto!! ***');
    });
};

// Tarea: BrowserSync
exports.browser_sync = function () {
  browserSync(config.browserSync);
  gulp.watch(config.jade.src, ['jade-watch']);
  gulp.watch(config.sass.watch_src, ['sass-watch']);
};
