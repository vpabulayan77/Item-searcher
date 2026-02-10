//populate cards
fetch('book.json')
    .then(response => response.json())
    .then(data => {
        const cardContainer = document.getElementById('cards');
        data.forEach(book => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.published_year}</p>
                <p>${book.genre}</p>
            `;
            cardContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching book data:', error));

//search functionality 
function searchBooks() {
    const query = document.getElementById('search').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const author = card.querySelector('p').textContent.toLowerCase();
        const publishedYear = card.querySelectorAll('p')[1].textContent.toLowerCase();
        const genre = card.querySelectorAll('p')[2].textContent.toLowerCase();
        
        if (title.includes(query) || author.includes(query) || publishedYear.includes(query) || genre.includes(query)) {
            card.style.display = '';
        }
        //show no results message if no cards match the search query
        else {
            card.style.display = 'none';
            const noResultsMessage = document.getElementById('noResultsMessage');
            if (!noResultsMessage) {
                const message = document.createElement('p');
                message.id = 'noResultsMessage';
                message.textContent = 'No results found.';
                message.style.color = 'red';
                card.parentNode.appendChild(message);
            }
        }
    });
}

document.getElementById('searchButton').addEventListener('click', searchBooks);
document.getElementById('search').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('searchButton').click();
        }
    });

