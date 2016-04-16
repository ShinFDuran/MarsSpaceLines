module.exports = function(){
  var src_client = './src/client/';
  var src_server = './src/server/';

  var config = {
    /*** Rutas de archivos ***/
    alljs: [
      './*.js',
      src_server + '*.js'
    ],

    /*** Configuración de jade ***/
    jade: {
      src: [
        src_client + 'views/*.jade'
      ],
      // Por defecto JADE minifica,
      prod:{
      },
      // Con esta opción se ve expandido
      dev: {
        pretty: true
      }
    },

    /*** Configuración de Sass ***/
    sass: {
      src: [
        src_client + 'styles/styles.sass'
      ],
      watch_src: [
        src_client + 'styles/**/*.sass',
        src_client + 'styles/**/*.scss'
      ],
      options: {
        errLogToConsole: true,
        outputStyle: 'expanded'
      }
    },

    /*** Configuración de BrowserSync ***/
    browserSync: {
      server: './build/dev',
      ghostMode: {
        clicks: true,
        location: false,
        forms: true,
        scroll: true
      },
      injectChanges: true,
      logFileChanges: true,
      logLevel: 'debug',
      notify: true,
      reloadDelay: 1000
    }
  };

  return config;
};
