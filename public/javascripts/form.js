
$('form button').on('click', function(e) {
    e.preventDefault();

    // Based on the selected demo, fire off an ajax request
    // We expect just a string of text back from the server (keeping it simple)
    var url = '/message';
    $.ajax(url, {
        method:'POST',
        dataType:'text',
        data:{
            body:$('#body').val()
        },
    });

    $("#image").attr('src',"images/happycharlie.png");
    $("#button").html("Thanks!");
    $("#changetext").html("You cheered me up!");
});