import * as qrCode from 'qrcode';


export const createQrcode= async (host:string, msg:string) => {
    
    // let  url =  req.hostname + "/template";
    const opts = {
      errorCorrectionLevel: 'H',
      type: 'terminal',
      quality: 0.95,
      margin: 1,
      color: {
       dark: '#208698',
       light: '#FFF',
      },
     }
    return new Promise<any>((resolve, reject) => {
      qrCode.toDataURL(host, (err: any, qrCodeurl: any) => {
        if (err) {
           return false
        } else {
          let html= `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title> Qrcode </title>
            <script src="https://cdn.tailwindcss.com/3.4.1"></script>
        <style>
    /* Styles CSS ici */
    body {
      background-color: #f0f0f0;
      font-family: Arial, sans-serif;
    }
   
    h1 {
      color: blue;
      padding: 50px;
   
    }
   
    img {
      width: 300px;
      height: auto;
    }
   
   
  </style>
    </head>
    <body>
        ${msg}
        <div class="centrer">
        <div class=" flex items-start flex justify-center items-center h-screen flex-col ">
        <h1 class= "text-3xl"></h1>
        <img src="${qrCodeurl}" />
        <div style='width: 250px; height: 250px'>
        <img src="${qrCodeurl}" />
        
        </div>
      </div>
      </div>
    </body>
    </html>`;
    resolve(qrCodeurl);
     }
    });
    })

    
  }