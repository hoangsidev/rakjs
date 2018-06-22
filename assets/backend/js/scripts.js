$(document).ready(function (e) {

    // $('#wrap_data tr td').dblclick(function () {
    //     var get_id_click = $(this).closest('tr').attr('id');
    //     location.href = '' + get_id_click;
    // });

    

    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
    // end

    $('[data-toggle="tooltip"]').tooltip();
    // end
    
});