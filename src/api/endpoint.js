const API_URL = process.env.REACT_APP_API_URL;// Use '' for relative paths (assuming same-origin or proxy setup). Alternatively, 'http://localhost:4000' for development.

export const getPostEndpoint = (slug) => `${API_URL}/post/${slug}`;

export const getCommentsEndpoint = (slug) => `${API_URL}/post/${slug}/comments`;

export const addCommentEndpoint = (slug) => `${API_URL}/post/${slug}/comment`;