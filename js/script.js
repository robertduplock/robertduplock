
$("#emailButton").on("click", function(){
    var formData = {
        funct: "mail",
        name: $("#name").val().replace(/[\*\^\'\!\<\>]/g, '').split(' ').join('-'),
        email: $("#email").val(),
        message: $("#message").val().replace(/[\*\^\'\!\<\>]/g, '').split(' ').join('-'),
    };
    errorMsg = "";
    if (!formData.name) {
        errorMsg += "Please fill in your name.<br/>";
    }
    if (!formData.email) {
        errorMsg += "Please enter an email address.<br/>";
    }
    if (!isValidEmailAddress(formData.email)) {
        errorMsg += "Please enter a valid email address.<br/>";
    }
    if (!formData.message) {
        errorMsg += "Please enter a message.<br/>";
    }
    if (errorMsg) {
        showModal("Sorry, the system can't send an email without a few adjustments...", errorMsg);
        return;
    } else {
        $.ajax({
            method: "POST",
            data: formData,
            url: "api/ajax.php"
            }).done(function( msg ) {                    
                setTimeout(function(){
                    $(".form-field").val('');
                   showModal("Success!", "Your email has been sent. Thanks!");                   
                }, 500);                    
            });
    }
});

$(".private").on('click', function(e){
    e.preventDefault();
    var msg = "Sorry, this is a private commercial project, so I can't link directly to it.<br/>" +
               "However, I can demonstrate it in person, or by special request.";
    showModal("Private.", msg)
});

function showModal(title, body) {
    var modal = $("#messageModal");
    modal.find("#messageModalTitle").text(title);
    modal.find("#messageModalBody").html(body);
    modal.modal("show");
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};