const API_BASE_URL = 'http://localhost:4000';

export const blogApi = {
  async getAllPosts() {
    const response = await fetch(`${API_BASE_URL}/post`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  async getPostBySlug(slug) {
    const response = await fetch(`${API_BASE_URL}/post/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  async getComments(slug) {
    const response = await fetch(`${API_BASE_URL}/post/${slug}/comments`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  },

  async addComment(slug, comment) {
    const response = await fetch(`${API_BASE_URL}/post/${slug}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    });
    if (!response.ok) throw new Error('Failed to add comment');
    return response.json();
  },
};