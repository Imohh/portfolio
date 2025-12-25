// api/endpoints.js
// This file defines API endpoint paths as constants for easier maintenance and reuse.
// Adjust the base if your API is mounted differently or use environment variables for production.

export const API_BASE = 'http://localhost:4000'; // Use '' for relative paths (assuming same-origin or proxy setup). Alternatively, 'http://localhost:4000' for development.

export const getPostEndpoint = (slug) => `${API_BASE}/post/${slug}`;

export const getCommentsEndpoint = (slug) => `${API_BASE}/post/${slug}/comments`;

export const addCommentEndpoint = (slug) => `${API_BASE}/post/${slug}/comment`;