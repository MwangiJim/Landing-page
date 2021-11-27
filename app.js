let time = document.querySelector('.time');
let InputValue = document.querySelector('.user-type input');
let InputKey = document.querySelector('#InputKey');
let nameholder = document.querySelector('#nameholder');
let UserContent = document.querySelector('.user-content');

let count = setInterval(updatetimer,1000);

function updatetimer(){
    let a = new Date();
    let b = a.toLocaleTimeString();
    time.innerHTML = b;
}

InputValue.addEventListener('keyup',(event)=>{
   if(event.key == "Enter"){
       displayTask();
       InputKey.style.opacity = 0;
       InputValue.style.opacity = 0;
   }
})
function displayTask(){
    const key = InputKey.value;
    const value = InputValue.value;

    console.log(key,value);
    if(key&&value){
        localStorage.setItem(key,value);
    }

    for(let i=0;i<localStorage.length;i++){
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

      nameholder.innerHTML = `<span>${key}</span>`;
      UserContent.innerHTML = '<li>'+value+'</li>';
    }
}

let weather = {
    apiKey:"c7686ab0dff66d8e68735a9f78856cd1",
    fetchWeather:function(city){
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid='+this.apiKey)
        .then((response)=>response.json())
        .then((data)=>this.displayWeather(data));
    },
    displayWeather:function(data){
        const{name} = data;
        const {temp,humidity} = data.main;
        const{icon,description} = data.weather[0];
        const{speed} = data.wind;
        console.log(name,temp,icon,humidity,description,speed);

        document.querySelector('.city').innerHTML = `Weather in ${name}`;
        document.querySelector('.temp').innerHTML = `${temp}°C`;
        document.querySelector('.humidity').innerHTML = `Humidity:${humidity}%`;
        document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/'+icon+'.png';
        document.querySelector('.description').innerHTML = `${description}`;
        document.querySelector('.speed').innerHTML = `Wind Speed:${speed}`;
    },
    search:function(){
        this.fetchWeather(document.querySelector('#searchinput').value);
    },
};

document.querySelector('button').addEventListener('click',function(){
    weather.search();
});
document.querySelector('#searchinput').addEventListener('keyup',(event)=>{
   if(event.key == 'Enter'){
       weather.search();
   }
})