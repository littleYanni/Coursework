setInterval(() => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let profileButton = document.getElementById('profileButton');
    if (currentUser == null) {
        profileButton.text = 'Логин';
        window.location = '../signInAndSignUp/signInAndSignUp.html';
    } else {
        if (!window.location.href.includes('/userProfile/userProfile.html'))
            profileButton.textContent = currentUser['name'];
    }
}, 100);
