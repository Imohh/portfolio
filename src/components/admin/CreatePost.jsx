import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Sidebar from './components/Sidebar';

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
      const response = await fetch('http://localhost:4000/post', { method: 'POST', body: data });
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

  const containerStyle = { display: 'flex' };
  const contentStyle = { width: '100%' };
  const headerStyle = { padding: '16px 20px', backgroundColor: 'black', color: 'white', fontFamily: 'Muli' };
  const formContainerStyle = { padding: '24px' };
  const inputStyle = { fontFamily: 'Muli', padding: '12px 16px', width: '100%', border: '1px solid black', marginBottom: '16px' };
  const buttonStyle = { backgroundColor: 'black', color: 'white', padding: '12px 20px', textTransform: 'uppercase', fontFamily: 'Muli', cursor: 'pointer', marginTop: '16px', border: 'none' };
  const hoverButtonStyle = { backgroundColor: '#1f2937' };
  const blockStyle = { border: '1px dashed gray', padding: '16px', marginBottom: '16px' };
  const textareaStyle = { width: '100%', padding: '8px', border: '1px solid gray', marginTop: '8px', fontFamily: 'Muli' };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={contentStyle}>
        <div style={headerStyle}>
          <p style={{ textTransform: 'capitalize', fontSize: '18px' }}>Welcome, Admin</p>
        </div>
        <div style={formContainerStyle}>
          <form onSubmit={createNewPost}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Cover Image</label>
              <input type="file" onChange={handleCoverImageChange} accept="image/*" style={{ marginBottom: '8px' }} />
              {coverImage && <img src={coverImage} alt="Cover preview" style={{ maxWidth: '400px', height: 'auto' }} />}
            </div>

            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Category" value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />

            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <button type="button" onClick={() => addBlock('text')} style={{ ...buttonStyle, backgroundColor: '#374151' }}>Add Text Block</button>
              <button type="button" onClick={() => addBlock('image')} style={{ ...buttonStyle, backgroundColor: '#374151' }}>Add Image Block</button>
            </div>

            <DragDropContext onDragEnd={reorderBlocks}>
              {blocks.length > 0 && (
                <Droppable droppableId="blocks">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {blocks.map((block, index) => (
                        <Draggable key={block.id} draggableId={block.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{ ...blockStyle, ...provided.draggableProps.style }}
                            >
                              {block.type === 'text' ? (
                                <textarea
                                  placeholder="Write text here..."
                                  value={block.content}
                                  onChange={(e) => updateBlock(index, { content: e.target.value })}
                                  style={textareaStyle}
                                />
                              ) : (
                                <div>
                                  <input
                                    type="file"
                                    onChange={(e) => updateBlock(index, { src: URL.createObjectURL(e.target.files[0]) })}
                                  />
                                  {block.src && (
                                    <>
                                      <img src={block.src} alt="Preview" style={{ marginTop: '8px', maxWidth: '100%' }} />
                                      <textarea
                                        placeholder="Add a caption..."
                                        value={block.caption}
                                        onChange={(e) => updateBlock(index, { caption: e.target.value })}
                                        style={textareaStyle}
                                      />
                                    </>
                                  )}
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => deleteBlock(index)}
                                style={{ color: 'red', marginTop: '8px', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}
                              >
                                Delete Block
                              </button>
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

            <button type="submit" disabled={isLoading} style={{ ...buttonStyle, width: '100%' }}>
              {isLoading ? 'Creating...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
