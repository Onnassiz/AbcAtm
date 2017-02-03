$(document).ready(function() {
    var getCash = $(".getCash");
    var token = $("#token");
    var baseUrl = "http://localhost:5002/";
    var thisUrl = "http://localhost:5000/";
    var response = $("#response")

    function responseMessage(message, type = "alert alert-danger") {
        response.attr("class", type).html(message).show(1000);
    }

    function tokenValid() {
        $("#Modal").modal({
            show: true,
            keyboard: false
        });
    }

    $("#Modal").on("hidden.bs.modal", function () {
        window.location.replace(thisUrl);
    });

    function spin(spin = true) {
        var opts = {
            lines: 13 // The number of lines to draw
            , length: 5 // The length of each line
            , width: 2.5 // The line thickness
            , radius: 7.5 // The radius of the inner circle
            , scale: 1 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: '#000' // #rgb or #rrggbb or array of colors
            , opacity: 0 // Opacity of the lines
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
            , trail: 60 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '30%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
        }
        if (spin) {
            response.removeAttr("hidden");
            var target = document.getElementById('response')
            new Spinner(opts).spin(target);
        } else {
            var target = document.getElementById('response')
            new Spinner(opts).spin(target).stop;
            response.attr("hidden", "hidden");
        }
    }

    getCash.click(function() {
        spin();
        var amount = $(this).attr("amount");
        var url = baseUrl+"Debit/GetExternalRequest/"+token.val()+"/"+amount;
        $.ajax({
            type: 'get',
            url: thisUrl+"Task/TokenValid",
            dataType: "json",
            success: function(data) {
                var response = jQuery.parseJSON(data);
                if (response["status"] == "fail") {
                    tokenValid();
                } else {
                    $.ajax({
                        type: 'get',
                        url: url,
                        dataType: "json",
                        success: function(data) {
                            var response = jQuery.parseJSON(data);
                            if (response["status"] == "pass") {
                                responseMessage(response["token"], "alert alert-success")
                                $("#task").hide();
                                $("#afterTask").show();
                            } else {
                                responseMessage(response["token"]);
                            }
                        },
                        error: function() {
                            responseMessage("Server is not active. Ensure the main Abc bank server is running on http://localhost:5002")
                        },
                        xhrFields: {
                            withCredentials: true
                        }
                    });
                }
            },
            error: function() {
                responseMessage("Server is not active. Ensure the main Abc bank server is running on http://localhost:5002")
            },
            xhrFields: {
                withCredentials: true
            }
        });
    });
});
