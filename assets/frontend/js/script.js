/*$(window).scroll(function () {
	if ($(this).scrollTop() > 120) {
	 $('#suafix').addClass('suafix');
	 $('#form_search').addClass('form_search');
	 $('body').css('padding-top','120px');
	} else {
	 $('#suafix').removeClass('suafix');
	 $('#form_search').removeClass('form_search');
	 $('body').css('padding-top','0px');
	}
 });*/

 

$('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
    return false;
});


$('.flag_edit').dblclick(function () {
    $(this).prop('contenteditable', true);
    $(this).focus();
    $(this).css('outline', '1px solid #f00');
});
$('.flag_edit').stop().blur(function () {
    $(this).prop('contenteditable', false);
    $(this).css('outline', 'none');
    var value = $(this).attr('post_id');
    // alert(value);
    $('#' + value).submit();
});

function esc_str(str) {
    var string = str.trim();
    string = string.replace("?", "？");
    return string;
}

function hira_update() {

    $(".hira_update").each(function () {

        var feedb_val_origin = "";

        var index = $(this).attr("get_index");

        $("#btn_edit_hira_" + index).click(function () {
            $("#content_edit_hira_" + index).prop('contenteditable', true);
            $("#content_edit_hira_" + index).focus();
            $("#content_edit_hira_" + index).css('outline', '1px solid #f00');
            feedb_val_origin = $("#content_edit_hira_" + index).attr("feedb_val_origin");
            feedb_val_origin = feedb_val_origin.trim();
        });



        $("#content_edit_hira_" + index).stop().blur(function () {



            var feedb_val_content = $(this).text(); // nội dung sau khi chỉnh sửa
            if (/[!@#$%\^&*(){}[\]\\\/<>?\|\-]/.test(feedb_val_content) == true) {
                alert("Vui lòng không nhập ký tự đặc biệt");
                return false;
            }
            var feedb_id = $(this).attr('feedb_id');
            var feedb_userid = $(this).attr('feedb_userid');
            var feedb_username = $(this).attr('feedb_username');
            var feedb_link = $(this).attr('feedb_link');
            var role_user = $(this).attr("role_user");

            feedb_val_content = feedb_val_content.trim();
            feedb_id = feedb_id.trim();

            if (feedb_val_content != "" && feedb_id != '' && feedb_val_content != feedb_val_origin) {

                feedb_val_content = esc_str(feedb_val_content); // loi khi cos dau ?

                if (confirm("Bạn muốn góp ý!")) {

                   
                    $.ajax({
                        type: "POST",
                        url: "/chinh-sua-hiragana",
                        data: { hira: feedb_val_content, feedb_id: feedb_id, user_id: feedb_userid, feedb_username: feedb_username, role_user: role_user  },
                        success: function (data) {
                            // console.log(data)
                            if (data == 1) {

                                if (role_user == 3 || role_user == 2) {
                                    alert('Góp ý thành công!');
                                } else {
                                    alert('Góp ý thành công, vui lòng đợi quản trị viên xét duyệt ! ');
                                }
                                //console.log(data);
                            } else {
                                alert('Từ này đã tồn tại hoặc đang chờ duyệt! Vui lòng thử từ khác!');
                            }

                        }

                    })

                   


                    $(this).prop('contenteditable', false);
                    $(this).css('outline', 'none');

                } else {
                    $(this).prop('contenteditable', false);
                    $(this).css('outline', 'none');
                    $(this).html(feedb_val_origin);
                }

            } else {
                $(this).prop('contenteditable', false);
                $(this).css('outline', 'none');
                $(this).html(feedb_val_origin);
            }

        });


    });

} //end function


function kata_update() {

    $(".kata_update").each(function () {

        var feedb_val_origin = "";

        var index = $(this).attr("get_index");

        $("#btn_edit_kata_" + index).click(function () {
            $("#content_edit_kata_" + index).prop('contenteditable', true);
            $("#content_edit_kata_" + index).focus();
            $("#content_edit_kata_" + index).css('outline', '1px solid #f00');
            feedb_val_origin = $("#content_edit_kata_" + index).attr("feedb_val_origin");
            feedb_val_origin = feedb_val_origin.trim();
        });



        $("#content_edit_kata_" + index).stop().blur(function () {

            var feedb_val_content = $(this).text(); // nội dung sau khi chỉnh sửa
            if (/[!@#$%\^&*(){}[\]\\\/<>?\|\-]/.test(feedb_val_content) == true) {
                alert("Vui lòng không nhập ký tự đặc biệt");
                return false;
            }
            var feedb_id = $(this).attr('feedb_id');
            var feedb_userid = $(this).attr('feedb_userid');
            var feedb_username = $(this).attr('feedb_username');
            var feedb_link = $(this).attr('feedb_link');
            var role_user = $(this).attr("role_user");

            feedb_val_content = feedb_val_content.trim();
            feedb_id = feedb_id.trim();

            if (feedb_val_content != "" && feedb_id != '' && feedb_val_content != feedb_val_origin) {

                feedb_val_content = esc_str(feedb_val_content); // loi khi cos dau ?

                if (confirm("Bạn muốn góp ý!")) {

                    $.ajax({
                        type: "POST",
                        url: "/chinh-sua-katakana",
                        data: { kata: feedb_val_content, feedb_id: feedb_id, user_id: feedb_userid, feedb_username:feedb_username, role_user: role_user },
                        success: function (data) {
                            // console.log(data)
                            if (data == 1) {

                                if (role_user == 3 || role_user == 2) {
                                    alert('Góp ý thành công!');
                                } else {
                                    alert('Góp ý thành công, vui lòng đợi quản trị viên xét duyệt ! ');
                                }
    
                                //console.log(data);
                            } else {
                                alert('Từ này đã tồn tại hoặc đang chờ duyệt! Vui lòng thử từ khác!');
                            }

                        }

                    })


                    $(this).prop('contenteditable', false);
                    $(this).css('outline', 'none');

                } else {
                    $(this).prop('contenteditable', false);
                    $(this).css('outline', 'none');
                    $(this).html(feedb_val_origin);
                }

            } else {
                $(this).prop('contenteditable', false);
                $(this).css('outline', 'none');
                $(this).html(feedb_val_origin);
            }

        });


    });

} //end function


function roma_update() {

    $(".roma_update").each(function () {

        var feedb_val_origin = "";

        var index = $(this).attr("get_index");

        $("#btn_edit_roma_" + index).click(function () {
            $("#content_edit_roma_" + index).prop('contenteditable', true);
            $("#content_edit_roma_" + index).focus();
            $("#content_edit_roma_" + index).css('outline', '1px solid #f00');
            feedb_val_origin = $("#content_edit_roma_" + index).attr("feedb_val_origin");
            feedb_val_origin = feedb_val_origin.trim();
        });



        $("#content_edit_roma_" + index).stop().blur(function () {

            var feedb_val_content = $(this).text(); // nội dung sau khi chỉnh sửa
            if (/[!@#$%\^&*(){}[\]\\\/<>?\|\-]/.test(feedb_val_content) == true) {
                alert("Vui lòng không nhập ký tự đặc biệt");
                return false;
            }
            var feedb_id = $(this).attr('feedb_id');
            var feedb_userid = $(this).attr('feedb_userid');
            var feedb_username = $(this).attr('feedb_username');
            var feedb_link = $(this).attr('feedb_link');
            var role_user = $(this).attr("role_user");

            feedb_val_content = feedb_val_content.trim();
            feedb_id = feedb_id.trim();

            if (feedb_val_content != "" && feedb_id != '' && feedb_val_content != feedb_val_origin) {

                feedb_val_content = esc_str(feedb_val_content); // loi khi cos dau ?

                if (confirm("Bạn muốn góp ý!")) {

                    $.ajax({
                        type: "POST",
                        url: "/chinh-sua-romaji",
                        data: { roma: feedb_val_content, feedb_id: feedb_id, user_id: feedb_userid, feedb_username: feedb_username, role_user: role_user },
                        success: function (data) {
                            // console.log(data)
                            if (data == 1) {

                                if (role_user == 3 || role_user == 2) {
                                    alert('Góp ý thành công!');
                                } else {
                                    alert('Góp ý thành công, vui lòng đợi quản trị viên xét duyệt ! ');
                                }
                                //console.log(data);
                            } else {
                                alert('Từ này đã tồn tại hoặc đang chờ duyệt! Vui lòng thử từ khác!');
                            }
                        }

                    })

                    


                    $(this).prop('contenteditable', false);
                    $(this).css('outline', 'none');

                } else {
                    $(this).prop('contenteditable', false);
                    $(this).css('outline', 'none');
                    $(this).html(feedb_val_origin);
                }

            } else {
                $(this).prop('contenteditable', false);
                $(this).css('outline', 'none');
                $(this).html(feedb_val_origin);
            }

        });


    });

} //end function



function kanji_w_update() {

    $(".kanji_w_update").each(function () {

        var feedb_val_origin = "";

        var index = $(this).attr("get_index");

        $("#btn_edit_kanji_w_" + index).click(function () {

            $("#content_edit_kanji_w_" + index).prop('contenteditable', true);
            $("#content_edit_kanji_w_" + index).focus();
            $("#content_edit_kanji_w_" + index).css('outline', '1px solid #f00');
            feedb_val_origin = $("#content_edit_kanji_w_" + index).attr("feedb_val_origin");
            feedb_val_origin = feedb_val_origin.trim();
        });



        $("#content_edit_kanji_w_" + index).stop().blur(function () {

            var feedb_val_content = $(this).text(); // nội dung sau khi chỉnh sửa
            if (/[!@#$%\^&*(){}[\]\\\/<>?\|\-]/.test(feedb_val_content) == true) {
                alert("Vui lòng không nhập ký tự đặc biệt");
                $(this).prop('contenteditable', false);
                $(this).css('outline', 'none');
                $(this).html(feedb_val_origin);
                return false;
            }
            var feedb_id = $(this).attr('feedb_id');
            var feedb_userid = $(this).attr('feedb_userid');
            var feedb_username = $(this).attr('feedb_username');
            var feedb_link = $(this).attr('feedb_link');
            var role_user = $(this).attr("role_user");

            


            feedb_val_content = feedb_val_content.trim();
            feedb_id = feedb_id.trim();

            if (feedb_val_content != "" && feedb_id != '' && feedb_val_content != feedb_val_origin) {

                feedb_val_content = esc_str(feedb_val_content);

                if (confirm("Bạn muốn góp ý!")) {
                    /////////////////////////////
                    $.ajax({
                        type: "POST",
                        url: "/chinh-sua-kanji",
                        data: { kanji_w: feedb_val_content, feedb_id: feedb_id, user_id: feedb_userid, feedb_username: feedb_username, role_user: role_user },
                        success: function (data) {
                            // console.log(data)
                            if (data == 1) {
                                if (role_user == 3 || role_user == 2) {
                                    alert('Góp ý thành công!');
                                } else {
                                    alert('Góp ý thành công, vui lòng đợi quản trị viên xét duyệt ! ');
                                }
                                //console.log(data);
                            } else {
                                alert('Từ này đã tồn tại hoặc đang chờ duyệt! Vui lòng thử từ khác!');
                            }

                        }

                    })

                    $(this).prop('contenteditable', false);
                    $(this).css('outline', 'none');

                } else {
                    $(this).prop('contenteditable', false);
                    $(this).css('outline', 'none');
                    $(this).html(feedb_val_origin);
                }

            } else {
                $(this).prop('contenteditable', false);
                $(this).css('outline', 'none');
                $(this).html(feedb_val_origin);
            }

        });


    });

} //end function


function mean_typeword_update() {


    $(".mean_typeword_update").each(function () {

        var index = $(this).attr("get_index");

        // ajax lay type word
        $("#btn_edit_mean_typeword_" + index).click(function (e) {
            
            e.preventDefault();

            var $popup = $("#btn_popup_mean_typeword_" + index);

            var feedb_typeword_id = $(this).closest(".mean_typeword_update").find(".type_word_update").attr("feedb_typeword_id");

            var feedb_link = $(this).attr("feedb_link");

            var feedb_data_mean_old = $(this).closest(".mean_typeword_update").find(".mean_update").attr("feedb_val_origin");
            
            $popup.find(".textarea_mean").val(feedb_data_mean_old);

            var data = get_type_word_selected(feedb_typeword_id)

            $popup.find(".select_typeword").html(data);

        });


        //close modal
        $("#btncancel_" + index).click(function () {

            var $popup = $("#btn_popup_mean_typeword_" + index);
            var feedb_data_mean_old = $popup.find(".textarea_mean").attr('feedb_val_origin');
            $popup.find(".textarea_mean").val(feedb_data_mean_old);
            $("#btn_popup_mean_typeword_" + index).modal('toggle');

        });

        //Submit
        $("#btnsubmit_" + index).click(function () {

            var typeword_id_new = $(this).closest(".modal-dialog").find(".select_typeword").val();
            var typeword_id_old = $(this).closest(".modal-dialog").find(".select_typeword").attr("feedb_type_word_id");

            var mean_value_new = $(this).closest(".modal-dialog").find(".textarea_mean").val();
            var mean_value_old = $(this).closest(".modal-dialog").find(".textarea_mean").attr("feedb_val_origin");

            var feedb_link = $(this).attr("feedb_link");
            var user_id = $(this).attr("feedb_userid");
            var role_user = $(this).attr("role_user");
            var feedb_username = $(this).attr('feedb_username');
            var feedb_word_id = $(this).attr('feedb_word_id');



            mean_value_new = mean_value_new.trim();
            mean_value_old = mean_value_old.trim();

            var mean_id = $(this).attr("feedb_id");

            if (typeword_id_new == "" || mean_value_new == "") {
                alert("Vui lòng không để trống thông tin");
                return false;
            }

            if ( mean_value_new == mean_value_old ) {
                return false;
            } else {
                mean_value_new = esc_str(mean_value_new);

                if (confirm("Bạn muốn góp ý!")) {

                    $.ajax({
                        type: "POST",
                        url: "/them-va-chinh-sua-y-nghia",
                        data: { typeword_id: typeword_id_new, mean: mean_value_new, mean_id: mean_id, feedb_username:feedb_username, feedb_word_id: feedb_word_id, user_id: user_id, role_user: role_user },
                        success: function (data) {
                            // console.log(data)
                            if (data == 1) {

                                if (role_user == 3 || role_user == 2) {
                                    alert('Góp ý thành công!');
                                } else {
                                    alert('Góp ý thành công, vui lòng đợi quản trị viên xét duyệt ! ');
                                }
    
                                $("#btn_popup_mean_typeword_" + index).modal('toggle');
                                //  alert(data);
                            } else {
                                alert('Góp ý này đã tồn tại hoặc đang chờ duyệt! Vui lòng thử lại!');
                                $("#btn_popup_mean_typeword_" + index).modal('toggle');
                                //  alert(data);
                            }

                        }

                    })

                } //end confirm

            }




        });



    });


}

 function get_type_word_selected(type_word_id){

    var type_word_list={
        'N/A':"N/A",
        'N':"Danh từ",
        'EXP':"Cụm từ",
        'N-PREP':"Danh từ hoặc giới từ",
        'PREP':"Giới từ",
        'ADJ':"Tính từ",
        'EXC':"Thán từ",
        'ADV':"Trạng từ",
        'VERB-1':"Động từ nhóm I",
        'VERB-2':"Động từ nhóm II",
        'VERB-3':"Động từ nhóm III"
      }
      
     var data =  '<option value="">Chọn loại từ</option>' 
      
      for(var k in type_word_list) {
        // console.log(k, type_word_list[k])
        if( k == type_word_id ){
           data = data +  '<option value="' + k + '" selected >'+ type_word_list[k] + '</option>'
        }else{
            data = data +  '<option value="' + k + '">'+ type_word_list[k] + '</option>'
        }

      }

      return data
}

function example_update() {

    $(".example_update").each(function () {

        var index = $(this).attr("get_index");

        //click edit
        $("#btn_edit_example_" + index).click(function () {

            var $popup = $("#btn_popup_example_" + index);

            var feedb_exam_sentence_old = $popup.find(".textarea_sentence").attr('feedb_val_origin');
            $popup.find(".textarea_sentence").val(feedb_exam_sentence_old);

            var feedb_exam_mean_ex_old = $popup.find(".textarea_mean_ex").attr('feedb_val_origin');
            $popup.find(".textarea_mean_ex").val(feedb_exam_mean_ex_old);

            var feedb_furi_old = $popup.find(".textarea_furi").attr('feedb_val_origin');
            $popup.find(".textarea_furi").val(feedb_furi_old);

            //$("#btn_popup_example_"+index1+"_"+index2).modal('toggle');

        });


        //close modal
        $("#btncancel_exam_" + index).click(function () {

            var $popup = $("#btn_popup_example_" + index);

            var feedb_exam_sentence_old = $popup.find(".textarea_sentence").attr('feedb_val_origin');
            $popup.find(".textarea_sentence").val(feedb_exam_sentence_old);

            var feedb_exam_mean_ex_old = $popup.find(".textarea_mean_ex").attr('feedb_val_origin');
            $popup.find(".textarea_mean_ex").val(feedb_exam_mean_ex_old);

            var feedb_furi_old = $popup.find(".textarea_furi").attr('feedb_val_origin');
            $popup.find(".textarea_furi").val(feedb_furi_old);

            $("#btn_popup_example_" + index).modal('toggle');

        });

        //Submit
        $("#btnsubmit_exam_" + index).click(function () {

            var exam_sentence_new = $(this).closest(".modal-dialog").find(".textarea_sentence").val();
            var exam_sentence_old = $(this).closest(".modal-dialog").find(".textarea_sentence").attr("feedb_val_origin");

            var mean_ex_new = $(this).closest(".modal-dialog").find(".textarea_mean_ex").val();
            var mean_ex_old = $(this).closest(".modal-dialog").find(".textarea_mean_ex").attr("feedb_val_origin");

            var furi_new = $(this).closest(".modal-dialog").find(".textarea_furi").val();
            var furi_old = $(this).closest(".modal-dialog").find(".textarea_furi").attr("feedb_val_origin");

            //////////////////////

            var feedb_link = $(this).attr("feedb_link");
            var user_id = $(this).attr("feedb_userid");
            var role_user = $(this).attr("role_user");
            var feedb_username = $(this).attr('feedb_username');
            var feedb_word_id = $(this).attr('feedb_word_id');

            exam_sentence_new = exam_sentence_new.trim();
            mean_ex_new = mean_ex_new.trim();
            furi_new = furi_new.trim();

            var example_id = $(this).attr("feedb_id");

            if (exam_sentence_new == "" || mean_ex_new == "") {
                alert("Vui lòng không để trống thông tin");
                return false;
            }

            if ((exam_sentence_new == exam_sentence_old) && (mean_ex_new == mean_ex_old) && (furi_new == furi_old)) {
                return false;
            } else {
                exam_sentence_new = esc_str(exam_sentence_new);
                mean_ex_new = esc_str(mean_ex_new);
                furi_new = esc_str(furi_new);
                if (confirm("Bạn muốn góp ý!")) {

                    $.ajax({
                        type: "POST",
                        url: "/them-va-chinh-sua-vi-du",
                        data: { example_id: example_id, exam_sentence: exam_sentence_new, mean_ex: mean_ex_new, furi: furi_new, feedb_username: feedb_username, feedb_word_id: feedb_word_id, user_id: user_id, role_user: role_user },
                        success: function (data) {
                            // console.log(data)
                            if (data == 1) {

                                if (role_user == 3 || role_user == 2) {
                                    alert('Góp ý thành công!');
                                } else {
                                    alert('Góp ý thành công, vui lòng đợi quản trị viên xét duyệt ! ');
                                }
                                $("#btn_popup_example_" + index).modal('toggle');
                                //alert(data);
                            } else {
                                alert('Góp ý này đã tồn tại hoặc đang chờ duyệt! Vui lòng thử lại!');
                                $("#btn_popup_example_" + index).modal('toggle');
                                //alert(data);
                            }

                        }

                    })


                } //end confirm

            }

        });



    });


} //end function

///////////////////////////////////////////////

function kanji_update() {

    $(".kanji_update").each(function () {

        var feedb_val_origin = "";

        var index = $(this).attr("get_index");

        $("#btn_edit_kanji_" + index).click(function () {
            $("#content_edit_kanji_" + index).prop('contenteditable', true);
            $("#content_edit_kanji_" + index).focus();
            $("#content_edit_kanji_" + index).css('outline', '1px solid #f00');
            feedb_val_origin = $("#content_edit_kanji_" + index).attr("feedb_val_origin");
            feedb_val_origin = feedb_val_origin.trim();
        });

        $("#content_edit_kanji_" + index).stop().blur(function () {

            var feedb_val_content = $(this).text(); // nội dung sau khi chỉnh sửa
            if (/[!@#$%\^&*(){}[\]\\\/<>?\|\-]/.test(feedb_val_content) == true) {
                alert("Vui lòng không nhập ký tự đặc biệt");
                $(this).prop('contenteditable', false);
                $(this).css('outline', 'none');
                $(this).html(feedb_val_origin);
                return false;
            }
            var feedb_id = $(this).attr('feedb_id');
            var feedb_userid = $(this).attr('feedb_userid');
            var feedb_link = $(this).attr('feedb_link');
            var role_user = $(this).attr("role_user");

            feedb_val_content = feedb_val_content.trim();
            feedb_id = feedb_id.trim();

            if (feedb_val_content != "" && feedb_id != '' && feedb_val_content != feedb_val_origin) {

                feedb_val_content = esc_str(feedb_val_content);

                if (confirm("Bạn muốn góp ý!")) {

                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });


                    $.post('insert_gopy_kanji', {
                        kanji: feedb_val_content,
                        kanji_id: feedb_id,
                        user_id: feedb_userid,
                        role_user: role_user
                    }, function (data) {

                        delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

                        if (data != '') {

                            if (role_user == 3 || role_user == 2) {
                                alert('Góp ý thành công!');
                            } else {
                                alert('Góp ý thành công, vui lòng đợi quản trị viên xét duyệt ! ');
                            }

                            //console.log(data);
                        } else {
                            alert('Thất bại ! Xin vui lòng thử lại ! ');
                        }

                    });



                    $(this).prop('contenteditable', false);
                    $(this).css('outline', 'none');

                } else {
                    $(this).prop('contenteditable', false);
                    $(this).css('outline', 'none');
                    $(this).html(feedb_val_origin);
                }

            } else {
                $(this).prop('contenteditable', false);
                $(this).css('outline', 'none');
                $(this).html(feedb_val_origin);
            }

        });


    });

} //end function


function mean_typeword_kj_update() {

    $(".mean_typeword_kj_update").each(function () {

        var index = $(this).attr("get_index");

        // ajax lay type word
        $("#btn_edit_mean_typeword_kj_" + index).click(function () {

            var $popup = $("#btn_popup_mean_typeword_kj_" + index);

            var feedb_link = $(this).attr("feedb_link");

            var feedb_data_mean_old = $(this).closest(".mean_typeword_kj_update").find(".mean_kj_update").attr("feedb_val_origin");

            $popup.find(".textarea_mean_kj").val(feedb_data_mean_old);

        });


        //close modal
        $("#btncancel_mean_typeword_kj_" + index).click(function () {

            var $popup = $("#btn_popup_mean_typeword_kj_" + index);
            var feedb_data_mean_old = $popup.find(".textarea_mean_kj").attr('feedb_val_origin');
            $popup.find(".textarea_mean_kj").val(feedb_data_mean_old);
            $("#btn_popup_mean_typeword_kj_" + index).modal('toggle');

        });

        //Submit
        $("#btnsubmit_mean_typeword_kj_" + index).click(function () {

            var mean_value_new = $(this).closest(".modal-dialog").find(".textarea_mean_kj").val();
            var mean_value_old = $(this).closest(".modal-dialog").find(".textarea_mean_kj").attr("feedb_val_origin");

            var feedb_link = $(this).attr("feedb_link");
            var user_id = $(this).attr("feedb_userid");
            var role_user = $(this).attr("role_user");

            mean_value_new = mean_value_new.trim();
            mean_value_old = mean_value_old.trim();

            var mean_id = $(this).attr("feedb_id");


            if (mean_value_new == mean_value_old) {
                return false;
            } else {
                mean_value_new = esc_str(mean_value_new);

                if (confirm("Bạn muốn góp ý!")) {

                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });

                    $.post('insert_gopy_mean_typeword_kj', {
                        mean: mean_value_new,
                        mean_id: mean_id,
                        user_id: user_id,
                        role_user: role_user
                    }, function (data) {

                        delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

                        if (data != '') {

                            if (role_user == 3 || role_user == 2) {
                                alert('Góp ý thành công!');
                            } else {
                                alert('Góp ý thành công, vui lòng đợi quản trị viên xét duyệt ! ');
                            }

                            $("#btn_popup_mean_typeword_kj_" + index).modal('toggle');
                            //  alert(data);
                        } else {
                            alert('Thất bại ! Xin vui lòng thử lại ! ');
                            $("#btn_popup_mean_typeword_kj_" + index).modal('toggle');
                            //  alert(data);
                        }

                    });

                } //end confirm

            }

        });

    });


} //end function



function example_kj_update() {


    $(".example_kj_update").each(function () {

        var index = $(this).attr("get_index");

        //click edit
        $("#btn_edit_example_kj_" + index).click(function () {

            var $popup = $("#btn_popup_example_kj_" + index);

            var feedb_exam_sentence_old = $popup.find(".textarea_sentence").attr('feedb_val_origin');
            $popup.find(".textarea_sentence").val(feedb_exam_sentence_old);

            var feedb_exam_sentence_relative_old = $popup.find(".textarea_sentence_relative").attr('feedb_val_origin');
            $popup.find(".textarea_sentence_relative").val(feedb_exam_sentence_relative_old);

            var feedb_kanji_relative_pinyin_old = $popup.find(".textarea_kanji_relative_pinyin").attr('feedb_val_origin');
            $popup.find(".textarea_kanji_relative_pinyin").val(feedb_kanji_relative_pinyin_old);

            var feedb_mean_ex_old = $popup.find(".textarea_mean_ex").attr('feedb_val_origin');
            $popup.find(".textarea_mean_ex").val(feedb_mean_ex_old);



        });


        //close modal
        $("#btncancel_exam_kj_" + index).click(function () {

            var $popup = $("#btn_popup_example_kj_" + index);

            var feedb_exam_sentence_old = $popup.find(".textarea_sentence").attr('feedb_val_origin');
            $popup.find(".textarea_sentence").val(feedb_exam_sentence_old);

            var feedb_exam_sentence_relative_old = $popup.find(".textarea_sentence_relative").attr('feedb_val_origin');
            $popup.find(".textarea_sentence_relative").val(feedb_exam_sentence_relative_old);

            var feedb_kanji_relative_pinyin_old = $popup.find(".textarea_kanji_relative_pinyin").attr('feedb_val_origin');
            $popup.find(".textarea_kanji_relative_pinyin").val(feedb_kanji_relative_pinyin_old);

            var feedb_mean_ex_old = $popup.find(".textarea_mean_ex").attr('feedb_val_origin');
            $popup.find(".textarea_mean_ex").val(feedb_mean_ex_old);

            $("#btn_popup_example_kj_" + index).modal('toggle');

        });

        //Submit
        $("#btnsubmit_exam_kj_" + index).click(function () {

            var exam_sentence_new = $(this).closest(".modal-dialog").find(".textarea_sentence").val();
            var exam_sentence_old = $(this).closest(".modal-dialog").find(".textarea_sentence").attr("feedb_val_origin");

            var exam_sentence_relative_new = $(this).closest(".modal-dialog").find(".textarea_sentence_relative").val();
            var exam_sentence_relative_old = $(this).closest(".modal-dialog").find(".textarea_sentence_relative").attr("feedb_val_origin");

            var kanji_relative_pinyin_new = $(this).closest(".modal-dialog").find(".textarea_kanji_relative_pinyin").val();
            var kanji_relative_pinyin_old = $(this).closest(".modal-dialog").find(".textarea_kanji_relative_pinyin").attr("feedb_val_origin");

            var mean_ex_new = $(this).closest(".modal-dialog").find(".textarea_mean_ex").val();
            var mean_ex_old = $(this).closest(".modal-dialog").find(".textarea_mean_ex").attr("feedb_val_origin");



            //////////////////////

            var feedb_link = $(this).attr("feedb_link");
            var user_id = $(this).attr("feedb_userid");
            var example_id = $(this).attr("feedb_id");
            var role_user = $(this).attr("role_user");

            exam_sentence_new = exam_sentence_new.trim();
            exam_sentence_relative_new = exam_sentence_relative_new.trim();
            kanji_relative_pinyin_new = kanji_relative_pinyin_new.trim();
            mean_ex_new = mean_ex_new.trim();

            if (exam_sentence_new == "" || exam_sentence_relative_new == "" || kanji_relative_pinyin_new == "" || mean_ex_new == "") {
                alert("Vui lòng không để trống thông tin");
                return false;
            }

            if ((exam_sentence_new == exam_sentence_old) && (exam_sentence_relative_new == exam_sentence_relative_old) && (kanji_relative_pinyin_new == kanji_relative_pinyin_old) && (mean_ex_new == mean_ex_old)) {
                return false;
            } else {
                exam_sentence_new = esc_str(exam_sentence_new);
                exam_sentence_relative_new = esc_str(exam_sentence_relative_new);
                kanji_relative_pinyin_new = esc_str(kanji_relative_pinyin_new);
                mean_ex_new = esc_str(mean_ex_new);

                if (confirm("Bạn muốn góp ý!")) {


                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });

                    $.post('insert_gopy_example_kj', {
                        example_id: example_id,
                        exam_sentence_new: exam_sentence_new,
                        exam_sentence_relative_new: exam_sentence_relative_new,
                        kanji_relative_pinyin_new: kanji_relative_pinyin_new,
                        mean_ex_new: mean_ex_new,
                        user_id: user_id,
                        role_user: role_user
                    }, function (data) {

                        delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

                        if (data != '') {

                            if (role_user == 3 || role_user == 2) {
                                alert('Góp ý thành công!');
                            } else {
                                alert('Góp ý thành công, vui lòng đợi quản trị viên xét duyệt ! ');
                            }

                            $("#btn_popup_example_kj_" + index).modal('toggle');
                            //alert(data);
                        } else {
                            alert('Thất bại ! Xin vui lòng thử lại ! ');
                            $("#btn_popup_example_kj_" + index).modal('toggle');
                            //alert(data);
                        }

                    });




                } //end confirm

            }

        });



    });


} //end function



