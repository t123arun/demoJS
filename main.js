//CODE
console.log("-----DEMO JS-----");

//objective
document.getElementById('objective').innerHTML = "Fetch and Display API data using async/await";

//select the ul 
const dataList = document.getElementById('data-list');

//define an async function to fetch and display API data
async function fetchAndDisplayData(){
    try{    
        //fetch data from API
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        //check if the response is OK (status 200-299)
        if(!response.ok){
            throw new Error(`HTTP error! status : ${response.status}`);
        }

        //Parse the JSON data
        const data = await response.json();

        //Loop throw the data and create list items
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent =`Post ${item.id}: ${item.title}`;
            dataList.appendChild(listItem);
        });

    }catch(error){
        //Handle error
        console.error('Error fetching data: ', error);
        const errorItem = document.createElement('li');
        errorItem.classList.add('error-text');
        errorItem.textContent = "Failed to load data.";
        dataList.appendChild(errorItem);
    }
}

fetchAndDisplayData();
