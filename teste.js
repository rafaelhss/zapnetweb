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
                }
                if(text != "" 
                   && sender != "" 
                   && isNaN(text.slice(-4))
                   && receiver == ""
                  ){
                   receiver =  sp.innerText.trim().replace(/\s/g,'');
                }
            });
            teste += " sender:" + sender + " --->"; 
            Array.from(spans).forEach((sp) => { teste += " [" + sp.innerText + "] "})
            console.log(teste)        
        }
    });