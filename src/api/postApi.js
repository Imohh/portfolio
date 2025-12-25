// api/postsApi.js
import {
  getPostEndpoint,
  getCommentsEndpoint,
  addCommentEndpoint,
} from './endpoint';

export const fetchPost = async (slug) => {
  const response = await fetch(getPostEndpoint(slug));
  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.statusText}`);
  }
  return response.json();
};

export const fetchComments = async (slug) => {
  const response = await fetch(getCommentsEndpoint(slug));
  if (!response.ok) {
    throw new Error(`Failed to fetch comments: ${response.statusText}`);
  }
  return response.json();
};

export const postComment = async (slug, commentData) => {
  const response = await fetch(addCommentEndpoint(slug), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(commentData),
  });
  if (!response.ok) {
    throw new Error(`Failed to post comment: ${response.statusText}`);
  }
  return response.json();
};