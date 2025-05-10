const form = document.getElementById('login-form');
const message = document.getElementById('message');

form.addEventListener('submit', async(e)=>{
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    try{
        const res = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({email, password})
        });

        const data = await res.json();

        if(!res.ok){
            throw new Error(data.error || 'Login failed');
        }

        if(data.token && data.role.toLowerCase() === 'admin'){
            alert(`Welcome, ${data.role}`);
            window.location.href = './admin_dashboard.html';
        }else{
            alert('Welcome, usuario');
            window.location.href = './home.html';
        }
    }catch(error){
        message.textContent = 'Login error: ' + error.message;
        message.style.color = 'red'; 
    }
});