///////////////////////////Chuc nang them//////////////////////////////
//Them mean typeword_id

function mean_typeword_insert() {

    $(".mean_typeword_insert_wrap").each(function () {


        var index = $(this).attr("get_index");


        $(".btn_mean_typeword_insert_" + index).click(function () {

            var $popup = $("#popup_mean_typeword_insert_" + index);

            var feedb_link = $(this).attr("feedb_link");

            // $.get(feedb_link, function (data) {
            //     $popup.find(".select_mean_typeword_insert_" + index).html(data);
            // });

        });


        //close modal
        $("#btncancel_mean_typeword_insert_" + index).click(function () {
            var $popup = $("#popup_mean_typeword_insert_" + index);
            $popup.find(".textarea_mean_typeword_insert_" + index).val("");
            $popup.modal('toggle');
        });

        //Submit
        $("#btnsubmit_mean_typeword_insert_" + index).click(function () {

            var typeword_id_new = $(this).closest(".modal-dialog").find(".select_mean_typeword_insert_" + index).val();
            var mean_value_new = $(this).closest(".modal-dialog").find(".textarea_mean_typeword_insert_" + index).val();
            var link_return = $(this).attr("link_return");
            var user_id = $(this).attr("feedb_userid");
            var user_name = $(this).attr("feedb_username");
            var feed_id = $(this).attr("feedb_id");
            var role_user = $(this).attr("role_user");

            mean_value_new = mean_value_new.trim();

            if (typeword_id_new == "" || mean_value_new == "") {
                alert("Vui lòng không để trống thông tin");
                return false;
            } else {

                mean_value_new = esc_str(mean_value_new);

                if (confirm("Bạn muốn thêm ý nghĩa mới!")) {

                    $.ajax({
                        type: "POST",
                        url: "/them-va-chinh-sua-y-nghia",
                        data: { feed_id: feed_id, typeword_id: typeword_id_new, mean:mean_value_new, user_id: user_id, user_name:user_name, role_user: role_user },
                        success: function (data) {
                            
                            if (data == 1) {

                                if (role_user == 3) {
                                    alert('Thêm ý nghĩa thành công!');
                                    window.location.href = link_return;
                                } else {
                                    alert('Thêm ý nghĩa thành công! vui lòng đợi quản trị viên xét duyệt !');
                                }
    
                                $("#popup_mean_typeword_insert_" + index).modal('toggle');
    
                            } else {
                                alert('Ý nghĩa này đã tồn tại hoặc đang chờ duyệt! Vui lòng thử ý nghĩa khác!');
                                $("#popup_mean_typeword_insert_" + index).modal('toggle');
                            }

                        }

                    })




                } //end confirm



            }

        });


    });

} //end function

