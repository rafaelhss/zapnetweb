    var vertices = [];
    
    var connections = [];

    var createConnection = function(sender, receiver) {
        if(sender != "" && receiver != "" 
           && sender != "forwarded" && receiver != "forwarded"
           && sender != "encaminhada" && receiver != "encaminhada"
          ){
                vertices.push(sender);
                vertices.push(receiver);
                var connection = {};
                connection.receiver = receiver;
                connection.sender = sender;
                connections.push(connection);
        }
    }
    

    Array.from(document.getElementsByClassName("message-in")).forEach((el) => {
        var divs = el.getElementsByTagName("div").length;
        var teste = "len:" + divs;
        var spans = el.getElementsByTagName("span");
        teste += " spans:" + spans.length;
        var sender = "";
        var receiver = "";
        if(divs >= 15 && spans.length >= 10) {
            Array.from(spans).forEach((sp, index) => { 
                var text = sp.innerText.trim().replace(/\s/g,''); 
                if(text != "" 
                   && sender == "" 
                   && isNaN(text.slice(-4))){
                   sender =  sp.innerText.trim().replace(/\s/g,'');
                   var next = spans[index+2];
                   if(next != null){
                      var nextTxt = next.innerText.trim().replace(/\s/g,'');
                      if(nextTxt != ""){
                          if(isNaN(nextTxt.slice(-4))){
                              receiver = nextTxt;
                          } else {
                               var next = spans[index+3];
                               if(next != null){
                                   receiver = next.innerText.trim().replace(/\s/g,'');
                               }
                          }
                      }
                   } 
                }
            });
            createConnection(sender,receiver);
            
        }
    });
Array.from(document.getElementsByClassName("message-out")).forEach((el) => {
        var divs = el.getElementsByTagName("div").length;
        var teste = "len:" + divs;
        var spans = el.getElementsByTagName("span");
        teste += " spans:" + spans.length;
        var sender = "You";
        var receiver = "";
        if(divs >= 15 && spans.length >= 9) {
            Array.from(spans).forEach((sp, index) => { 
                var text = sp.innerText.trim().replace(/\s/g,''); 
                if(text != "" 
                   && receiver == "" 
                   && isNaN(text.slice(-4))){
                   receiver =  sp.innerText.trim().replace(/\s/g,'');
                }
            });
        createConnection(sender, receiver);      
        }
    });


    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    var finalVertices = vertices.filter(onlyUnique);
    var network = "*Vertices " + finalVertices.length + "\n";

    finalVertices.forEach(function(item, index){
        network += (index+1) + " \"" + item + "\"\n"
    })

    network += "*Arcs \n";

    connections.forEach(function(conn){
        network += (finalVertices.findIndex(k => k==conn.sender)+1) + " " 
                   + (finalVertices.findIndex(k => k==conn.receiver)+1) + " " 
                   + "1\n"
    })
        
    console.log(network)


// usage example:
//var a = ['a', 1, 'a', 2, '1'];
//var unique = a.filter( onlyUnique ); // returns ['a', 1, 2, '1']

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

download("samba", "samba.txt", "txt");
