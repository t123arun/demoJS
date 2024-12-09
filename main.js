//CODE
console.log("-----DEMO JS-----");

//objective
document.getElementById('objective-1.1').innerHTML = "Fetch and Display API data using async/await";

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

//second objective

//objective-2
document.getElementById('objective-1.2').innerHTML = "Fetching and displaying data from API that incorporates many important JS topics. like Async/Await, Fetch API , Error Handling , DOM Manipulation , Template Literals , Event Listeners , Dynamic Data Updates , Destructuring , Modules (optional)";


//select DOM elements
const dataList2 = document.getElementById('data-list-2');
const fetchDataBtn = document.getElementById('fetch-data-btn');

//define an async function to fetch and display data

const fetchAndDisplayData2 = async () => {
    try{
        //Clear an existing data
        dataList2.innerHTML = '';

        //Fetch data from the API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        //Handle non-200 response
        if(!response.ok){
            throw new Error(`HTTP error! Status : ${response.status}`);
        }

        //parse the json response
        const data2 = await response.json();

        //slice to limit the number of items displayed first 10 items
        const limitedData = data2.slice(0,10);

        limitedData.forEach(({id,title,body})=>{
            //create a card element
            const listItem2 = document.createElement('li');
            listItem2.classList.add('card');

            //use template literals for dynamic content
            listItem2.innerHTML = `<h4>ID : ${id}</h4> <p> TITLE : ${title}</p> <p>BODY : ${body}</p>`;

            //append the card to the list
            dataList2.appendChild(listItem2);
        });

    }catch(error){
        //display error message
        console.error('Error fetching data: ',error);
        const errorItem = document.createElement('li');
        errorItem.classList.add('card');
        errorItem.textContent = 'Failed to load data. Please try again.';
        dataList2.appendChild(errorItem);
    }
}

fetchDataBtn.addEventListener('click', fetchAndDisplayData2);

//objective-3
document.getElementById('objective-1.3').innerHTML = "Enhancements : PAGINATION, SEARCH BAR , LOADING INDICATOR , MODULAR CODE";

//select DOM elements
const dataList3 = document.getElementById('data-list-3');
const fetchDataBtn2 = document.getElementById('fetch-data-btn2');

//define an async function to fetch and display data

const fetchAndDisplayData3 = async () => {
    try{
        //Clear an existing data
        dataList3.innerHTML = '';

        //Fetch data from the API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        //Handle non-200 response
        if(!response.ok){
            throw new Error(`HTTP error! Status : ${response.status}`);
        }

        //parse the json response
        const data3 = await response.json();

        //slice to limit the number of items displayed first 10 items
        const limitedData = data3.slice(0,10);

        limitedData.forEach(({id,title,body})=>{
            //create a card element
            const listItem3 = document.createElement('li');
            listItem3.classList.add('card');

            //use template literals for dynamic content
            listItem3.innerHTML = `<h4>ID : ${id}</h4> <p> TITLE : ${title}</p> <p>BODY : ${body}</p>`;

            //append the card to the list
            dataList3.appendChild(listItem3);
        });

    }catch(error){
        //display error message
        console.error('Error fetching data: ',error);
        const errorItem = document.createElement('li');
        errorItem.classList.add('card');
        errorItem.textContent = 'Failed to load data. Please try again.';
        dataList2.appendChild(errorItem);
    }
}

fetchDataBtn2.addEventListener('click', fetchAndDisplayData3);