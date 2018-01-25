$(document).ready(function () {

    //$.getJSON('/tours', printTours);
    $('form').submit(function (e) {
        e.preventDefault();
        $.post('/tours', {name: $('#name').val(), address: $('#address').val(), desc: $('#desc').val()}, printTours);
        this.reset();
    });

});

function printTours(tours) {
    $('body>dl').empty();
    $.each(tours, function () {
        $('<dt>').text(this.name).appendTo('body>dl');
        $('<dd>').text(this.desc).appendTo('body>dl');
        $('<dd>').text(this.address).appendTo('body>dl');
    });
    $('dt').off('dblclick').dblclick(function() {
        $.ajax({
            url: '/tours/' + $(this).text(),
            type: 'DELETE',
            success: printTours
        });
    });
    $('dt').off('click').click(function(){
        $.ajax({
            url: '/tour_detail',
            type: 'GET',
            data: {"name" : $(this).text()},
            success: function(){
                console.log(`Show detail $(this).text()`);
            }
        });
    });
}