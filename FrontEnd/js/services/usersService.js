export async function createUser(dataUser){
    try {
        const res = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dataUser),
            credentials: "include"
        });

        if(!res.ok){
            const errorData = await res.json();
            console.error('Error in response:', errorData);
            throw new Error(errorData.error);
        }

        const data = await res.json();
        return data;
    }catch(error){
        console.error('Error while creating user', error.message)
        throw error;
    }
}