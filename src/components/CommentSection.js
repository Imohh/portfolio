import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

const CommentSection = ({ comments, onSubmit, isSubmitting }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: '',
    website: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.text) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in name, email, and comment.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await onSubmit({
        name: formData.name,
        email: formData.email,
        text: formData.text,
        website: formData.website || undefined,
      });
      setFormData({ name: '', email: '', text: '', website: '' });
      toast({
        title: 'Comment added',
        description: 'Your comment has been posted.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to post comment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-8">
        Comments ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            placeholder="Name *"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
          <Input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <Input
          placeholder="Website (optional)"
          value={formData.website}
          onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
        />
        <Textarea
          placeholder="Your comment *"
          value={formData.text}
          onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
          rows={4}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>

      {comments.length === 0 ? (
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-8">
          {comments.map((comment) => (
            <div key={comment._id} className="border-b border-border pb-6 last:border-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-foreground">{comment.name}</span>
                <span className="text-muted-foreground">·</span>
                <time className="text-sm text-muted-foreground">
                  {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                </time>
              </div>
              <p className="text-foreground leading-relaxed">{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;