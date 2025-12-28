import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Sidebar from './components/Sidebar';

const API_URL = process.env.REACT_APP_API_URL;

export default function CreatePost() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [slug, setSlug] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  
  const handleCoverImageChange = (ev) => {
    const file = ev.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addBlock = (type) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type: type === 'text' ? 'text' : 'image',
      content: '',
      src: '',
      caption: '',
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (index, newContent) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = { ...updatedBlocks[index], ...newContent, id: updatedBlocks[index].id };
    setBlocks(updatedBlocks);
  };

  const deleteBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const reorderBlocks = (result) => {
    if (!result.destination) return;
    const reorderedBlocks = Array.from(blocks);
    const [movedBlock] = reorderedBlocks.splice(result.source.index, 1);
    reorderedBlocks.splice(result.destination.index, 0, movedBlock);
    setBlocks(reorderedBlocks);
  };

  async function blobToBase64(blobUrl) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async function createNewPost(ev) {
    ev.preventDefault();
    setIsLoading(true);

    const updatedBlocks = await Promise.all(
      blocks.map(async (block) => {
        if (block.type === 'image' && block.src.startsWith('blob:')) {
          const base64Image = await blobToBase64(block.src);
          return { ...block, src: base64Image };
        }
        return block;
      })
    );

    const data = new FormData();
    data.append('name', name);
    data.append('author', author);
    data.append('date', date);
    data.append('slug', slug);
    data.append('coverImage', coverImage);
    data.append('content', JSON.stringify(updatedBlocks));

    try {
      const response = await fetch('https://portfolio-backend-wheat-three.vercel.app/post', { method: 'POST', body: data });
      if (response.ok) {
        setRedirect(true);
        alert('Blog post successfully created');
      } else {
        alert('Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('An error occurred while creating the blog post');
    } finally {
      setIsLoading(false);
    }
  }

  if (redirect) return <Navigate to={'/admin/blog'} />;

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        right: '-150px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-200px',
        left: '-200px',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <Sidebar />
      
      <div style={{ 
        width: '100%', 
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ 
          padding: '24px 32px',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          <h1 style={{ 
            color: '#60a5fa',
            fontSize: '24px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            margin: 0,
            textShadow: '0 2px 10px rgba(96, 165, 250, 0.3)'
          }}>
            Create New Post
          </h1>
          <p style={{
            color: '#94a3b8',
            fontSize: '14px',
            margin: '8px 0 0 0',
            fontWeight: '300'
          }}>
            Welcome, Admin
          </p>
        </div>

        {/* Form Container */}
        <div style={{ 
          padding: '32px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <form onSubmit={createNewPost}>
            {/* Cover Image Section */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <label style={{ 
                display: 'block',
                color: '#60a5fa',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Cover Image
              </label>
              <input 
                type="file" 
                onChange={handleCoverImageChange} 
                accept="image/*"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px dashed rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  marginBottom: '16px',
                  transition: 'all 0.3s ease'
                }}
              />
              {coverImage && (
                <div style={{
                  marginTop: '16px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.2)'
                }}>
                  <img 
                    src={coverImage} 
                    alt="Cover preview" 
                    style={{ 
                      width: '100%',
                      maxWidth: '500px',
                      height: 'auto',
                      display: 'block'
                    }} 
                  />
                </div>
              )}
            </div>

            {/* Input Fields Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#60a5fa',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  Title
                </label>
                <input 
                  type="text"
                  placeholder="Enter post title..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(30, 41, 59, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    e.target.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                    e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: '#60a5fa',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  Slug
                </label>
                <input 
                  type="text"
                  placeholder="post-url-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(30, 41, 59, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    e.target.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                    e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: '#60a5fa',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  Category
                </label>
                <select
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(30, 41, 59, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2360a5fa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px',
                    paddingRight: '40px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    e.target.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                    e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  <option value="" style={{ background: '#1e293b', color: '#94a3b8' }}>Select a category...</option>
                  <option value="technology" style={{ background: '#1e293b', color: '#e2e8f0' }}>Technology</option>
                  <option value="design" style={{ background: '#1e293b', color: '#e2e8f0' }}>Design</option>
                  <option value="development" style={{ background: '#1e293b', color: '#e2e8f0' }}>Development</option>
                  <option value="personal" style={{ background: '#1e293b', color: '#e2e8f0' }}>Personal</option>
                  <option value="tutorial" style={{ background: '#1e293b', color: '#e2e8f0' }}>Tutorial</option>
                  <option value="review" style={{ background: '#1e293b', color: '#e2e8f0' }}>Review</option>
                  <option value="news" style={{ background: '#1e293b', color: '#e2e8f0' }}>News</option>
                  <option value="opinion" style={{ background: '#1e293b', color: '#e2e8f0' }}>Opinion</option>
                  <option value="lifestyle" style={{ background: '#1e293b', color: '#e2e8f0' }}>Lifestyle</option>
                  <option value="travel" style={{ background: '#1e293b', color: '#e2e8f0' }}>Travel</option>
                  <option value="other" style={{ background: '#1e293b', color: '#e2e8f0' }}>Other</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: '#60a5fa',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(30, 41, 59, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    colorScheme: 'dark'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    e.target.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                    e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
                  }}
                />
              </div>
            </div>

            {/* Add Block Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <button
                type="button"
                onClick={() => addBlock('text')}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.3)';
                }}
              >
                + Add Text Block
              </button>
              <button
                type="button"
                onClick={() => addBlock('image')}
                style={{
                  flex: 1,
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.3)';
                }}
              >
                + Add Image Block
              </button>
            </div>

            {/* Content Blocks */}
            <DragDropContext onDragEnd={reorderBlocks}>
              {blocks.length > 0 && (
                <Droppable droppableId="blocks">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {blocks.map((block, index) => (
                        <Draggable key={block.id} draggableId={block.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                background: snapshot.isDragging 
                                  ? 'rgba(59, 130, 246, 0.2)' 
                                  : 'rgba(30, 41, 59, 0.6)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '12px',
                                padding: '24px',
                                marginBottom: '20px',
                                border: snapshot.isDragging
                                  ? '2px solid rgba(59, 130, 246, 0.5)'
                                  : '1px solid rgba(59, 130, 246, 0.2)',
                                boxShadow: snapshot.isDragging
                                  ? '0 12px 32px rgba(59, 130, 246, 0.4)'
                                  : '0 4px 16px rgba(0, 0, 0, 0.3)',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '16px'
                              }}>
                                <span style={{
                                  color: '#60a5fa',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  letterSpacing: '0.1em',
                                  textTransform: 'uppercase'
                                }}>
                                  {block.type === 'text' ? '📝 Text Block' : '🖼️ Image Block'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => deleteBlock(index)}
                                  style={{
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    color: '#ef4444',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    padding: '6px 16px',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(239, 68, 68, 0.3)';
                                    e.target.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                                    e.target.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                                  }}
                                >
                                  Delete
                                </button>
                              </div>

                              {block.type === 'text' ? (
                                <textarea
                                  placeholder="Write your content here..."
                                  value={block.content}
                                  onChange={(e) => updateBlock(index, { content: e.target.value })}
                                  style={{
                                    width: '100%',
                                    minHeight: '150px',
                                    padding: '16px',
                                    background: 'rgba(15, 23, 42, 0.8)',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    borderRadius: '8px',
                                    color: '#e2e8f0',
                                    fontSize: '15px',
                                    lineHeight: '1.6',
                                    outline: 'none',
                                    resize: 'vertical',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onFocus={(e) => {
                                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                                  }}
                                  onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                                  }}
                                />
                              ) : (
                                <div>
                                  <input
                                    type="file"
                                    onChange={(e) => updateBlock(index, { src: URL.createObjectURL(e.target.files[0]) })}
                                    style={{
                                      display: 'block',
                                      width: '100%',
                                      padding: '12px',
                                      background: 'rgba(15, 23, 42, 0.8)',
                                      border: '2px dashed rgba(59, 130, 246, 0.3)',
                                      borderRadius: '8px',
                                      color: '#94a3b8',
                                      cursor: 'pointer',
                                      marginBottom: '16px'
                                    }}
                                  />
                                  {block.src && (
                                    <>
                                      <div style={{
                                        marginBottom: '16px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(59, 130, 246, 0.3)'
                                      }}>
                                        <img 
                                          src={block.src} 
                                          alt="Preview" 
                                          style={{ 
                                            width: '100%',
                                            maxWidth: '600px',
                                            height: 'auto',
                                            display: 'block'
                                          }} 
                                        />
                                      </div>
                                      <textarea
                                        placeholder="Add a caption for this image..."
                                        value={block.caption}
                                        onChange={(e) => updateBlock(index, { caption: e.target.value })}
                                        style={{
                                          width: '100%',
                                          minHeight: '80px',
                                          padding: '12px',
                                          background: 'rgba(15, 23, 42, 0.8)',
                                          border: '1px solid rgba(59, 130, 246, 0.2)',
                                          borderRadius: '8px',
                                          color: '#e2e8f0',
                                          fontSize: '14px',
                                          outline: 'none',
                                          resize: 'vertical',
                                          transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                          e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                                        }}
                                        onBlur={(e) => {
                                          e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                                        }}
                                      />
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </DragDropContext>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '18px 32px',
                background: isLoading
                  ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
                  : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isLoading
                  ? '0 4px 16px rgba(100, 116, 139, 0.3)'
                  : '0 4px 16px rgba(16, 185, 129, 0.3)',
                marginTop: '32px'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 16px rgba(16, 185, 129, 0.3)';
                }
              }}
            >
              {isLoading ? '🔄 Creating Post...' : '✨ Publish Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}