function example_insert() {

    $(".example_insert_wrap").each(function () {


        var index = $(this).attr("get_index");


        $(".btn_example_insert_" + index).click(function () {

            var $popup = $("#popup_example_insert_" + index);
            $popup.find(".textarea_sentence_insert_" + index).val("");
            $popup.find(".textarea_mean_ex_insert_" + index).val("");
            $popup.find(".textarea_furi_insert_" + index).val("");

            kuroshiro.init(function (err) {
                //furigana
                $(".textarea_sentence_insert_" + index).blur(function () {
    
                   var value_example = $(this).val();
    
                   if (value_example != '') {
                       var value_furigana_insert = kuroshiro.convert(value_example, { to: 'hiragana', mode: 'furigana' });
                       value_furigana_insert = value_furigana_insert.replace(/<ruby>/g, '{'); 
                       value_furigana_insert = value_furigana_insert.replace(/<\/ruby>/g, '}');
                       value_furigana_insert = value_furigana_insert.replace(/\(/g, '');
                       value_furigana_insert = value_furigana_insert.replace(/\)/g, '');
                       value_furigana_insert = value_furigana_insert.replace(/<rt>/g, ':');
                       value_furigana_insert = value_furigana_insert.replace(/<\/?[^>]+(>|$)/g, '');
                       var example_item = $(this).closest('.example_insert_wrap');
                       example_item.find(".textarea_furi_insert_" + index).val(value_furigana_insert);
                   }
                 
               });
    
               
    
    
            });    



        });


        //close modal
        $("#btncancel_example_insert_" + index).click(function () {
            var $popup = $("#popup_example_insert_" + index);
            $popup.find(".textarea_sentence_insert_" + index).val("");
            $popup.find(".textarea_mean_ex_insert_" + index).val("");
            $popup.find(".textarea_furi_insert_" + index).val("");
            $popup.modal('toggle');
        });

        //Submit
        $("#btnsubmit_example_insert_" + index).click(function () {


            var sentence_value_new = $(this).closest(".modal-dialog").find(".textarea_sentence_insert_" + index).val();
            var mean_ex_value_new = $(this).closest(".modal-dialog").find(".textarea_mean_ex_insert_" + index).val();
            var furi_value_new = $(this).closest(".modal-dialog").find(".textarea_furi_insert_" + index).val();



            var link_return = $(this).attr("link_return");
            var user_id = $(this).attr("feedb_userid");
            var feed_id = $(this).attr("feedb_id");
            var user_name = $(this).attr("feedb_username");
            var role_user = $(this).attr("role_user");

            sentence_value_new = sentence_value_new.trim();
            mean_ex_value_new = mean_ex_value_new.trim();


            if (sentence_value_new == "" || mean_ex_value_new == "") {
                alert("Vui lòng không để trống thông tin");
                return false;
            } else {

                sentence_value_new = esc_str(sentence_value_new);
                mean_ex_value_new = esc_str(mean_ex_value_new);

                if (confirm("Bạn muốn thêm ví dụ mới!")) {

                    $.ajax({
                        type: "POST",
                        url: "/newexampleinsert",
                        data: { feed_id: feed_id, sentence: sentence_value_new, mean_ex:mean_ex_value_new, furi:furi_value_new, user_id: user_id, user_name:user_name, role_user: role_user },
                        success: function (data) {
                            // console.log(data)
                            
                            if (data == 1) {

                                if (role_user == 3) {
                                    alert('Thêm ví dụ thành công!');
                                    window.location.href = link_return;
                                } else {
                                    alert('Thêm ví dụ thành công! vui lòng đợi quản trị viên xét duyệt !');
                                }
    
                                $("#popup_example_insert_" + index).modal('toggle');
    
                            } else {
                                alert('Ví dụ này đã tồn tại hoặc đang chờ duyệt! Vui lòng thử ví dụ khác!');
                                $("#popup_example_insert_" + index).modal('toggle');
                            }

                            


                        }

                    })






                } //end confirm



            }

        });


    });

} //end function

