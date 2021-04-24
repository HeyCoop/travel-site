
getStates();


let todotable = document.getElementById('testTableList');
let draggingElement;

todotable.addEventListener("dragstart", onDragStart, false);
todotable.addEventListener("drop", onDrop, false);
todotable.addEventListener("dragover", onDragover, false);

function onDragStart(event) {
    //console.log(event);
    draggingElement = event.target;
}

function onDrop(event) {
    console.log(event.target);
    if (event.target.matches("table"))
        return;

    let beforeTarget = event.target;

    while (!beforeTarget.matches("tr"))
        beforeTarget = beforeTarget.parentNode;

    if (beforeTarget.matches(":first-child"))
        return;

    todotable.insertBefore(draggingElement, beforeTarget);

}

function onDragover(event) {
    event.preventDefault();
    //console.log(event.target);
}





function getStates() {

    var myInfo = $.ajax({
        type: 'GET',
        url: 'data/states.json',
        datatype: 'json'

    });

    myInfo.done(function (response) {

        $('#testTableList tbody').html('');

        if (response.length) {

            $.each(response, function (i, item) {
                $('#testTableList tbody').append('<tr draggable=true data-id="' + item.StateId + '">'
                    + '<td>' + item.StateId + '</td>'
                    + '<td>' + item.StateCd + '</td>'
                    + '<td>' + item.StateNm + '</td>'
                    + '</tr>')
            });
        }

        myInfo.fail(function (secureResponse, requestStatus) {
            console.log("Request failed" + requestStatus);
        });

    });
}