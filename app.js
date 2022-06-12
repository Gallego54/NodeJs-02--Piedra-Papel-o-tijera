import http from 'http'
import getView from './src/modules/path.js';
import { searchCSS } from './src/modules/serverCSS.js';

const PORT = 8000;


http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    if (req.url === '/result') {
        const HTML = getView(req.url);
        const CSS = searchCSS('./src/public/css/', 'style.css');
       

        const FINAL = insertCSS(HTML, CSS);
        const INDEX = FINAL.search('<body>')+'<body>'.length;


        GetParams(req, (D) => {
            

            const RES = checkPPT(D.get('option')); 

            return res.end(
                FINAL.substring(0, INDEX)+ '<div class="result">' +

                RES.result + ' contra ' + RES.option + '!</div>' 

                +FINAL.substring(INDEX, FINAL.length)
            )
        })


        //return res.end(getView(req.url));
    } else {
        const HTML = getView(req.url);
        const CSS = searchCSS('./src/public/css/', 'style.css');
        const FINAL = insertCSS(HTML, CSS);
  
        const INDEX = FINAL.search('<body>')+'<body>'.length;

        return res.end(FINAL);
    }

}).listen(PORT, _ => {
    
    console.log("PORT: " + PORT)
})

const insertCSS = (HTML, CSS) => {
    const INDEX = HTML.search('<style>')+'<style>'.length;

    if (!CSS) {
        return HTML;
    } 

    return HTML.substring(0, INDEX)+CSS
    +HTML.substring(INDEX, HTML.length);
}

const checkPPT = ( clientAnswer ) => {
    const OPT = [
        "Piedra",
        "Papel",
        "Tijeras"
    ];

    const enemyAnswer = (Math.floor(Math.random()*3)+1);
    const result = optionConsulter(clientAnswer, enemyAnswer);


    return {
        option: OPT[enemyAnswer-1],
        result: result
    }
}


const optionConsulter = function(clientAnswer, enemyAnswer){
    /*
    1: Piedra
    2: Papel
    3: Tijeras
    */ 
  
 

    if (clientAnswer==enemyAnswer) {
        return 'Empataste';
    }


    if (clientAnswer == 1) {
        if (enemyAnswer==2) {
            return 'Perdiste';
        } else {
            return 'Ganaste';
        }
    }

    if (clientAnswer == 2) {
        if (enemyAnswer==3) {
            return 'Perdiste';
        } else {
            return 'Ganaste';
        }
    }

    if (clientAnswer == 3) {
        if (enemyAnswer==1) {
            return 'Perdiste';
        } else {
            return 'Ganaste';
        }
    }

   
}




const GetParams = function(req, callback){
    let Params = ''; 
    req.on('data', D => {
        Params += D;
    })

    
    req.on('end', _ => {
        const FormParams = new URLSearchParams(Params);
        callback(FormParams);
    })
    
}

