//importing json data

import cities from "../assets/all-cities.JSON" assert {type: 'json'};

const cityList = document.getElementById('city-list');
let widgetContainer = document.createElement('div');

//creating the list of all citites available
for (let city in cities){
  const newCity = document.createElement('li');
  newCity.textContent = city;
  cityList.append(newCity);
  
  //adding click event listener on each element of the list
  newCity.addEventListener('click', function(){
    
    //teleport link widget needs words separated from '-'
    let cityArray = city.split(' '); 
    let cityLink = cityArray.join('-').toLowerCase();
    cityArray = cityLink.split(',');
    cityLink = cityArray.join('')
    cityArray = cityLink.split('.');
    cityLink = cityArray.join('');
    

    //creating the widget
    const widget = document.createElement('script');
    const goHome = document.createElement('BUTTON');
    const clear = document.createElement('BUTTON');    
    
    widgetContainer.remove() //removing previous research
    const newWidgetContainer = document.createElement('div');
    widgetContainer = newWidgetContainer;
    widget.setAttribute('class', "teleport-widget-script");
    widget.setAttribute('data-max-width', '770');
    widget.setAttribute('data-height', '958');
    widget.setAttribute('src', 'https://teleport.org/assets/firefly/widget-snippet.min.js');
    widget.setAttribute('data-url', `https://teleport.org/cities/${cityLink}/widget/scores/?currency=EUR`);
    document.body.append(widgetContainer);
    widgetContainer.classList.add('widget-container');
    widgetContainer.append(widget);

    goHome.innerHTML = 'Home';
    goHome.setAttribute('onclick', "location.href='../index.html'");
    goHome.classList.add('button', 'go-home');
    widgetContainer.append(goHome);

    clear.innerHTML = 'Clear';
    clear.classList.add('button', 'clear', 'go-home');
    widgetContainer.append(clear);

    clear.addEventListener('click', function(){
      widgetContainer.remove();
    })
    
    let scrollHeight = goHome.getBoundingClientRect().top;
    window.scrollBy({
      top : scrollHeight ,
      behavior: 'smooth',
    });
  })
};






