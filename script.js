$(document).ready(function () {
  // Función para alternar la clase open
  function toggleOpen(className) {
    $(".container").toggleClass("open");
  }

  // Asignar el evento de clic a los elementos con las clases title y close
  $(".title, .close").on("click", function () {
    // Obtener el nombre de la clase del elemento clicado
    var className = $(this).attr("class");
    // Llamar a la función toggleOpen con el nombre de la clase
    toggleOpen(className);
  });

  // Reproducción automática en background con fallback a interacción del usuario.
  var audioEl = document.getElementById('bg-audio');
  if (audioEl) {
    // Asegurar que el audio se repita (atributo loop en HTML debe bastar)
    audioEl.loop = true;

    var playAttempt = function() {
      var p = audioEl.play();
      if (p !== undefined) {
        p.then(function(){
          // reproducción iniciada
        }).catch(function(){
          // Autoplay con sonido bloqueado: esperar a interacción del usuario
          var userPlay = function() {
            audioEl.play().catch(function(){});
          };
          document.addEventListener('click', userPlay, {once: true});
          document.addEventListener('touchstart', userPlay, {once: true});
        });
      }
    };

    // Intento inicial al cargar la página
    playAttempt();

    // En caso de que el audio termine inesperadamente, volver a reproducir
    audioEl.addEventListener('ended', function() {
      audioEl.currentTime = 0;
      audioEl.play().catch(function(){});
    });
  }
});
