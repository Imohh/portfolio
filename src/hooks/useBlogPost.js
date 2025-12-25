import { useState, useEffect } from 'react';
import { fetchPost, fetchComments, postComment } from '../api/postApi';

export const useBlogPost = (slug) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [postData, commentsData] = await Promise.all([
          fetchPost(slug),
          fetchComments(slug),
        ]);
        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadData();
    }
  }, [slug]);

  const addComment = async (commentData) => {
    try {
      const updatedComments = await postComment(slug, commentData);
      setComments(updatedComments);
    } catch (err) {
      throw new Error(err.message || 'Failed to add comment');
    }
  };

  return { post, comments, loading, error, addComment };
};