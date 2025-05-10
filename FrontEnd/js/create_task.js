const form = document.getElementById('taskForm');
const message = document.getElementById('message');

form.addEventListener('submit', async(e) =>{
    e.preventDefault();

    const taskData = {
        title: form.title.value.trim(),
        description: form.description.value.trim(),
        dueDate: form.dueDate.value
    };

    try{
        const res = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(taskData)
        });

        const data = await res.json();

        if(!res.ok){
            throw new Error(data.error || 'Failed to create task');
        }

        message.textContent = 'Task created succesfully';
        message.style.color = 'green';
        form.reset();
    }catch(error){
        message.textContent = error.message;
        message.style.color = 'red';
    }
});

const homeButton = document.getElementById('btn-goHome');
homeButton.addEventListener('click', () =>{
    window.location.href = 'home.html';
});