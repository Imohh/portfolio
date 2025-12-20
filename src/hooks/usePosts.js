import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogApi } from '../lib/api';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: blogApi.getAllPosts,
  });
};

export const usePost = (slug) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => blogApi.getPostBySlug(slug),
    enabled: !!slug,
  });
};

export const useComments = (slug) => {
  return useQuery({
    queryKey: ['comments', slug],
    queryFn: () => blogApi.getComments(slug),
    enabled: !!slug,
  });
};

export const useAddComment = (slug) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (comment) =>
      blogApi.addComment(slug, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', slug] });
    },
  });
};