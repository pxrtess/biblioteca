
  var listaRetorno = document.getElementById("list-output");
  var urlLivro = `https://www.googleapis.com/books/v1/volumes?q=` ;
  var pesquisa;
  var placeHldr = "";

  //Clique no botão de pesquisa
  function pesquisar(){
    listaRetorno.innerHTML = ""; //retorna os resultados vazios em uma nova pesquisa
     pesquisa = document.getElementById('search-box').value;
     if(pesquisa === "" || pesquisa === null) {
       erroCampoVazio();
     }
    else {
      url = urlLivro + pesquisa + '&maxResults=40'
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
            displayResults(data);
        });
      }
  }
  
   function displayResults(response) {
    console.log("entrou aqui")
      for (var i = 0; i < response.items.length; i++) {
        item = response.items[i];
        if(item.volumeInfo.publisher != undefined){
        title = item.volumeInfo.title;
        author = item.volumeInfo.authors;
        publisher = item.volumeInfo.publisher;
        bookLink = item.volumeInfo.previewLink;
        bookImg = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr ;
        listaRetorno.innerHTML += ''+formatOutput(bookImg, title, author, publisher, bookLink) +'';
        console.log(listaRetorno);
        }
        
      }
   }
   function formatOutput(bookImg, title, author, publisher) {
     var card = 
    ` <div class="card">
        <div>
          <img src=${bookImg}>
        </div>
        <div>
        <h5>${title}</h5
        <p>${author}</p>
        <p>${publisher}</p>
        </div>
      </div>`
     return card;
   }

  //  //handling error for empty search box
   function erroCampoVazio() {
     alert("O campo de pesquisa não pode ser vazio!")
   }
   function erroSemResultados(){
      alert("Nenhum resultado encontrado!")
   }