function mean_typeword_kj_insert() {

    $(".mean_typeword_kj_insert_wrap").each(function () {


        var index = $(this).attr("get_index");


        $(".btn_mean_typeword_insert_" + index).click(function () {

            var $popup = $("#popup_mean_typeword_kj_insert_" + index);

            $popup.find(".textarea_mean_typeword_kj_insert_" + index).val("");

        });


        //close modal
        $("#btncancel_mean_typeword_kj_insert_" + index).click(function () {
            var $popup = $("#popup_mean_typeword_kj_insert_" + index);
            $popup.find(".textarea_mean_typeword_kj_insert_" + index).val("");
            $popup.modal('toggle');
        });

        //Submit
        $("#btnsubmit_mean_typeword_kj_insert_" + index).click(function () {


            var mean_value_new = $(this).closest(".modal-dialog").find(".textarea_mean_typeword_kj_insert_" + index).val();
            var link_return = $(this).attr("link_return");
            var user_id = $(this).attr("feedb_userid");
            var feed_id = $(this).attr("feedb_id");
            var role_user = $(this).attr("role_user");

            mean_value_new = mean_value_new.trim();

            if (mean_value_new == "") {
                alert("Vui lòng không để trống thông tin");
                return false;
            } else {

                mean_value_new = esc_str(mean_value_new);

                if (confirm("Bạn muốn thêm ý nghĩa mới!")) {

                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });

                    $.post('new_mean_typeword_kj_insert', {
                        feed_id: feed_id,
                        mean: mean_value_new,
                        user_id: user_id,
                        role_user: role_user
                    }, function (data) {

                        delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

                        if (data != '') {

                            if (role_user == 3) {
                                alert('Thêm ý nghĩa thành công!');
                                window.location.href = link_return;
                            } else {
                                alert('Thêm ý nghĩa thành công! vui lòng đợi quản trị viên xét duyệt !');
                            }

                            $("#popup_mean_typeword_kj_insert_" + index).modal('toggle');

                        } else {
                            alert('Thêm ý nghĩa thất bại, vui lòng thử lại! ');
                            $("#popup_mean_typeword_kj_insert_" + index).modal('toggle');
                        }

                    });

                } //end confirm



            }

        });


    });

} //end function


