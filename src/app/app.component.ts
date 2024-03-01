import { Component } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'galleta_de_la_fortuna';
  mainDiv = (<HTMLInputElement>document.getElementById('mainDiv'));
  ngOnInit(): void {
    this.mainDiv = (<HTMLInputElement>document.getElementById('mainDiv'));
    this.mainDiv.style.height = window.screen.height +"px";
    (<HTMLInputElement>document.getElementById('url')).innerHTML = window.location.href
    fetch('https://rxtranx.com/fortuneapi/getFortune',
    {
      method: 'Get',
      headers:
      {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then(res => { (<HTMLInputElement>document.getElementById('mensaje')).innerHTML =  res.mensaje});

    var metas = document.getElementsByTagName("meta");
 
    for(var i=0;i<metas.length;i++){
        if(metas[i].getAttribute("property")=="og:title")
        {
            metas[i].setAttribute("content","Galleta de la fortuna");
        }
        if(metas[i].getAttribute("property")=="og:description")
        {
            metas[i].setAttribute("content","Abre tu galleta de la fortuna del dia gratis");
        }
    }
  }


  public compartir() {
    var file ="";
    var blob :any;
    console.log(this.mainDiv)
    html2canvas(this.mainDiv, {scrollX: -window.scrollX,
      scrollY: -window.scrollY}).then(function(canvas) {
      canvas.toBlob((blobq) => {
        blob = blobq;
        console.log(blob);
      if ("share" in navigator) {
        navigator
          .share({
            // Defino un título para la ventana de compartir
            title:"Abre tu galleta de la suerte del dia",
            text: "Mi gallete de la suerte dice:" + (<HTMLInputElement>document.getElementById('mensaje')).innerHTML + " ..... abre la tuya en: " +  window.location.href,
            files: [
              new File([blob], 'image.png', {
                type: "image/png",
              }),
            ],
    
            // Detecto la URL actual de la página 
            url:
                window.location.href
          })
    
          // Mensaje en Consola cuando se presiona el botón de compartir 
          .then(() => {
            console.log("Contenido Compartido !");
          })
          .catch(console.error);
      } else {
        // Si el navegador no tiene soporte para la API compartir, le enviamos un mensaje al usuario
        alert('Lo siento, este navegador no tiene soporte para recursos compartidos.')
      }
  });
}
  )}
}

