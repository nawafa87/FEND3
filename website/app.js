// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear();

/* Global Variables */
let api_url = "http://api.openweathermap.org/data/2.5/weather?zip=&appid=5364b14d1ccdd95d733311f7ef39f902";

document.getElementById('generate').addEventListener('click',performAction);

function performAction(e)
{
    const zip = document.getElementById('zip').value;
    const userText = document.getElementById('feelings').value;
    if(zip == ''){ 
    alert("You Should Enter Zipcode!");
       
     }
    else{
         api_url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=5364b14d1ccdd95d733311f7ef39f902`;  
        getData(api_url)
        .then(function(data){
        postData('/add', {Temp:data.main.temp, Date:newDate, Feeling:userText})
        updateUI();
    })
    
    }
}
    
    
       

const getData = async(api_url)=>{
    const res = await fetch(api_url)
    try{
        const data = await res.json()
        return data;
    }
    catch(error){
        console.log("error",error);
    }
    
}

const postData = async(url = '' , data = {})=>{
    const response = await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data),   
    });

    try{    
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error){
        console.log("error",error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('temp').innerHTML =`Temp : ${allData[allData.length-1].Temp}`;
      document.getElementById('date').innerHTML = `Date : ${allData[allData.length-1].Date}`;
      document.getElementById('content').innerHTML = `Content : ${allData[allData.length-1].Feeling}`;
  
    }catch(error){
      console.log("error", error);
    }
  }
   
