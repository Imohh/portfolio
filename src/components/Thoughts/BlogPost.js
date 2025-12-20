import { useParams, Link } from 'react-router-dom';
import { usePost, useComments, useAddComment } from '../../hooks/usePosts';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import CommentSection from '../CommentSection';

const BlogPost = () => {
  const { slug } = useParams();
  const { data: post, isLoading, error } = usePost(slug || '');
  const { data: comments } = useComments(slug || '');
  const addComment = useAddComment(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-muted rounded w-32" />
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-48" />
            <div className="space-y-3 pt-8">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-medium text-foreground mb-2">Post not found</h1>
          <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-12">
        <header className="mb-12">
          <time className="text-sm text-muted-foreground">
            {format(new Date(post.date), 'MMMM d, yyyy')}
          </time>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {post.name}
          </h1>
          <p className="mt-2 text-muted-foreground">
            By {post.author}
          </p>
        </header>

        {post.coverImage && (
          <img 
            src={post.coverImage} 
            alt={post.name}
            className="w-full rounded-lg mb-12"
          />
        )}

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {post.content.map((block) => {
            if (block.type === 'text') {
              return (
                <div 
                  key={block.id} 
                  className="text-foreground leading-relaxed mb-6 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: block.content || '' }}
                />
              );
            }
            if (block.type === 'image') {
              return (
                <figure key={block.id} className="my-8">
                  <img 
                    src={block.src} 
                    alt={block.caption || ''} 
                    className="w-full rounded-lg"
                  />
                  {block.caption && (
                    <figcaption className="mt-2 text-sm text-muted-foreground text-center">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return null;
          })}
        </div>
      </article>

      <section className="max-w-2xl mx-auto px-6 py-12 border-t border-border">
        <CommentSection 
          comments={comments || []} 
          onSubmit={addComment.mutateAsync}
          isSubmitting={addComment.isPending}
        />
      </section>
    </div>
  );
};

export default BlogPost;