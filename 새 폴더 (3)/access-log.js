$(document).ready(function(){
	getMyHost();
    searchAdInsert();														// 광고를 클릭하여 사이트로 넘어온 경우와 해당 사이트에서 페이지 이동을 할 경우 사용하는 함수 입니다. 
           
});
var referrer = document.referrer;
var link = document.location.href;
var myHost="";						


function getMyHost(){

	 
		$.ajax({ 
			type: 'post' ,
			url : "http://13.125.83.126/main/getHost.do" ,
			dataType : 'json' ,
			data : {
				host : $(location).attr("host"),
				href : window.location.href
			},
			success : function(data, textStatus, jqXHR)
			{
				//myHost
				myHost = data.resultData.owner_host;
				
			} ,
			error : function(xhRequest, ErrorText, thrownError) {

			}
		});
	
	//alert(myHost);
}



function setCookie(cookie_name, value, days) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  var cookie_value = escape(value) + ((days == null) ? '' : ';    expires=' + exdate.toUTCString());
  document.cookie = cookie_name + '=' + cookie_value;
}

function getCookie(cookie_name) {
	  var x, y;
	  var val = document.cookie.split(';');

	  for (var i = 0; i < val.length; i++) {
	    x = val[i].substr(0, val[i].indexOf('='));
	    y = val[i].substr(val[i].indexOf('=') + 1);
	    x = x.replace(/^\s+|\s+$/g, ''); 
	    if (x == cookie_name) {
	      return unescape(y);
	    }
	  }
	 }
 
 function generateUUID() {
	    var d = new Date().getTime();
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	    });
	    return uuid;
	};


function setVisitorID() {

	var status = "new";

    if(referrer.indexOf(myHost) > -1){		
		if (getCookie('VisitorID')) {
	        var VisitorID = getCookie('VisitorID');
	    }else{
	    	setCookie('VisitorID',generateUUID(),'7');
	    }
		status = "exist";
	}else{
		if (getCookie('VisitorID')) {
			setCookie('VisitorID',generateUUID(),'7');
	    }else{
	    	setCookie('VisitorID',generateUUID(),'7');
	    }
		status = "new";
	}
    
	return status;
 }

function searchAdInsert(ref){

	 var status = setVisitorID();
	$.ajax({ 
		type: 'post' ,
		url : "http://13.125.83.126/main/forSearchAd.do" ,
		dataType : 'json' ,
		data : {
			host : $(location).attr("host"),
			visitorId : getCookie('VisitorID'),
			status : status,
            referer : referrer,
            href : window.location.href
		},
		success : function(data, textStatus, jqXHR)
		{
			
		} ,
		error : function(xhRequest, ErrorText, thrownError) {

		}
	});

}




