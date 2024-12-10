
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

//importing app file from js folder

//objective-4
document.getElementById('objective-1.4').innerHTML = "Advanced API CRUD with Lazy Loading";

const dataList4 = document.getElementById('data-list-4');
const loadMoreBtn = document.getElementById('load-more-btn');
const addPostBtn = document.getElementById('add-post-btn');

let currentPage = 1; // track the current page for lazy loading
const pageSize = 10; // number of posts to load per page

const newAPI_URL = 'https://jsonplaceholder.typicode.com/posts';

//function to fetch data with lazy loading
const fetchDataWithLazyLoading = async (page, size) => {
    try{
        const response = await fetch(`${newAPI_URL}?_page=${page}&_limit=${size}`);

        if(!response.ok) throw new Error(`Failed to fetch data : ${response.status}`)
            return await response.json();

    }catch(error){
        console.error(error);
        return[];
    }
};

//function to create a post
const createPost = async(title, body) => {
    try{
        const response = await fetch(newAPI_URL, {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({title,body})
        });
        if(!response.ok) throw new Error('Failed to create post');
        const newPost = await response.json();
        //add new post to dom
        appendPost(newPost);
    }catch(error){
        console.error(error);
    }
};

//append a single post to the dom

const appendPost = ({id, title, body}) => {
    const listItem = document.createElement('li');
    listItem.classList.add('card');
    listItem.setAttribute('data-id', id);
    listItem.innerHTML = `
        <div>
            <h4>${title}</h4>
            <p>${body}</p>
        </div>
        <div>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    dataList4.appendChild(listItem);
}

//function to update a post

const updatePost = async (id, title, body) => {
    try{
        const response = await fetch(`${newAPI_URL}/${id}`, {
            method : 'PUT',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({ title, body })
        });
        if(!response.ok) throw new Error('Failed to update post');
        const updatedPost = await response.json();
        updatePostInDOM(updatedPost); // update post in the DOM
    }catch(error){
        console.error(error);
    }
};

//update a post in the dom

const updatePostInDOM = ({id, title, body}) => {
    const postItem = document.querySelector(`[data-id = "${id}"]`);

    if(postItem){
        postItem.querySelector('h4').textContent = title;
        postItem.querySelector('p').textContent = body;
    }
};


//function to delete a post

const deletePost = async (id) => {
    try{
        const response = await fetch(`${newAPI_URL}/${id}`, {method : 'DELETE'});
        if(!response.ok) throw new Error('Failed to delete post');
        removePostFromDOM(id);
    }catch(error){
        console.error(error);
    }
};

//remove post from the DOM

const removePostFromDOM = (id) => {
    const postItem = document.querySelector(`[data-id= "${id}"]`);
    if(postItem) postItem.remove();
};

//load more post lazy loading

const loadMorePosts = async () => {
    const posts = await fetchDataWithLazyLoading(currentPage, pageSize);
    posts.forEach(appendPost);
    currentPage++;
};


// event delegation for edit and delete actions

dataList4.addEventListener('click', (event) => {
    const postId = event.target.closest('.card')?.getAttribute('data-id');
    if(!postId) return;

    if(event.target.classList.contains('delete-btn')){
        deletePost(postId);
    }else if (event.target.classList.contains('edit-btn')){
        const newTitle = prompt('Enter new title : ');
        const newBody = prompt('Enter new body :');
        if(newTitle && newBody){
            updatePost(postId, newTitle, newBody)
        }
    }
});



//add new post
addPostBtn.addEventListener('click', ()=>{
    const title = prompt('Enter post title: ');
    const body = prompt('Enter post body: ');
    if(title && body) createPost(title, body);
});


//initial lazy load
loadMoreBtn.addEventListener('click', loadMorePosts);
loadMorePosts(); // load first page on startup