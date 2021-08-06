$(document).ready(function(){
    console.log('jQuery sourced.');
    refreshTasks();
    addClickHandlers();
  });
  
  function addClickHandlers() {
    $('#submitBtn').on('click', handleSubmit);
  
    // TODO - Add code for edit & delete buttons
    $('#taskList').on('click', '.deleteBtn', removeTask)
    $('#taskList').on('click', '.completed', updateTaskStatus)
  }
  
  function handleSubmit() {
    console.log('Submit button clicked.');
    let task = {
     priority = $('#priority').val(),
      = $('#title').val(),
    addBook(book);
  }
}
  
  // adds a book to the database
  function addBook(bookToAdd) {
    $.ajax({
      type: 'POST',
      url: '/books',
      data: bookToAdd,
      }).then(function(response) {
        console.log('Response from server.', response);
        refreshBooks();
      }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add book at this time. Please try again later.');
      });
  }
  
  function removeBook(){
    let bookId = ($(this).closest('tr').data('id'));
    $.ajax({
      type:'DELETE',
      url: `/books/${bookId}`
    }).then(function(res){
      console.log('THE DANG BOOK IS GONE!');
      refreshBooks(res);
    }).catch(function(error){
      console.log('CATASTROPHE!', error);
    });
  }
  
  function updateBookStatus(){
    
    let bookId = $(this).closest('tr').data('book').id;
    let status = $(this).closest('tr').data('book');
  
  $.ajax({
    type: 'PUT',
    url: `/books/${bookId}`,
    data: status
  }).then(function(response){
  
  refreshBooks(response);
  
  }).catch(function(error){
    console.log('CATASTROPHE!', error);
  })
  }
  
  // refreshBooks will get all books from the server and render to page
  function refreshBooks() {
    $.ajax({
      type: 'GET',
      url: '/books'
    }).then(function(response) {
      console.log(response);
      renderBooks(response);
    }).catch(function(error){
      console.log('CATASTROPHE!', error);
    });
  }
  
  // Displays an array of books to the DOM
  function renderBooks(books) {
    $('#bookShelf').empty();
  
    for(let i = 0; i < books.length; i += 1) {
      let book = books[i];
      // For each book, append a new row to our table
      $('#bookShelf').append(`
        <tr data-id=${books[i].id}>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.status}</td>
          <td><button class="deleteBtn"> Delete </button>
          <td><button class="read"> Read/Unread </button>
        </tr>
      `);
    }
  }