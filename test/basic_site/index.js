var loginButton = document.getElementById("login");
var signupButton = document.getElementById("signup");

var loginForm = document.getElementById('login_form');

loginButton.addEventListener('click', function(event) {
    event.preventDefault();

    console.log('attempting login');
    
    const formData = new FormData(loginForm)
    const response = fetch('/login', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const result = response.text();
        console.log(result);
    } else {
        console.error('Error registering user');
    }

});

signupButton.addEventListener('click', async (event) => {
    event.preventDefault();

    console.log('attempting signup');

    const formData = new FormData(loginForm)
    const response = await fetch('/register', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const result = await response.text();
        console.log(result);
    } else {
        console.error('Error registering user');
    }

});