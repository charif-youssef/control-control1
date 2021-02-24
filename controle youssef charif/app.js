// const email = document.getElementById('')
const email = document.querySelector('.Email');
const pass = document.querySelector('.pass');
const vile = document.querySelector('.vile');
const re_ = document.querySelector('.re_');
const Error_conatiner = document.querySelector('.Error_conatiner');
const regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z]+.[a-zA-Z]+/;
const regex_pass = /^[0-9]{2}\S{6,}/;
var _email, _pass, _filer, __vile;

function send() {
    request_.open('GET', 'http://localhost:81/tp/isertDataBase.php?email=' + _email + '&pass=' + _pass + '&file=' + _filer + '&vile=' + __vile);
    request_.send();
}
var request_ = new XMLHttpRequest();
request_.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        try {
            re_.innerHTML = `<p>` +
                this.responseText +
                `</p>`
        } catch (error) {
            console.error(error);
        }
    }
}


function tester() {
    if (regex.test(email.value)) {
        console.log('tested true');
        _email = email.value;
        return true;
    } else {
        console.log('false');
        return false;
    }
}

function pass_test() {
    if (regex_pass.test(pass.value)) {
        console.log('pass true');
        _pass = pass.value;
        return true;
    } else {
        console.log(' pass false');
        return false;
    }
}

function vile_checker() {
    var selectedValue = vile.options[vile.selectedIndex].value;
    if (selectedValue == '') {
        return false;
    }
    __vile = selectedValue;
    return true
}

function check_valide() {
    var items = document.querySelectorAll('input[name=fl]:checked');
    var nCheck = items.length;
    console.log(nCheck);
    if (nCheck >= 1) {
        console.log(items[0].value);
        _filer = items[0].value;
        return true;
    }
    return false;
}

function valide() {
    var vile__ = vile_checker();
    var email_check = tester();
    var pass_check = pass_test();
    var check = check_valide();

    if (!email_check) {
        Error_conatiner.innerHTML = '<span>email error</span>';
        animateDiv();
    }
    if (!pass_check) {
        Error_conatiner.innerHTML += '<span>Pass error</span>';
        animateDiv();
    }
    if (!check) {
        Error_conatiner.innerHTML += '<span>Fil error</span>';
        animateDiv();
    }
    if (!vile__) {
        Error_conatiner.innerHTML += '<span>please selecet a city</span>';
        animateDiv();
    }
    if (!check && !email_check && !pass_check && !vile__) {
        Error_conatiner.innerHTML = '<span> none is </span>';
        animateDiv();

        return false;
    } else {
        return true;
    }
    console.log(email_check + ' ' + pass_check + ' ' + check + ' ' + vile__);
}

function animateDiv() {
    $('.Error_conatiner').animate({ left: '-=5px' }, 100).animate({ left: '+=5px' }, 100)
        //    Error_conatiner.classList.add('active');
}

function send_tester() {
    if (valide()) {
        send();
    }
}