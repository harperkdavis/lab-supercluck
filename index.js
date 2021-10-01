
let tickNumber = 0;

let members = [
    {
        "name" : "Harper Davis",
        "time" : 1633102381585
    },
    {
        "name" : "Nathan Chen",
        "time" : 1633101381200
    }
];
let memberBoxes = {};

function tick() {
    if (tickNumber % 3000 == 0) { // bus fetches

    }
    if (tickNumber % 1000 == 0) { // api fetches
        loadMembers();
    }
    if (tickNumber % 100 == 0) { // text updates
        let today = new Date();
        let clockTime = hourFormat(today.getHours()) + ":" + digits(today.getMinutes(), 2) + ":" + digits(today.getSeconds(), 2) + " ";

        $("#cluck-clock").text(clockTime + (today.getHours() >= 12 ? "PM" : "AM"));
        if (today.getHours() < 14) {
            afterHours(true, true);

            let openTime = new Date();
            openTime.setHours(14);
            openTime.setMinutes(0);
            openTime.setSeconds(0);
            openTime.setMilliseconds(0);

            let minutesUntilOpen = Math.ceil(Math.abs(openTime - today) / (1000 * 60));;

            $("#cluck-countdown").text("The lab will open in " + minutesUntilOpen + " minutes");
        } else if (today.getHours() >= 18) {
            afterHours(true, false);

            let openTime = new Date();
            openTime.setHours(23);
            openTime.setMinutes(59);
            openTime.setSeconds(59);
            openTime.setMilliseconds(999);

            let minutesUntilOpen = Math.ceil(Math.abs(openTime - today) / (1000 * 60)) + 840;

            $("#cluck-countdown").text("The lab will open in " + minutesUntilOpen + " minutes");
        } else {
            afterHours(false, false);

            let closeTime = new Date();
            closeTime.setHours(18);
            closeTime.setMinutes(0);
            closeTime.setSeconds(0);
            closeTime.setMilliseconds(0);

            let minutesUntilOpen = Math.ceil(Math.abs(closeTime - today) / (1000 * 60));

            $("#cluck-countdown").text("The lab will close in " + minutesUntilOpen + " minutes");
        }
    }
    memberBoxes.forEach(box => {
        let time = Date.now() - box['time'];
        let timeString = Math.floor(time / (1000 * 60 * 60)) + ':' + digits(Math.floor(time / (1000 * 60)) % 60, 2) + ':' + digits(Math.floor(time / 1000) % 60, 2) + '.' + digits(time % 1000, 3);
        box['box'].find('.team-member-time').text(timeString);
    });

    

    tickNumber++;
}

async function loadMembers() {
    /*
    await fetch('logged-test.json')
        .then(response => response.json())
            .then(json => members = json);
            */
    let memList = $('#cluck-members');
    memList.empty();
    memberBoxes = [];
    
    members.forEach(member => {
        let box = {};

        let time = Date.now() - member['time'];

        let memberDiv = $('<div class="team-member">');
        let memberImg = memberDiv.append('<img src="profile_picture.png" class="team-member-picture"></img>');
        let infoDiv = memberDiv.append('<div class="team-member-info">');
        let nameLabel = infoDiv.append('<h2 class="team-member-label">' + member['name'] + '</h2>');

        let timeString = Math.floor(time / (1000 * 60 * 60)) + ':' + digits(Math.floor(time / (1000 * 60)) % 60, 2) + ':' + digits(Math.floor(time / 1000) % 60, 2) + '.' + digits(time % 1000, 3);
        let timeLabel = infoDiv.append('<h2 class="team-member-time">' + timeString + '</h2>');

        member['time'];

        box['box'] = memberDiv;
        box['name'] = member['name'];
        box['time'] = member['time'];
        box['timeLabel'] = timeLabel;

        infoDiv.append('</div>');
        memberDiv.append('</div>');

        memList.append(memberDiv);
        memberBoxes.push(box);
    });
}

function afterHours(afterHours, morning) {
    if (afterHours) {
        if (!$('body').hasClass('afterhours')) {
            $('body').addClass('afterhours');
            if (morning) {
                $('#logged-label').text("Keep Waiting");
            } else {
                $('#logged-label').text("Poor Souls");
            }
        }
    } else {
        if ($('body').hasClass('afterhours')) {
            $('body').removeClass('afterhours');
            $('#logged-label').text("Logged In");
        }
    }
}

function hourFormat(hours) {
    if (hours % 12 == 0) {
        return '12';
    } else {
        return digits(hours % 12, 2);
    }
}

function digits(number, digits) {
    return number.toLocaleString('en-US', {
        minimumIntegerDigits: digits,
        useGrouping: false
    });
}

function start() {
    setInterval(tick, 10);
}

start();