function example_kj_insert() {

    $(".example_kj_insert_wrap").each(function () {


        var index = $(this).attr("get_index");


        $(".btn_example_kj_insert_" + index).click(function () {

            var $popup = $("#popup_example_kj_insert_" + index);

            $popup.find(".textarea_sentence_kj_insert_" + index).val("");
            $popup.find(".textarea_sentence_relative_kj_insert_" + index).val("");
            $popup.find(".textarea_kanji_relative_pinyin_kj_insert_" + index).val("");
            $popup.find(".textarea_mean_ex_kj_insert_" + index).val("");

        });


        //close modal
        $("#btncancel_example_kj_insert_" + index).click(function () {
            var $popup = $("#popup_example_kj_insert_" + index);
            $popup.find(".textarea_sentence_kj_insert_" + index).val("");
            $popup.find(".textarea_sentence_relative_kj_insert_" + index).val("");
            $popup.find(".textarea_kanji_relative_pinyin_kj_insert_" + index).val("");
            $popup.find(".textarea_mean_ex_kj_insert_" + index).val("");
            $popup.modal('toggle');
        });

        //Submit
        $("#btnsubmit_example_kj_insert_" + index).click(function () {


            var sentence_kj = $(this).closest(".modal-dialog").find(".textarea_sentence_kj_insert_" + index).val();
            var sentence_relative_kj = $(this).closest(".modal-dialog").find(".textarea_sentence_relative_kj_insert_" + index).val();
            var kanji_relative_pinyin_kj = $(this).closest(".modal-dialog").find(".textarea_kanji_relative_pinyin_kj_insert_" + index).val();
            var mean_ex_kj = $(this).closest(".modal-dialog").find(".textarea_mean_ex_kj_insert_" + index).val();



            var link_return = $(this).attr("link_return");
            var user_id = $(this).attr("feedb_userid");
            var feed_id = $(this).attr("feedb_id");
            var role_user = $(this).attr("role_user");

            sentence_kj = sentence_kj.trim();
            sentence_relative_kj = sentence_relative_kj.trim();
            kanji_relative_pinyin_kj = kanji_relative_pinyin_kj.trim();
            mean_ex_kj = mean_ex_kj.trim();


            if (sentence_kj == "" || sentence_relative_kj == "" || kanji_relative_pinyin_kj == "" || mean_ex_kj == "") {
                alert("Vui lòng không để trống thông tin");
                return false;
            } else {

                sentence_kj = esc_str(sentence_kj);
                sentence_relative_kj = esc_str(sentence_relative_kj);
                kanji_relative_pinyin_kj = esc_str(kanji_relative_pinyin_kj);
                mean_ex_kj = esc_str(mean_ex_kj);

                if (confirm("Bạn muốn thêm ví dụ mới!")) {

                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });

                    $.post('new_example_kj_insert', {
                        feed_id: feed_id,
                        sentence_kj: sentence_kj,
                        sentence_relative_kj: sentence_relative_kj,
                        kanji_relative_pinyin_kj: kanji_relative_pinyin_kj,
                        mean_ex_kj: mean_ex_kj,
                        user_id: user_id,
                        role_user: role_user
                    }, function (data) {

                        delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

                        if (data != '') {

                            if (role_user == 3) {
                                alert('Thêm ví dụ thành công!');
                                window.location.href = link_return;
                            } else {
                                alert('Thêm ví dụ thành công! vui lòng đợi quản trị viên xét duyệt !');
                            }

                            $("#popup_example_kj_insert_" + index).modal('toggle');

                        } else {
                            alert('Thêm ví dụ thất bại, vui lòng thử lại! ');
                            $("#popup_example_kj_insert_" + index).modal('toggle');
                        }

                    });

                } //end confirm



            }

        });


    });

} //end function





