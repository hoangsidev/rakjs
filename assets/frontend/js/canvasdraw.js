// by Chtiwi Malek ===> CODICODE.COM
var mousePressed = false;
var lastX, lastY;
var ctx;
var url_bg_draw = "frontend/images/myimg.jpg";

// text to be sent
var text = {
    'app_version': 0.4,
    'api_level': '537.36',
    'device': '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
    'input_type': 0, // ?
    'options': 'enable_pre_space', // ?
    'requests': [{
        'writing_guide': {
            'writing_area_width': 500, // canvas width
            'writing_area_height': 250, // canvas height
        },
        'pre_context': '', // confirmed preceding chars
        'max_num_results': 10,
        'max_completions': 0,
        'language': 'ja',
        'ink': []
    }]
};

var cPushArray = new Array();
var cStep = -1;

var resultArray1 = new Array();
var resultArray2 = new Array();
var resultArray3 = new Array();
var resultArray3x = new Array();
var resultArray3y = new Array();
var resultArray3t = new Array();

var resultArray4x = new Array();
var resultArray4y = new Array();

var resultArray5 = new Array();



function InitThis() {
	

    ctx = document.getElementById('myCanvas').getContext("2d");

    $('#myCanvas').mousedown(function(e) {

        mousePressed = true;

        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);

    });

    $('#myCanvas').mousemove(function(e) {

        if (mousePressed) {

            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);

            resultArray4x.push(e.pageX - $(this).offset().left);

            resultArray4y.push(e.pageY - $(this).offset().top);

        }

    });

    $('#myCanvas').mouseup(function(e) {

        if (mousePressed) {
            mousePressed = false;
            cPush();

            resultArray3 = new Array();

            resultArray3.push(resultArray4x, resultArray4y);

            resultArray5.push(resultArray3);

            resultArray4x = new Array();
            resultArray4y = new Array();

            text.requests[0].ink = resultArray5;

           /* console.log(text.requests[0].ink);*/

            getDataKanji();

        }
    });

    $('#myCanvas').mouseleave(function(e) {
        if (mousePressed) {
            mousePressed = false;
            cPush();
        }

    });

    drawImage();
	
	
}

function drawImage() {
    var image = new Image();
    image.src = url_bg_draw;
    $(image).load(function() {
        ctx.drawImage(image, 0, 0, 500, 250);
        cPush();
    });

}


function Draw(x, y, isDown) {

    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = "#E6323A";
        ctx.lineWidth = 6;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;

}



function cPush() {
    cStep++;
    if (cStep < cPushArray.length) {
        cPushArray.length = cStep;
    }
    cPushArray.push(document.getElementById('myCanvas').toDataURL());

}


function clearArray() {



    var image = new Image();

    image.src = url_bg_draw;

    $(image).load(function() {

        ctx.drawImage(image, 0, 0, 500, 250);
        cPushArray.length = 1;
        cStep = 0;

        resultArray5 = new Array();

        text.requests[0].ink = resultArray5;

        getDataKanji();

    });



}




function cUndo() {
    if (cStep > 0) {
        cStep--;
        cPushArray.length--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function() {
            ctx.drawImage(canvasPic, 0, 0);
        }


        resultArray5.pop();

        text.requests[0].ink = resultArray5;

       /* console.log(text.requests[0].ink);*/

        getDataKanji();

    }
}


function getDataKanji() {

		
		
		    /////// send ajax request
			$.ajax({
				url: '/drawkanji',
				method: 'POST',
				data: { kq : JSON.stringify(text) },
			}).done(function(json) {

                json = jQuery.parseJSON( json );
				 
                var textdata = "";

                  var x = "";
          
                  for (i in json[1]) {
          
                      for (j in json[1][i]) {
          
                          if (j == 1) {
                              x += json[1][i][j];
                          }
                      }
          
                  }
                  
                  
                      var res = x.split(",");
              
                      var resLen = res.length;
              
                      if (resLen > 1) {
              
                          textdata = "<ul>";
              
                          for (i = 0; i < resLen; i++) {
              
                              if (res[i] != '') {
                                  textdata += "<li><a href='javascript:void(0)' class='getDataitem'>" + res[i] + "</a></li>";
                              }
              
                          }
              
                          textdata += "</ul>";
              
                      }	
                      
                      
                       document.getElementById("kanji-draw-result").innerHTML = textdata;
      
                          $(".getDataitem").click(function() {
                  
                              var kq = '';
                   
                               var old_data = $(".form_draw .search-input").val();
                              
                                /*console.log(old_data);*/
                  
                              var value = $(this).text();
                  
                              kq = old_data + value;
                  
                              $(".form_draw .search-input").val(kq);
                              
                               text.requests[0].ink=[];
                                
                                textdata="";
                                
                                document.getElementById("kanji-draw-result").innerHTML = textdata;
                                
                                clearArray();
                                
                                $(".form_draw .search-input").focus();
                  
                          });

			});
		
					
   

}