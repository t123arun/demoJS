const dataList = document.getElementById('data-list-3');
const loadingIndicator = document.getElementById('loading-indicator');

// show loading indicator
export const showLoading = () => {
    loadingIndicator.style.display ='block';
}

// hide loadingIndicator
export const hideLoading = () => {
    loadingIndicator.style.display = 'none';
};

//render post to the DOM

export const renderPosts = (posts) => {
    dataList.innerHTML = ''; //clear existing posts

    posts.forEach(({id, title, body})=>{
        const listItem = document.createElement('li');
        listItem.classList.add('card');
        listItem.setAttribute('data-id', id);
        listItem.innerHTML = `
            <div>
                <h4>TITLE : ${title}</h4>
                <p>BODY : ${body}</p>
            </div>
            <div>
                <button class = "delete-btn">DELETE</button>
            </div>
        `;
        dataList.appendChild(listItem);
    });
};

//remove post from the dom

export const removePostFromDOM = (id) => {
    const postItem = document.querySelector(`[data-id = "${id}"]`);
    if(postItem) postItem.remove();
};