function add_new_word_kanji() {

    var max_fields = 1; //maximum input boxes allowed
    var wrapper = $(".input_fields_wrap_kanji"); //Fields wrapper
    var add_button = $(".add_field_button_kanji"); //Add button ID


    var x = 0; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="wrap_input_new_word_data"><input placeholder="Kanji" required id="kanji" name="kanji" class="form-control input-lg" type="text"><a href="#" class="remove_field">Xóa bỏ</a></div>'); //add input box
        }
        $(".input_fields_wrap_kanji input#kanji").focus();
    });

    $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })


}


function add_new_word_hiragana() {

    var max_fields = 1; //maximum input boxes allowed
    var wrapper = $(".input_fields_wrap_hiragana"); //Fields wrapper
    var add_button = $(".add_field_button_hiragana"); //Add button ID


    var x = 0; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="wrap_input_new_word_data"><input placeholder="Hiragana" required id="hiragana" name="hiragana" class="form-control input-lg" type="text"><a href="#" class="remove_field">Xóa bỏ</a></div>'); //add input box
            $(".input_fields_wrap_hiragana input#hiragana").focus();
        }
    });

    $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })


}

function add_new_word_katakana() {

    var max_fields = 1; //maximum input boxes allowed
    var wrapper = $(".input_fields_wrap_katakana"); //Fields wrapper
    var add_button = $(".add_field_button_katakana"); //Add button ID


    var x = 0; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="wrap_input_new_word_data"><input placeholder="Katakana" required id="katakana" name="katakana" class="form-control input-lg" type="text"><a href="#" class="remove_field">Xóa bỏ</a></div>'); //add input box
            $(".input_fields_wrap_katakana input#katakana").focus();
        }
    });

    $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })


}


function add_new_word_romaji() {

    var max_fields = 1; //maximum input boxes allowed
    var wrapper = $(".input_fields_wrap_romaji"); //Fields wrapper
    var add_button = $(".add_field_button_romaji"); //Add button ID


    var x = 0; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="wrap_input_new_word_data"><input placeholder="Romaji" required id="romaji" name="romaji" class="form-control input-lg" type="text"><a href="#" class="remove_field">Xóa bỏ</a></div>'); //add input box
            $(".input_fields_wrap_romaji input#romaji").focus();
        }
    });

    $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })


}


