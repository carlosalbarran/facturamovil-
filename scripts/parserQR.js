var parserQR={
    re : "",
    rr : "",
    tt : 0.0,
    id : "",
    valido: false,
    setCadenaQR: function(sCadena){
        var iCon=0;
        var pos=0;
        var posfinal=0;
        var iLargo=0;
        
        if(sCadena[0]=="?"){
            sCadena=sCadena.replace("?","&");
            pos=sCadena.indexOf("&");
            while(iCon<4){
                
                switch(sCadena.substring(pos+1,pos+3)){
                    case "re":
                        iLargo=sCadena.length;
                        sCadena=sCadena.substring(pos+4,iLargo);
                        posfinal=sCadena.indexOf("&");
                        this.re=sCadena.substring(0,posfinal);
                        iCon++;
                        sCadena=sCadena.substring(posfinal,iLargo);
                    
                    break;
                    case "rr":
                    iLargo=sCadena.length;
                        sCadena=sCadena.substring(pos+4,iLargo);
                        posfinal=sCadena.indexOf("&");
                        this.rr=sCadena.substring(0,posfinal);
                        iCon++;
                    
                        sCadena=sCadena.substring(posfinal,iLargo);
                    
                    break;
                    case "tt":
                    iLargo=sCadena.length;
                       sCadena=sCadena.substring(pos+4,iLargo);
                        posfinal=sCadena.indexOf("&");
                        this.tt=parseFloat(sCadena.substring(0,posfinal));
                        iCon++;
                     
                        sCadena=sCadena.substring(posfinal,iLargo);
                     
                    break;
                    case "id":
                    iLargo=sCadena.length;
                       sCadena=sCadena.substring(pos+4,iLargo);
                        
                        this.id=sCadena.substring(0,iLargo);
                        iCon++;                       
                    break;
                    default:
                        iCon=5;
                    break;
                }
                //alert("iCon "+iCon);
            }
            if(iCon==4){
                this.valido=true;
            }else{
                this.valido=false;
            }
      
        }else{
            this.valido=false;
        }
        
    }
    
}








