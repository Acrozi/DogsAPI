document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getAllDogsBtn').addEventListener('click', getAllDogs);
    document.getElementById('addDogBtn').addEventListener('click', addDog);
    document.getElementById('deleteDogBtn').addEventListener('click', deleteDog);
});

function getAllDogs() {
    fetch('http://dogsapi-env.eba-bnzwkjrp.eu-north-1.elasticbeanstalk.com/api/dogs')
        .then(response => response.json())
        .then(data => {
            const dogList = data.map(dog => `<p>ID: ${dog.id}, Name: ${dog.name}, Age: ${dog.age}</p>`).join('');
            document.getElementById('allDogs').innerHTML = dogList;
        })
        .catch(error => console.error('Error fetching dogs:', error));
}

function addDog() {
    const dogName = document.getElementById('dogName').value;
    const dogAge = document.getElementById('dogAge').value;
    const newDog = { name: dogName, age: dogAge };

    fetch('http://dogsapi-env.eba-bnzwkjrp.eu-north-1.elasticbeanstalk.com/api/dogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDog)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Dog added:', data);
        getAllDogs(); // Uppdatera listan med hundar
    })
    .catch(error => console.error('Error adding dog:', error));
}

function deleteDog() {
    const dogId = document.getElementById('deleteDogId').value;

    fetch(`http://dogsapi-env.eba-bnzwkjrp.eu-north-1.elasticbeanstalk.com/api/dogs/${dogId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log(`Dog with ID ${dogId} deleted successfully`);
            getAllDogs(); // Uppdatera listan med hundar
        } else {
            console.error('Failed to delete dog');
        }
    })
    .catch(error => console.error('Error deleting dog:', error));
}
