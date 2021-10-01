

function afterHours(afterHours) {
    let body = $('body');
    if (afterHours) {
        body.addClass('afterhours');
    } else {
        body.removeClass();
    }
}