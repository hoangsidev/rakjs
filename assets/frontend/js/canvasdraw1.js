// by Chtiwi Malek ===> CODICODE.COM
var mousePressed = false;
var lastX, lastY;
var ctx1;
var url_bg_draw = "frontend/images/myimg.jpg";

// text to be sent
var text1 = {
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
var resultArray31 = new Array();
var resultArray3x = new Array();
var resultArray3y = new Array();
var resultArray3t = new Array();

var resultArray4x1 = new Array();
var resultArray4y1 = new Array();

var resultArray51 = new Array();



function InitThis1() {
	

    ctx1 = document.getElementById('myCanvas1').getContext("2d");
	
	  /* console.log(ctx1);*/

    $('#myCanvas1').mousedown(function(e) {

        mousePressed = true;

        Draw1(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);

    });

    $('#myCanvas1').mousemove(function(e) {

        if (mousePressed) {

            Draw1(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);

            resultArray4x1.push(e.pageX - $(this).offset().left);

            resultArray4y1.push(e.pageY - $(this).offset().top);

        }

    });

    $('#myCanvas1').mouseup(function(e) {

        if (mousePressed) {
            mousePressed = false;
            cPush1();

            resultArray31 = new Array();

            resultArray31.push(resultArray4x1, resultArray4y1);

            resultArray51.push(resultArray31);

            resultArray4x1 = new Array();
            resultArray4y1 = new Array();

            text1.requests[0].ink = resultArray51;

           /* console.log(text.requests[0].ink);*/

            getDataKanji1();

        }
    });

    $('#myCanvas1').mouseleave(function(e) {
        if (mousePressed) {
            mousePressed = false;
            cPush1();
        }

    });

    drawImage1();
	
	
}

function drawImage1() {
    var image = new Image();
    image.src = url_bg_draw;
    $(image).load(function() {
        ctx1.drawImage(image, 0, 0, 500, 250);
        cPush1();
    });

}


function Draw1(x, y, isDown) {

    if (isDown) {
        ctx1.beginPath();
        ctx1.strokeStyle = "#E6323A";
        ctx1.lineWidth = 6;
        ctx1.lineJoin = "round";
        ctx1.moveTo(lastX, lastY);
        ctx1.lineTo(x, y);
        ctx1.closePath();
        ctx1.stroke();
    }
    lastX = x;
    lastY = y;

}



function cPush1() {
    cStep++;
    if (cStep < cPushArray.length) {
        cPushArray.length = cStep;
    }
    cPushArray.push(document.getElementById('myCanvas1').toDataURL());

}


function clearArray1() {
	
    var image = new Image();

    image.src = url_bg_draw;

    $(image).load(function() {

        ctx1.drawImage(image, 0, 0, 500, 250);
        cPushArray.length = 1;
        cStep = 0;

        resultArray51 = new Array();

        text1.requests[0].ink = resultArray51;
		
		console.log( text1.requests[0].ink);

        getDataKanji1();

    });



}




function cUndo1() {
    if (cStep > 0) {
        cStep--;
        cPushArray.length--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function() {
            ctx1.drawImage(canvasPic, 0, 0);
        }


        resultArray51.pop();

        text1.requests[0].ink = resultArray51;

       /* console.log(text.requests[0].ink);*/

        getDataKanji1();

    }
}

function getDataKanji1() {

	
				
		 /////// send ajax request
			$.ajax({
				url: '/drawkanji',
				method: 'POST',
				data: { kq : JSON.stringify(text1) },
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
						
						
						 document.getElementById("kanji-draw-result1").innerHTML = textdata;
		
							$(".getDataitem").click(function() {
					
								var kq = '';
					 
								 var old_data = $(".form_draw1 .search-input").val();
								
								  /*console.log(old_data);*/
					
								var value = $(this).text();
					
								kq = old_data + value;
					
								$(".form_draw1 .search-input").val(kq);
								
								 text1.requests[0].ink=[];
								  
								  textdata="";
								  
								  document.getElementById("kanji-draw-result1").innerHTML = textdata;
								  
								  clearArray1();
								  
								  $(".form_draw1 .search-input").focus();
					
							});

			});


}
