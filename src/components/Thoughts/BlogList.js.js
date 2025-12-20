import { Link } from 'react-router-dom';
import { usePosts } from '../../hooks/usePosts';
import { format } from 'date-fns';

const BlogList = () => {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="animate-pulse space-y-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-muted rounded w-24" />
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-medium text-foreground mb-2">Unable to load posts</h1>
          <p className="text-muted-foreground">Please check if your backend server is running on localhost:4000</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <Link to="/" className="text-2xl font-semibold tracking-tight text-foreground hover:text-muted-foreground transition-colors">
            Blog
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {posts && posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No posts yet.</p>
        ) : (
          <div className="space-y-12">
            {posts?.map((post) => (
              <article key={post._id} className="group">
                <Link to={`/blog/${post.slug}`} className="block">
                  <time className="text-sm text-muted-foreground">
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </time>
                  <h2 className="mt-2 text-xl font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                    {post.name}
                  </h2>
                  {post.summary && (
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {post.summary}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogList;