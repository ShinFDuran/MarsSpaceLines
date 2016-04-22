// **************  Zona de importación de paquetes
// Imports de Gulp para los streams
// Y Tasks, donde están las funciones de las tareas
var gulp = require('gulp');
var tasks = require('./gulp.tasks');

// Función para recargar el navegador
var reload = require('browser-sync').reload;

// **************   Inicio de la declaración de las tareas
// Tarea por defecto, nos redirecciona al listado de tareas
gulp.task('default', ['help']);

// Tarea: Listado de las tareas disponibles
gulp.task('help', tasks.listado);

// Tarea: Lint de código con JSHint
gulp.task('lint-js', tasks.lintJS);

// Tarea: Generar HTML a partir de las plantillas Jade
gulp.task('jade', tasks.jade);

// Tarea: Lintear con Bootstrap Lint el html resultante de Jade
gulp.task('bootlint', ['jade'], tasks.bootlint);

// Tarea: Generar CSS a partir de archivos Sass
gulp.task('sass', tasks.sass);

// Tarea: Copiar JS
gulp.task('js', tasks.js);

// Tarea: Generar servidor de desarrollo
gulp.task('server-dev', tasks.server_dev);

// Tarea: BrowserSync
gulp.task('browser', ['jade', 'sass', 'js'], tasks.browser_sync);

// Tareas que recargan BrowserSync
gulp.task('jade-watch', ['jade'], reload);
gulp.task('sass-watch', ['sass'], reload);
gulp.task('js-watch', ['js'], reload);

