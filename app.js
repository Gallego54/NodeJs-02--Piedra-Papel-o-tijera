import http from 'http'
import getView from './src/modules/path.js';

const PORT = 8000;


http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    if (req.url === '/result') {
        const HTML = getView(req.url);
        const INDEX = HTML.search('body')+6;

        GetParams(req, (D) => {
            

            const RES = checkPPT(D.get('option')) ? 'Ganaste!':'Perdiste!'; 

            return res.end(
                HTML.substring(0, INDEX)+

                RES

                +HTML.substring(INDEX, HTML.length)
            )
        })


        //return res.end(getView(req.url));
    } else {
        return res.end(getView(req.url));
    }

}).listen(PORT, _ => {
    
    console.log("PORT: " + PORT)
})


const checkPPT = ( clientAnswer ) => {
    //console.log((Math.floor(Math.random()*3)+1))
    return clientAnswer==(Math.floor(Math.random()*3)+1)
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

