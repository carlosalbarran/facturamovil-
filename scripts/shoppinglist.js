

// Wait for PhoneGap to load
document.addEventListener("deviceready", init, false);

var myApp = new kendo.mobile.Application(document.body, { transition: "slide", layout: "mobile-tabstrip", platform: 'blackberry'});

myApp._queryBase = "https://www.googleapis.com/shopping/search/v1/public/products?key=[YOUR_API_KEY]&country=US&startIndex=1&maxResults=1&promotions.enabled=false&orderby=relevance&q=";
myApp.db = null;
myApp.activeListView = null;
myApp.completedListView = null;
myApp.scanResult = null;
myApp.RFCResults= null;
//var INVALIDO = null;
//var VALIDO = null ;

// PhoneGap is ready
function init() { 

    // Hide "Add Scanned Item" button
    $("#addScanButton").show();
    
    myApp.activeListView = $("#activeItemList").kendoMobileListView({
                template: $("#list-template").html(),
                style: 'inset'
            }).data("kendoMobileListView");
 
    myApp.completedListView = $("#completedItemList").kendoMobileListView({
                template: $("#completed-list-template").html(),
                style: 'inset'
            }).data("kendoMobileListView");
    

    myApp.openDb();
    myApp.createTable();
    navigator.splashscreen.hide();
}

function markComplete(e){
    var data = e.button.data();
    myApp.markComplete(data.id);
}

function addItem() {
    var item = document.getElementById("txtItem");
    if (item.value && item.value.length > 0)
    {
        console.log("Adding item: " + item.value);
	    myApp.addItem(item.value);
    }
	item.value = "";
}


/*
function addItemRFC() {

 var item = document.getElementById("txtItemRFC");
 $.get("http://http://172.17.200.32//sat/procesarfc.php?rfc=" + item.value, function(html)
      {
  
  // $( ".result" ).html( data );
  //alert( "Load was performed." );
});

}


*/


function getDataSAT(){
      var rfcResult = myApp.rfcResult;
      var that = this;  
     // var response;
      var searchTermElem = document.getElementById('txtItemRFC');
      console.log(searchTermElem.value);
    $("#espera").html("Conectandose a ALSEA espera...");
    
    $.ajax({
            url: "http://187.141.97.227/sat/procesardatosrfc.php?rfc="+searchTermElem.value,
            data: { rfc:searchTermElem.value},
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            
            success: function (datos) {
                
             if(datos.estadoConsultado=='MX'){  
                 $('#rfcLista').append('<ul id=\"rfcLista\" data-role=\"listview\"></ul>').trigger("create");       
                 $("#rfcLista").append ("<li data-icon=favorites>Lo sentimos, no fue posible encontrar más detalles del RFC. Para ello debes de haber facturado alguna vez en Alsea.com.</li>");
                 $("#espera").html("");
                     
             }
             else
             { 
                 
                 
                $('#rfcLista').append('<ul id=\"rfcLista\" data-role=\"listview\"></ul>').trigger("create");       
                $("#rfcLista").append ("<li data-icon=favorites>RFC:"+datos.rfcConsultado+"</li>");
                      $("#rfcLista").append ("<li data-icon=favorites>Nombre:"+datos.razonsocialConsultado+"</li>");
                      $("#rfcLista").append ("<li data-icon=favorites>Calle:"+datos.calleConsultado+"</li>");
                      $("#rfcLista").append ("<li data-icon=favorites>#:"+datos.numextConsultado+"</li>");
                      $("#rfcLista").append ("<li data-icon=favorites>Int:"+datos.numintConsultado+"</li>");
                      $("#rfcLista").append ("<li data-icon=favorites>Colonia:"+datos.coloniaConsultado+"</li>");
                      $("#rfcLista").append ("<li data-icon=favorites>Localidad:"+datos.municipioConsultado+"</li>");
                      $("#rfcLista").append ("<li data-icon=favorites>Municipio:"+datos.ciudadConsultado+"</li>");
                      $("#rfcLista").append ("<li data-icon=favorites>Estado:"+datos.estadoConsultado+"</li>");
                    $("#rfcLista").append ("<li data-icon=favorites>C.P.:"+datos.cpConsultado+"</li>");
                    $("#rfcLista").append ("<li data-icon=favorites>E-mail:"+datos.mailConsultado+"</li>");
                   
                $("#rfcLista").trigger("create");
                   console.log("entra");
                  $("#espera").html("");
                     
            }    
            },
            error: function(xhr, status, error) {    
            }
        });
     
    
  } 