function add_new_word_vi() {

    var max_fields = 5; //maximum input boxes allowed
    var wrapper = $(".input_fields_wrap_vi"); //Fields wrapper
    var add_button = $(".add_field_button_vi"); //Add button ID


    var x = 0; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="wrap_input_new_word_data"><textarea placeholder="Ý nghĩa" required name="mean[]" id="mean[]" class="form-control input-lg input-textarea wrap_vi_textarea" cols="45" rows="1"></textarea><a href="#" class="remove_field">Xóa bỏ</a></div>'); //add input box

            $(".input_fields_wrap_vi textarea.wrap_vi_textarea").focus();

        }
    });

    $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })


}


function add_new_word_exam() {

    var max_fields = 5; //maximum input boxes allowed
    var wrapper = $(".input_fields_wrap_exam"); //Fields wrapper
    var add_button = $(".add_field_button_exam"); //Add button ID


    var x = 0; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="wrap_input_new_word_data"><textarea required placeholder="Mẫu câu ví dụ" name="sentence[]" id="sentence[]" class="form-control input-lg input-textarea wrap_exam_textarea sentence_exam" cols="45" rows="1"></textarea><textarea required placeholder="Ý nghĩa ví dụ" name="mean_ex[]" id="mean_ex[]" class="form-control input-lg input-textarea" cols="45" rows="1"></textarea><textarea required placeholder="Furigana" name="furigana[]" id="furigana[]" class="form-control input-lg input-textarea furigana_exam" cols="45" rows="1"></textarea><a href="#" class="remove_field">Xóa bỏ</a></div>'); //add input box
            $(".input_fields_wrap_exam textarea.wrap_exam_textarea").focus();
        }

        kuroshiro.init(function (err) {
            //furigana
            $('.sentence_exam').blur(function () {

               var value_example = $(this).val();

               if (value_example != '') {
                   var value_furigana_insert = kuroshiro.convert(value_example, { to: 'hiragana', mode: 'furigana' });
                   value_furigana_insert = value_furigana_insert.replace(/<ruby>/g, '{'); 
                   value_furigana_insert = value_furigana_insert.replace(/<\/ruby>/g, '}');
                   value_furigana_insert = value_furigana_insert.replace(/\(/g, '');
                   value_furigana_insert = value_furigana_insert.replace(/\)/g, '');
                   value_furigana_insert = value_furigana_insert.replace(/<rt>/g, ':');
                   value_furigana_insert = value_furigana_insert.replace(/<\/?[^>]+(>|$)/g, '');
                   var example_item = $(this).closest('.wrap_input_new_word_data');
                   example_item.find('.furigana_exam').val(value_furigana_insert);
               }
             
           });

           


        });    


    });

   

    $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })


}




/*$(function() {
  $(window).scroll(function () {
	   if ($(this).scrollTop() > 140) {
			$('#form_search').css('position', 'fixed');
			$('#main_tab').css('position', 'fixed');
	   } else {
			$('#form_search').css('position', 'static');
			$('#main_tab').css('position', 'fixed');
	   }
   });
});*/


function searchpara() {

    var source = "ja";
    var target = "vi";


    $("#search-pagagraph-source").bind('paste', function (e) {

        var ctl = $(this);

        setTimeout(function () {


            var source = $(".navigation-bar-source .btn.active").attr("source");

            var target = $(".navigation-bar-taget .btn.active").attr("target");

            var content = $(".search-pagagraph-source").val();

            content = content.trim();

            if (content != '') {

                $(".loading-bar").show();

                //////////////
                $.ajax({
                    type: "POST",
                    url: "/searchparatranslate",
                    data: { source: source, target: target, content: content },
                    success: function (data) {
                        console.log(data)
                        if (data != '') {

                            var datajson = jQuery.parseJSON(data);

                            $(".loading-bar").hide();

                            $(".search-pagagraph-target").html(datajson.trans);


                            if (source == "ja") {
                                $(".search-pagagraph-src_translit").html(datajson.src_translit).show();
                                $(".search-pagagraph-translit").hide();
                            } else {
                                $(".search-pagagraph-translit").html(datajson.translit).show();
                                $(".search-pagagraph-src_translit").hide();
                            }

                        }

                    }

                })
                ///////////////////

            } else {
                return false;
            }


        }, 100);

    });


    $(".btn-source").click(function () {

        var $btn_active = $(this);
        $(this).closest(".navigation-bar-source").find(".btn-source").removeClass("active");
        $btn_active.addClass("active");
        setTimeout(function () {


            var source = $(".navigation-bar-source .btn.active").attr("source");

            var target = $(".navigation-bar-taget .btn.active").attr("target");

            var content = $(".search-pagagraph-source").val();

            content = content.trim();

            if (content != '') {

                $(".loading-bar").show();

                //////////////
                $.ajax({
                    type: "POST",
                    url: "/searchparatranslate",
                    data: { source: source, target: target, content: content },
                    success: function (data) {
                        console.log(data)
                        if (data != '') {

                            var datajson = jQuery.parseJSON(data);

                            $(".loading-bar").hide();

                            $(".search-pagagraph-target").html(datajson.trans);


                            if (source == "ja") {
                                $(".search-pagagraph-src_translit").html(datajson.src_translit).show();
                                $(".search-pagagraph-translit").hide();
                            } else {
                                $(".search-pagagraph-translit").html(datajson.translit).show();
                                $(".search-pagagraph-src_translit").hide();
                            }

                        }

                    }

                })
                ///////////////////

            } else {
                return false;
            }

        }, 100); //dich

    });


    $(".btn-target").click(function () {

        var $btn_active2 = $(this);

        $(this).closest(".navigation-bar-taget").find(".btn-target").removeClass("active");

        $btn_active2.addClass("active");

        setTimeout(function () {


            var source = $(".navigation-bar-source .btn.active").attr("source");

            var target = $(".navigation-bar-taget .btn.active").attr("target");

            var content = $(".search-pagagraph-source").val();

            content = content.trim();

            if (content != '') {

                $(".loading-bar").show();

                //////////////
                $.ajax({
                    type: "POST",
                    url: "/searchparatranslate",
                    data: { source: source, target: target, content: content },
                    success: function (data) {
                        console.log(data)
                        if (data != '') {

                            var datajson = jQuery.parseJSON(data);

                            $(".loading-bar").hide();

                            $(".search-pagagraph-target").html(datajson.trans);

                            if (source == "ja") {
                                $(".search-pagagraph-src_translit").html(datajson.src_translit).show();
                                $(".search-pagagraph-translit").hide();
                            } else {
                                $(".search-pagagraph-translit").html(datajson.translit).show();
                                $(".search-pagagraph-src_translit").hide();
                            }

                        }

                    }

                })
                ////////////////

            } else {

                return false;

            }

        }, 100); //dich

    });



    $(".remove-text").click(function () {

        $(".search-pagagraph-source").val("");
        $(".search-pagagraph-target").text("");

        $(this).closest(".search-pagagraph").find(".search-pagagraph-form").focus();

        $(".search-pagagraph-translit").html("").hide();
        $(".search-pagagraph-src_translit").html("").hide();

    });


    $(".btn-translate").click(function () {
        var source = $(".navigation-bar-source .btn.active").attr("source");
        var target = $(".navigation-bar-taget .btn.active").attr("target");
        var content = $(".search-pagagraph-source").val();
        content = content.trim();

        if (content != '') {

            $(".loading-bar").show();

            //////////////
            $.ajax({
                type: "POST",
                url: "/searchparatranslate",
                data: { source: source, target: target, content: content },
                success: function (data) {
                    console.log(data)
                    if (data != '') {

                        var datajson = jQuery.parseJSON(data);

                        $(".loading-bar").hide();

                        $(".search-pagagraph-target").html(datajson.trans);

                        if (source == "ja") {
                            $(".search-pagagraph-src_translit").html(datajson.src_translit).show();
                            $(".search-pagagraph-translit").hide();
                        } else {
                            $(".search-pagagraph-translit").html(datajson.translit).show();
                            $(".search-pagagraph-src_translit").hide();
                        }

                    }

                }

            })
            ////////////////



        } else {

            return false;
        }


    }); // end click	

}

