 /////// send ajax request
    $.ajax({
        url: 'https://inputtools.google.com/request?itc=ja-t-i0-handwrit&app=demopage',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(text),
        dataType: 'json'
    }).done(function(json) {
		
         console.log(json);

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

    //////////////////send ajax request