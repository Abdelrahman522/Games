var nav = document.querySelectorAll(".nav-link")
let cuurcat = document.querySelector(".active").id


function addActive(index) {
   nav[index].addEventListener('click', function () {
      document.querySelector('.active').classList.remove('active')
      this.classList.add('active')

   })
}

for (let index = 0; index < nav.length; index++) {
   nav[index].addEventListener('click', function () {
      let category = this.id
      getGames(category)
   })
   addActive(index)
}

async function getGames(category) {
   const options = {
      method: 'GET',
      headers: {
         'x-rapidapi-key': '1be20e14cemshf315c2cb014fe86p12ba42jsnc3a8255d8b9c',
         'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
   };


   const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
   const response = await api.json();
   console.log(response);
   displayGames(response)

}



getGames(cuurcat)






function displayGames(response) {
   let gamesBox = ``;
   for (let i = 0; i < response.length; i++) {
      gamesBox += `
           <div class="col-md-3">
           <div id="${response[i].id}"  class="card h-100 bg-transparent" role="button" ">
              <div  class="card-body">
                 <figure class="position-relative">
                    <img class="card-img-top object-fit-cover h-100" src="${response[i].thumbnail}" />
                 
                 </figure>
     
                 <figcaption>
     
                    <div class="hstack justify-content-between">
                       <h3 class="h6 small text-white">${response[i].title}</h3>
                       <span class="badge text-bg-primary p-2">Free</span>
                    </div>
     
                    <p class="card-text small text-center opacity-50">
                       ${response[i].short_description.split(" ", 8)}
                    </p>
     
                 </figcaption>
              </div>
     
              <footer class="card-footer small hstack justify-content-between">
     
                 <span class="badge badge-color">${response[i].genre}</span>
                 <span class="badge badge-color">${response[i].platform}</span>
     
              </footer>
           </div>
        </div>
           `;
   }
   document.querySelector('.row').innerHTML = gamesBox
   let cards = document.querySelectorAll(".card")
   for (let index = 0; index < cards.length; index++) {
      cards[index].addEventListener('click', function () {
         var attr = this.getAttribute("id")
         getDetails(attr)
      })
   }

}
async function getDetails(attr) {
   const options = {
      method: 'GET',
      headers: {
         'x-rapidapi-key': '1be20e14cemshf315c2cb014fe86p12ba42jsnc3a8255d8b9c',
         'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
   };
   const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${attr}`, options)
   const gameDetails = await api.json()
   console.log(gameDetails);
   displayDetails(gameDetails)
}
function displayDetails(gameDetails) {
   let detailsBox = ``
   for (let index = 0; index < gameDetails.length; index++) {

      detailsBox += ` <div class="col-md-4">
                        <div class="gameImg">
                          <img src="thumbnail.jpg"  class="w-100" alt="">
                        </div>
                      </div>
<div class="col-md-8">
   <ul>
       <li>
           title:${gameDetails[index].title}
       </li>
       <li>
           Category:${gameDetails[index].genre}
       </li>
       <li>
           Platform:${gameDetails[index].platform}
       </li>
       <li>
           Status:${gameDetails[index].status}
       </li>
   </ul>
          <p>
          ${gameDetails[index].description}
          </p>
       <button class="btn btn-primary">Show Game</button>
</div>`
   }

   document.querySelector('.row2').innerHTML = detailsBox



}









