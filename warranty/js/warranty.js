const apiUrl = '/warranty/api/upload.php';

$(function(){

	// submit
	$("#submit").on("click", function() {

		// validate
		if(validate($("[validate]"))) { return; }

        var fd = new FormData($("#submitForm")[0]);

		var uploadSuccess = function(response) {
            $("#openModal").click();
		}

        $.ajax({
            url: apiUrl,
            type: 'post',
            processData: false,
            contentType: false,
            data: fd,
            dataType: "json",
            success: uploadSuccess,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
	});

    $("#close").on("click", function() {
        window.location.reload();
    });

    $("#phone").on("change", function() {
        console.log(validate($(this)));
        if(!validate($(this))) {
            var errorDiv = $(this).parent().find(".error");
            if ($(errorDiv).hasClass('error')) {
                $(errorDiv).text('');
                $(this).removeClass('input-error');
            }
        }
    });
});