function logout(){
    fetch('http://localhost:3000/users/logout', {
        method: 'POST',
        credentials: 'include'
    }).then(()=>{
        alert('Logged out');
        window.location.href = 'login.html'
    });
}