const createUser = async () => {
    const userData = {
        nombre: 'Admin14',
        email: 'Admin14@gmail.com',
        role: 'admin',
        password: 'admin1234'
    }

    try{
        console.log('Data:', userData);
        const res = await fetch('http://localhost:3000/users',{
            method: 'POST', 
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(userData)
        });

        if(!res.ok){
            const errorData = await res.json();
            throw new Error(errorData.error || 'Error while creating user');
        }

        const data = await res.json();
        return data;
    }catch(error){
        console.log('Error while creating user', error);
        throw error;
    }
};