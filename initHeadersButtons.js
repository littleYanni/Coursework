export const initHeaderButtons = (isProfile = false) => {
    document.getElementById('headerH1').addEventListener('click', (e) => {
        window.location = '../main_v2/main.html';
    });
    let profileButton = document.getElementById('profileButton');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!isProfile) {
        profileButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentUser == null) {
                window.location = '../signInAndSignUp/signInAndSignUp.html';
            } else {
                window.location = '../userProfile/userProfile.html';
            }
        });
    } else {
        profileButton.innerText = 'Выйти из аккаунта'
        profileButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location = '../signInAndSignUp/signInAndSignUp.html';


        });
    }
    document.getElementById('input-search').addEventListener('keyup', (e) => {
        if (e.keyCode === 13 && e.target.value) {
            e.preventDefault();
            console.log(e.target.value);
            window.location = `../main_v2/main.html?search=${e.target.value}`;
        }
    });
}

