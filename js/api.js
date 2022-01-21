const guestToken = 'c52d27a6b6608a64250ca46a75e29a861c3f037e';

function isLogin(){
    return localStorage.getItem('token') !== '' && localStorage.getItem('token') !== guestToken;
}

function changeButton(){
    if (isLogin())
        document.getElementById('login_button').innerHTML = 'logout';
}


function logout(pageName){
    localStorage.setItem('token', '');
    window.location.replace(pageName);
}

async function registerAPI() {
    document.getElementById('email_err').innerHTML = '';
    document.getElementById('username_err').innerHTML = '';
    document.getElementById('firstName_err').innerHTML = '';
    document.getElementById('lastName_err').innerHTML = '';
    document.getElementById('password_err').innerHTML = '';

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (firstName === '')
        document.getElementById('firstName_err').innerHTML = 'This field can\'t be empty';
    if (lastName === '')
        document.getElementById('lastName_err').innerHTML = 'This field can\'t be empty';
    if (username === '')
        document.getElementById('username_err').innerHTML = 'This field can\'t be empty';
    if (email === '')
        document.getElementById('email_err').innerHTML = 'This field can\'t be empty';
    if (password === '')
        document.getElementById('password_err').innerHTML = 'This field can\'t be empty';
    else if (password.length < 6)
        document.getElementById('password_err').innerHTML = 'Password length should be more than 6 character';
    if (password !== document.getElementById('re_password').value)
        document.getElementById('password_err').innerHTML = 'Password and Confirm password should be matched';
    if (firstName !=='' && lastName !=='' && username !=='' && email !=='' && password !==''){
        let myBody = {
            "firstName": firstName,
            "lastName": lastName,
            "username": username,
            "email": email,
            "password": password,
            // "userCategory": "Economics"
        };

        let statusCode;
        const response = await fetch(/*'https://news-websitex.herokuapp.com/api/user'*/'http://127.0.0.1:8000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myBody),
        })
            .then(function (res) {
                    statusCode = res.status;
                    return res.json();
                }
            )
            .then(data => {
                console.log('success: ', data);
                console.log(statusCode.toString());
                if (statusCode === 400)
                    document.getElementById('email_err').innerHTML = data['error'];
                if (statusCode === 401)
                    document.getElementById('username_err').innerHTML = data['error'];
                if (statusCode === 201)
                    window.location.replace("login.html");
            });
    }
    // const myJson = await response.json();
    // console.log(myJson)
}

async function loginAPI() {
    document.getElementById('login_username_err').innerHTML = '';
    document.getElementById('login_password_err').innerHTML = '';

    const username = document.getElementById('login_username').value;
    const password = document.getElementById('login_password').value;

    if (username === '')
        document.getElementById('login_username_err').innerHTML = 'This field can\'t be empty';
    if (password === '')
        document.getElementById('login_password_err').innerHTML = 'This field can\'t be empty';
    else if (password.length < 6)
        document.getElementById('login_password_err').innerHTML = 'Password length should be more than 6 character';

    if (username !=='' && password !==''){
        let myBody = {
            "username": username,
            "password": password,
            // "userCategory": "Economics"
        };

        let statusCode;
        const response = await fetch(/*'https://news-websitex.herokuapp.com/api/user'*/'http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myBody),
        })
            .then(function (res) {
                    statusCode = res.status;
                    return res.json();
                }
            )
            .then(data => {
                console.log('success: ', data);
                console.log(statusCode.toString());
                if (statusCode === 400)
                    document.getElementById('email_err').innerHTML = data['error'];
                if (statusCode === 201){
                    localStorage.setItem('token', data['token']);
                    document.cookie = "username="+data['username'];
                    document.cookie = "uid="+data['uid'];
                    document.cookie = "category="+data['category'];
                    window.location.replace("index.html");
                }
                console.log(localStorage.getItem('token'));
                // if (statusCode === 401)
                //     document.getElementById('username_err').innerHTML = data['error']
            });
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function categoryColor(category) {

    switch (category) {
        case 'Politics': return "#526a6d";
        case 'Health': return "#5effa8";
        case 'Economics': return "#d0f";
        case 'Sport': return "#073036";
        case '،Technology': return "#7e4e52";
    }
}




