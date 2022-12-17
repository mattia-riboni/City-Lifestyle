//setting up background from unsplash.com

let unsplashLink = 'https://api.unsplash.com/photos/random/?client_id=QKAXLrXvBuY_IbjPp0PAW7jWeWV3SHnNmc__4wOnkuY&collections=83895897';
let backgroundImg = document.getElementById('random-img');

fetch(unsplashLink)
.then((response) => response.json())
.then((jsonData) => {
  backgroundImg.src = jsonData.urls.regular;
});

  //Getting data from teleport
 
const searchBtn = document.querySelector('.search-city')
let postContainer = document.createElement('div');
let newCityName = document.createElement('h2');
let paragraph = document.createElement('p');
let cityScore = document.createElement('h4');
let cityNameId = document.getElementById('city-name')

//Makes search button active
searchBtn.addEventListener('click', function(){
  
  //teleport link widget needs words separated from '-'
  let cityName = cityNameId.value;
  let cityArray = cityName.split(' '); 
  let cityLink = cityArray.join('-').toLowerCase();
  cityArray = cityLink.split(',');
  cityLink = cityArray.join('')
  cityArray = cityLink.split('.');
  cityLink = cityArray.join('');

  if (cityName === '') {
    cityNameId.style.border = '3px solid red';
  } else {
    cityNameId.style.border = ' 1px solid green';
    cityNameId.addEventListener('focus', (e) => {
      e.target.style.border = '3px solid green'
    })
  }

  if (postContainer.classList.contains('post-container')){
    postContainer.remove(); //Removes previous research
    let newPostContainer = document.createElement('div'); //Create a new container
    postContainer = newPostContainer
  } 
    postContainer.classList.add('post-container');
    document.body.append(postContainer);
    postContainer.classList.add('post-container-active');
    download(postContainer);
    
  function download(post){
    fetch(`https://api.teleport.org/api/urban_areas/slug:${cityLink}/scores/`)
    .then((response) => response.json())
    .then((jsonData) => {
      newCityName.textContent = `${cityName}`;
      paragraph.innerHTML = jsonData.summary; 
      cityScore.innerHTML = 'City Score: ' + Math.round(10*jsonData.teleport_city_score)/10 + '/100';
      post.append(newCityName, paragraph, cityScore)

      jsonData.categories.forEach(function(category) {
        let score = category.score_out_of_10;
        let roundedScore = Math.round(10*score)/10;
        newLi = document.createElement('ul');
            
            
        if (roundedScore < 5){
          newLi.style.color = 'red';
        } else if (roundedScore > 8){
          newLi.style.color = '#62ff00';
        } else {
          newLi.style.color = 'yellow';
        }

        newLi.textContent = `${category.name}: ${roundedScore}`;
        post.append(newLi)

        window.scrollTo({
          top: 500,
          behavior: 'smooth',
        });
      });
    })
    .catch((error) => {
      newCityName.textContent = 'Not Found';
      paragraph.textContent = "This city is not in our database. Remember to use english names.";
      cityScore.textContent = '';
      cityNameId.style.border = '3px solid red';
      window.scrollTo({
        top: 200,
        behavior: 'smooth',
      });
    })
  };
});

//Let's make clear button active
let clearBtn = document.querySelector('.clear')

clearBtn.addEventListener('click',function(){
  cityNameId.style.border = ' 1px solid green';
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  setTimeout(function(){
    let cityName = document.getElementById('city-name').value = '';
    postContainer.remove();
  }, 500);
})