export const getPostEndpoint = (slug) => `${process.env.REACT_APP_API_URL}/post/${slug}`;

export const getCommentsEndpoint = (slug) => `${process.env.REACT_APP_API_URL}/post/${slug}/comments`;

export const addCommentEndpoint = (slug) => `${process.env.REACT_APP_API_URL}/post/${slug}/comment`;