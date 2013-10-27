
$('form button').on('click', function(e) {
    e.preventDefault();

    // Based on the selected demo, fire off an ajax request
    // We expect just a string of text back from the server (keeping it simple)
    var url = '/message';
    $.ajax(url, {
        method:'POST',
        dataType:'text',
        success: function(data) {
            showFlash(data);
        },
        error: function(jqxhr) {
            alert('There was an error sending a request to the server :(');
        }
    });

    $("#image").attr('src',"images/happycharlie.png");
    $("#button").html("Thanks!");
    $("#changetext").html("You cheered me up!");
});