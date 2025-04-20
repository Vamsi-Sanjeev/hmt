import { useState } from 'react';
import { MessageCircle, ThumbsUp, Image as ImageIcon, Send, X } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  author: string;
  date: string;
}

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'Tips for pricing handmade jewelry?',
    content: 'I\'m new to selling my handcrafted jewelry. How do you calculate pricing that\'s fair for both artisans and customers? I want to ensure I\'m not undervaluing my work while keeping prices competitive.',
    author: 'Sarah M.',
    date: '2024-03-20T08:30:00Z',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338',
    likes: 24,
    comments: [
      {
        id: 'c1',
        content: 'I usually calculate material costs + labor hours (at a fair hourly rate) + overhead costs, then multiply by 2-3 for retail pricing.',
        author: 'Maya P.',
        date: '2024-03-20T09:15:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Traditional dyeing techniques discussion',
    content: 'Looking to connect with other artisans who use natural dyes. What are your favorite plant-based sources? I\'ve been experimenting with turmeric and indigo but would love to expand my palette.',
    author: 'Rahul K.',
    date: '2024-03-19T15:45:00Z',
    likes: 31,
    comments: []
  }
];

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPost, setNewPost] = useState({ title: '', content: '', image: '' });
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: 'Anonymous User',
      date: new Date().toISOString(),
      image: newPost.image,
      likes: 0,
      comments: []
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', image: '' });
  };

  const handleCommentSubmit = (postId: string) => {
    if (!newComments[postId]?.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComments[postId],
      author: 'Anonymous User',
      date: new Date().toISOString()
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    }));

    setNewComments(prev => ({ ...prev, [postId]: '' }));
  };

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  return (
    <div className="py-8">
      <div className="pattern-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Community Forum</h1>
        <p className="text-gray-600 max-w-2xl">
          Connect with fellow artisans, share knowledge, and get answers to your craft-related questions.
        </p>
      </div>

      {/* New Post Form */}
      <form onSubmit={handlePostSubmit} className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={e => setNewPost(prev => ({ ...prev, title: e.target.value }))}
            className="input-field"
          />
          <textarea
            placeholder="What's on your mind?"
            value={newPost.content}
            onChange={e => setNewPost(prev => ({ ...prev, content: e.target.value }))}
            className="input-field min-h-[100px]"
          />
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={newPost.image}
              onChange={e => setNewPost(prev => ({ ...prev, image: e.target.value }))}
              className="input-field"
            />
            <ImageIcon size={20} className="text-gray-400" />
          </div>
          <button type="submit" className="btn-primary w-full">
            Post Discussion
          </button>
        </div>
      </form>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              
              <p className="text-gray-600 mb-4">{post.content}</p>
              
              {post.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post attachment"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-gray-500 hover:text-indigo-600"
                >
                  <ThumbsUp size={18} />
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center gap-2 text-gray-500">
                  <MessageCircle size={18} />
                  <span>{post.comments.length}</span>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-6 space-y-4">
                {post.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{comment.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(comment.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                ))}

                {/* New Comment Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComments[post.id] || ''}
                    onChange={e => setNewComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                    className="input-field flex-1"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post.id)}
                    className="btn-primary px-4"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}