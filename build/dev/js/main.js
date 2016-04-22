$(function(){

  // Mensaje de alerta
  //  alert('Alerta');

  // Desplazamiento del scroll animado
  $('nav a').bind('click', function(){
    $('html, body').stop().animate({
      // Al usar una barra fixed por defecto coloca la marca debajo del menú
      // Se le añade un offset para que no se solape
      scrollTop: $($(this).attr('href')).offset().top - 50
    }, 1000, 'easeInOutQuart');
    event.preventDefault();
  });

  // La sección activa sólo se marca cuando el menú solapa el encabezado
  // Al igual que antes hay que añadir un offet a Scrollspy
  // Hay que añadir un poco más de offset que el anterior para que al pulsar cambie bien de sección
  $('body').scrollspy({
    target: '#menu-links',
    offset: 55
  });

});