function add_mywords() {

    $(".add_mywords_wrap").each(function () {

        var index = $(this).attr("get_index");

        //close modal
        $("#btncancel_add_mywords_" + index).click(function () {
            $("#popup_addwords_" + index).modal('toggle');
        });

        //close modal
        $("#btncancel_creatgroups_" + index).click(function () {
            $("#popup_addgroup_new_" + index).modal('toggle');
        });


        $("#popup_addgroup_new_" + index).on('shown.bs.modal', function () {
            $(this).find('#creat_mygroup_' + index).focus();
            $(this).find('#creat_mygroup_' + index).val("");
        });


        //////////////1//////////////
        $("#btn_creatgroups_" + index).click(function () {

            var key_group = $(this).closest(".modal-content").find("#creat_mygroup_" + index).val();
            var user_id = $(this).attr("user_id");
            var word_id = $(this).attr("word_id");

            key_group = key_group.trim();

            if (key_group == "") {
                alert("Vui lòng không để trống thông tin!");
                return false;
            } else {
                key_group = esc_str(key_group);
                /**/
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.post('create_my_group', {
                    key_group: key_group,
                    user_id: user_id,
                    word_id: word_id,
                    index: index
                }, function (data) {
                    delete $.ajaxSettings.headers["X-CSRF-TOKEN"];
                    if (data != '') {

                        var data_group_id = data.group_id;
                        var data_html = data.html

                        $(".table_mygroups_" + index).append(data_html);
                        $("#popup_addgroup_new_" + index).modal('toggle');

                        //////////////3//////////////
                        add_mygroups1(data_group_id, index);
                        //////////////3//////////////


                    } else {
                        alert('Tạo danh sách thất bại!, vui lòng thử lại! ');
                        $("#popup_addgroup_new_" + index).modal('toggle');
                        $("#popup_addwords_" + index).modal('toggle');
                    }

                });
                /**/
            }
        });
        //////////////1//////////////


        //////////////2//////////////
        $("#btn_add_mywords_" + index).click(function () {


            var user_id = $(this).attr("user_id");
            var word_id = $(this).attr("word_id");


            if (user_id != 1) {

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                $.post('get_my_groups', {
                    user_id: user_id,
                    word_id: word_id,
                    index: index
                }, function (data) {
                    delete $.ajaxSettings.headers["X-CSRF-TOKEN"];
                    if (data != '') {


                        var data_group_id = data.group_id;
                        var data_html = data.html

                        $(".table_mygroups_" + index).html(data_html);



                        $.each(data_group_id, function (key, value) {
                            add_mygroups2(value, index);
                        });


                        //////////////3//////////////

                        //////////////3//////////////


                    } else {

                        return false;
                    }

                });

            } else {
                return false;
            }


        });
        //////////////2//////////////

    });

} //end function


function add_mygroups1(data_group_id, index) {

    var index = index;
    var data_group_id = data_group_id;

    $(".add_to_mygroup_just_" + data_group_id).click(function () {

        var mygroupid = $(this).attr("mygroupid");
        var user_id = $(this).attr("user_id");
        var word_id = $(this).attr("word_id");



        if (mygroupid != "" && user_id != "" && word_id != "") {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });


            $.post('add_word_to_mygroup', {
                user_id: user_id,
                word_id: word_id,
                mygroupid: mygroupid
            }, function (data) {

                delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

                if (data != '') {

                    if (data == 0) {
                        alert("Từ này đã có trong danh sách này!");
                        return false;
                    } else {
                        alert("Thêm thành công!");
                        $("#popup_addwords_" + index).modal('toggle');
                        return false;
                    }

                } else {
                    alert('Thêm thất bại!, vui lòng thử lại! ');
                    $("#popup_addwords_" + index).modal('toggle');
                    return false;
                }

            });

        } else {
            alert('Thêm thất bại!, vui lòng thử lại! ');
            $("#popup_addwords_" + index).modal('toggle');
            return false;
        }


    });



    $(".remove_mywords_just_" + data_group_id).click(function () {

        var mygroupid = $(this).attr("mygroupid");
        var user_id = $(this).attr("user_id");
        var word_id = $(this).attr("word_id");
        var $parent_it = $(this).closest("tr");


        if (confirm("Bạn muốn xóa danh sách này!")) {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });


            $.post('delete_word_mygroup', {
                user_id: user_id,
                word_id: word_id,
                mygroupid: mygroupid
            }, function (data) {

                delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

                if (data != '') {
                    alert("Xóa thành công!");
                    $parent_it.remove();
                    return false;
                } else {
                    alert('Xóa thất bại!, vui lòng thử lại! ');
                    return false;
                }

            });

        } else {
            return false;
        }

    });

}//end function


function add_mygroups2(data_group_id, index) {

    var index = index;
    var data_group_id = data_group_id;

    $(".add_to_mygroup_" + data_group_id).click(function () {

        var mygroupid = $(this).attr("mygroupid");
        var user_id = $(this).attr("user_id");
        var word_id = $(this).attr("word_id");



        if (mygroupid != "" && user_id != "" && word_id != "") {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.post('add_word_to_mygroup', {
                user_id: user_id,
                word_id: word_id,
                mygroupid: mygroupid
            }, function (data) {

                delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

                if (data != '') {

                    if (data == 0) {
                        alert("Từ này đã có trong danh sách này!");
                        return false;
                    } else {
                        alert("Thêm thành công!");
                        $("#popup_addwords_" + index).modal('toggle');
                        return false;
                    }

                } else {
                    alert('Thêm thất bại!, vui lòng thử lại! ');
                    $("#popup_addwords_" + index).modal('toggle');
                    return false;
                }

            });

        } else {
            alert('Thêm thất bại!, vui lòng thử lại! ');
            $("#popup_addwords_" + index).modal('toggle');
            return false;
        }


    });

    $(".remove_mywords_" + data_group_id).click(function () {

        var mygroupid = $(this).attr("mygroupid");
        var user_id = $(this).attr("user_id");
        var word_id = $(this).attr("word_id");
        var $parent_it = $(this).closest("tr");


        if (confirm("Bạn muốn xóa danh sách này!")) {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.post('delete_word_mygroup', {
                user_id: user_id,
                word_id: word_id,
                mygroupid: mygroupid
            }, function (data) {

                delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

                if (data != '') {
                    alert("Xóa thành công!");
                    $parent_it.remove();
                    return false;
                } else {
                    alert('Xóa thất bại!, vui lòng thử lại! ');
                    return false;
                }

            });

        } else {
            return false;
        }

    });

}//end function


//////////Quicksearch//////////////
$(".quick-search").fancybox({
    maxWidth: 1010,
    fitToView: true,
    scrollOutside: false,
    width: '100%',
    height: 'auto',
    autoSize: false, // important
    closeClick: false,
    openEffect: 'fade',
    closeEffect: 'fade',
    wrapCSS: 'quick-search-wrap'
});

///////////////////////////////////