
// Loaading search  results
const loadBooks = () => {
    const searchField = document.getElementById('searchField');
    const searchFieldValue = searchField.value;
    if (searchFieldValue === '') {
        document.getElementById('rows').innerHTML = '';
        document.getElementById('errorMessage').innerText = 'Insert a book name to see results';
        document.getElementById('header').innerText = '';
    }
    else {
        document.getElementById('errorMessage').innerText = '';
        const url = `https://openlibrary.org/search.json?q=${searchFieldValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data))
        searchField.value = '';
        document.getElementById('rows').innerHTML = '';
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('header').innerText = '';
    }

}

// Displaying search results

const displayBooks = data => {
    //console.log(data);
    const informations = data?.docs;
    if (data.docs.length === 0) {
        document.getElementById('header').innerText = `No data found`;
    }
    else {
        const rows = document.getElementById('rows');
        rows.innerHTML = '';
        informations?.forEach(books => {
            const div = document.createElement('div');
            div.classList.add('col-lg-4', 'col-md-6', 'col-sm-12');
            div.innerHTML = ` 
             <div class="card">
            <img src="https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg" class="card-img-top mx-auto img-size" alt="...">
            <div class="card-body">
              <h5 class="card-title">Title: ${books.title}</h5>
              <p class="card-text">First Publish Year: ${books.first_publish_year}</p>
              <p class ="card-text">Author: ${books.author_name}</p> 
            </div>
          </div>
         `;

            rows.appendChild(div);
            const header = document.getElementById('header');
            header.innerText = `Showing ${informations.length} results of ${data.numFound} findings.`;

        })
    }

    document.getElementById('spinner').style.display = 'none';

}