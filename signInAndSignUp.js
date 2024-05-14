const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});


document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    if (data && data['email']) {
        let users = JSON.parse(localStorage.getItem('Users'));
        if (users[data['email']] != null)
            alert("уже существует");
        else
            data['watched'] = {};
            data['watch'] = {};
            data['stopWatched'] = {};
            localStorage.setItem('Users', JSON.stringify(Object.assign({}, users, {[data['email']]: data})));
    } else
        alert("неправильные данные");
    e.target.reset();
});


document.getElementById('signInForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    if (data && data['email']) {
        let users = JSON.parse(localStorage.getItem('Users'));
        if (users[data['email']] != null) {
            let user = users[data['email']];
            if (user['password'] === data['password']) {
                localStorage.setItem('currentUser', JSON.stringify(users[data['email']]));
                window.location = '../main_v2/main.html';
            } else
                alert("неправильный пароль");
        } else
            alert("нет такого юзера");
    } else
        alert("неправильные данные");
    e.target.reset();
});
