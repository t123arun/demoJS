
const API_URL = 'http://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async(page = 1, limit = 10, search = '') => {
    try{
        const url = `${API_URL}?_page=${page}&_limit=${limit}&q=${search}`;
        const response = await fetch(url);

        if(!response.ok) throw new Error(`Failed to fetch data : ${response.status}`);

        return await response.json();

    }catch(error){
        console.error(error);
        throw error;
    }
};

export const createPost = async(title, body) => {
    try{
        const response = await fetch(API_URL, {
            method: 'POST',
            headers : { 'Content-Type ' : 'application/json' },
            body : JSON.stringify({title,body}),
        });

        if(!response.ok) throw new Error('Failed to create post');

        return await response.json();

    }catch(error){
        console.error(error);
        throw error;
    }
};

export const deletePost = async (id) => {
    try{
        const response = await fetch (`${API_URL}/${id}`,{ method : 'DELETE'} );

        if(!response.ok) throw new Error('Failed to delete post.');
        return id; // DELETED POST ID FROM DOM UPDATES
    }catch(error){
        console.error(error);
        throw error;
    }
}