function addItemRFC() {
      
      var rfcResult = myApp.rfcResult;
      var that = this;  
     // var response;
      var searchTermElem = document.getElementById('txtItemRFC');
      console.log(searchTermElem.value);
    
     $('#rfcResult').html("");
      $("#rfcLista").children().remove();
    $("#espera").html("Conectandose a SAT espera...");
    
    $.ajax({
            url: "http://187.141.97.227/sat/procesarfc.php?rfc="+searchTermElem.value,
            data: { rfc:searchTermElem.value},
           // data : "rfc="+searchTermElem.value,
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            
            success: function (datos) {
                
                 //that._addMessageToLog(searchTermElem.value);
             //   $('#rfcResult').text(JSON.stringify(datos));
               // $('#rfcResult').text(datos.rfcResult);
                
                if(datos.rfcResult=='INVALIDO'){ 
                 $('#rfcResult').html("<img src=\"styles/img/invalido.png\">");
			   //	$("#rfcResult").html("VALIDO");
                    document.getElementById('rfcResult').scrollIntoView();
                    $("#rfcLista").children().remove();
                    $("#espera").html("");
                     
  
                    
                    

                }
               else{
                  	$('#rfcResult').html("<img src=\"styles/img/valido.png\">");
                      document.getElementById('rfcResult').scrollIntoView();
                      $("#espera").html("");
                      getDataSAT();
 				//	$("#rfcResult").html("VALIDO");
               }
               //   $("#rfcResult").html("INVALIDO");
              //   console.log("entra");
            //  console.log("response.results");
              //console.log(JSON.stringify(datos));
                // alert(data.d);
               // var items = data.results;
            	//var list = $('#RFCResults');
                //$("#addButtonRFC").hide();
                //myApp.addItem(item.value);
                //list.html("");
                  //  $.each(items, function() {
                    //    list.append($(document.createElement('li')).html(this.from_user));
                  // });
                
                
            },
            error: function(xhr, status, error) {    
              // console.log(JSON.stringify(xhr));
              //    console.log(JSON.stringify(xhr.status));
              /// console.log(JSON.stringify(status));
              // console.log(JSON.stringify(error));
            }
        });
     
    
  } 


/*


function addItemRFC() {
 $("#rfcResult").load('http://187.17.200.32/sat/procesarfc.php?rfc='+txtItemRFC);

    $("#rfcResult").ready(function(){
           //$("#rfcResult").html("INVALIDO");
           var t=$("#rfcResult").text();
           console.log(t);
    });   
    
    
    
}

*/




function addScannedItem() {
    if (myApp.scanResult && myApp.scanResult.length > 0) {
        myApp.addItem(myApp.scanResult);
        myApp.scanResult = null;
        $("#scanResult").html('');
        $("#addScanButton").hide();
    }
}


myApp.openDb = function() {
    console.log("About to open DB");
    
    if(window.sqlitePlugin !== undefined) {
        console.log("Using SQLite Plugin DB");
        myApp.db = window.sqlitePlugin.openDatabase("FacturaMovilDB");
    } else {
        // For debugin in simulator fallback to native SQL Lite
        console.log("Use built in SQLite");
        myApp.db = window.openDatabase("FacturaMovilDB", "1.0", "Shopping List Demo", 200000);
    }
}
      
myApp.createTable = function() {
	var db = myApp.db;
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS sat_list(id INTEGER PRIMARY KEY ASC, item_name TEXT, is_done INTEGER)", [], 
                      myApp.onSuccess,
					  myApp.onError);
	});
}

myApp.addItem = function(itemName){
    var db = myApp.db;
	db.transaction(function(tx) {
		tx.executeSql("INSERT INTO sat_list(item_name, is_done) VALUES (?,?)",
					  [itemName, 0],
					  myApp.onSuccess,
					  myApp.onError);
	});
}

myApp.markComplete = function(itemId){
    var db = myApp.db;
	db.transaction(function(tx) {
		tx.executeSql("UPDATE sat_list SET is_done = 1 WHERE id = ?",
					  [itemId],
					  myApp.onSuccess,
					  myApp.onError);
	});
}

