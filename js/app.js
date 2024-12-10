import { deletePost, fetchPosts } from "./api.js";
import { hideLoading, removePostFromDOM, renderPosts, showLoading } from "./ui.js";

console.log("----- App file Included -----")


let currentPage = 1; // pagination state
const pageSize = 10;
let currrentSearch = ''; // search state

const fetchDataBtn2 = document.getElementById('fetch-data-btn2');
const searchInput = document.getElementById('search-input');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

//fetch and display posts with current pagination and search state

const loadPosts = async() => {
    showLoading();
    try{
        const posts = await fetchPosts(currentPage, pageSize, currrentSearch);
        renderPosts(posts);
    }catch(error){
        console.error('Error loading posts : ', error);
    }finally{
        hideLoading();
    }
};

//Handle search input 
searchInput.addEventListener('input', async(event) => {
    currrentSearch = event.target.value;
    currentPage = 1; // reset to first page
    await loadPosts();
});

//pagination previous button
prevBtn.addEventListener('click', async() => {
    if(currentPage > 1) {
        currentPage--;
        await loadPosts();
    }
});

//pagination next button
nextBtn.addEventListener('click', async () => {
    currentPage++;
    await loadPosts();
});

//handle post deletion
document.getElementById('data-list-3').addEventListener('click', async (event) => {
    if(event.target.classList.contains('delete-btn')){
        const postId = event.target.closest('.card').getAttribute('data-id');
        try{
            await deletePost(postId);
            removePostFromDOM(postId);
        }catch(error){
            console.error('Error deleting post: ', error);
        }
    }
});

//load initial posts
fetchDataBtn2.addEventListener('click', loadPosts);