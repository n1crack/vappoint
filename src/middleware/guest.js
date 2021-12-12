export default (to, from, next) => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access_token) {
        next({name: 'Profile'});
        return false;
    }
}