myApp.clearCompleted = function() {
    var db = myApp.db;
	db.transaction(function(tx) {
		tx.executeSql("DELETE FROM sat_list WHERE is_done = 1",
					  [],
					  myApp.onSuccess,
					  myApp.onError);
	});
}

myApp.refresh = function() {
    var sorting = function(a, b){
            var a1= a.item_name, b1= b.item_name;
            if(a1== b1) return 0;
            return a1> b1? 1: -1;
        }
    
	var render = function (tx, rs) {
		var activeRows = new Array();
        var completedRows = new Array();

		for (var i = 0; i < rs.rows.length; i++) {
            if (rs.rows.item(i).is_done === 0) {
                
                activeRows.push(rs.rows.item(i));
            }
            else {
                completedRows.push(rs.rows.item(i));
            }
		}
        
        // sort
        activeRows.sort(sorting);
        completedRows.sort(sorting);        
      
        var ds = new kendo.data.DataSource({ data: activeRows });
        var dscomplete = new kendo.data.DataSource({ data: completedRows });
        myApp.activeListView.setDataSource(ds);
        myApp.completedListView.setDataSource(dscomplete);
	}
    
	var db = myApp.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM sat_list", [], 
					  render, 
					  myApp.onError);
	});
}

myApp.onError = function(tx, e) {
	console.log("Error: " + e.message);
} 
      
myApp.onSuccess = function(tx, r) {
	myApp.refresh();
}

// Barcode search extensions  
myApp.scan = function() {
	window.plugins.barcodeScanner.scan(
		function(result) {
			if (!result.cancelled) {
                myApp._searchCode(result.text);
                
                
                 if (myApp.scanResult && myApp.scanResult.length > 0)
                 {
                    
                   if (myApp.scanResult.length == 94 || myApp.scanResult.length == 93) {  
                     
                       $tope=32;
                       $segtope=36;
                       if (myApp.scanResult.length == 94){$tope++; $segtope++;}
                       
                      messagedb =  myApp.scanResult 
                      messagedb2 = "RFC Emisor:" + messagedb.substring(4,16) + "             RFC Receptor:" + messagedb.substring(20,$tope) + "             Monto: $" + parseFloat(messagedb.substring($segtope,53)) +"             RFC Folio:" + messagedb.substring(57,94);
  					                     
                       myApp.addItem(messagedb2);
                    //myApp.scanResult = null;
                    //$("#scanResult").html('');
                    
                   }
       				 
                     
                     
                    $("#addScanButton").hide();
                  }
                
                
			}
		}, 
		function(error) {
			console.log("Scanning failed: " + error);
		});
};
    
myApp._searchCode = function(barcodeText) {
    var that = this;
   
   
       				$("#addScanButton").show();
       				
       	
           
       
    				//that._addMessageToLog(barcodeText);
       				//almacenable = "RFC Emisor:" + barcodeText.substring(4,16) + "<br />RFC Receptor:" + barcodeText.substring(19,32) + "<br />Monto:" + barcodeText.substring(36,54);
      				almacenable  = barcodeText;
       			    that._addMessageToLog(almacenable);
                    that.scanResult = almacenable;
                    
         
   
    
     
};





myApp._addMessageToLog = function(message) {
  
   
    $("#qrLista").children().remove();
    
     if (message.length == 94 || message.length == 93) {  
                     
                       $tope=32;
                       $segtope=36;
                       if (message.length == 94){$tope++; $segtope++;}
                       
                     
    $('#qrLista').append('<ul id=\"qrLista\" data-role=\"listview\"></ul>').trigger("create");       
    $("#qrLista").append ("<li data-icon=favorites>RFC Emisor:"+message.substring(4,16)+"</li>");
    $("#qrLista").append ("<li data-icon=favorites>Receptor:"+message.substring(20,$tope)+"</li>");
    $("#qrLista").append ("<li data-icon=favorites>Monto: $"+parseFloat(message.substring($segtope,53))+" MXN 0/100</li>");
    $("#qrLista").append ("<li data-icon=favorites>Folio:"+message.substring(57,94)+"</li>");
    
    }
     else 
     {
             $('#qrLista').append('<ul id=\"rfcLista\" data-role=\"listview\"></ul>').trigger("create");       
             $("#qrLista").append ("<li data-icon=favorites>Error: QR invalido. No corresponde a una factura emitida por SAT.</li>");
   
     }
    
};

