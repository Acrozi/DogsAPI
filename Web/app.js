document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:5053/api/dogs';

    // Funktion för att hämta alla hundar
    async function getAllDogs() {
        try {
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            // Visa hundarna på webbsidan
            displayDogs(data);
        } catch (error) {
            console.error('Error fetching dogs:', error.message);
        }
    }

    // Funktion för att visa hundar på webbsidan
    function displayDogs(dogs) {
        const dogList = document.createElement('ul');

        dogs.forEach(dog => {
            const listItem = document.createElement('li');
            listItem.textContent = `${dog.name}, Age: ${dog.age}`;
            dogList.appendChild(listItem);
        });

        document.body.appendChild(dogList);
    }

    // Hämta alla hundar vid sidans laddning
    getAllDogs();
});
