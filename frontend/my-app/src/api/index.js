import axios from "axios";

// const url = "http://localhost:5000/post";
// const API = axios.create({ baseURL: "https://duromemoryapplication.herokuapp.com/" })
const API = axios.create({ baseURL: "http://localhost:4000" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
})

export const fetchPost = (id) => API.get(`/post/${id}`) 
export const fetchPosts = (page) => API.get(`/post?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery.search || "none"}&&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post("/post/createPost", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const likePost = (id) => API.patch(`/post/${id}/likePost`);
export const comment = (value,id) => API.post(`/post/${id}/commentPost`, { value });


export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
