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
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addBlock = (type) => {
    const newBlock = {
      id: `block-${Date.now()}`, // Using id instead of _id
      type: type === 'text' ? 'text' : 'image',
      content: '',
      src: '',
      caption: ''
    };
    setBlocks([...blocks, newBlock]);
  };


  // Handle block content changes
  const updateBlock = (index, newContent) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = { 
      ...updatedBlocks[index], 
      ...newContent,
      id: updatedBlocks[index].id // Preserve the id
    };
    setBlocks(updatedBlocks);
  };

  // Handle block deletion
  const deleteBlock = (index) => {
    const updatedBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(updatedBlocks);
  };

  // Handle drag-and-drop reordering
  const reorderBlocks = (result) => {
    if (!result.destination) return; // Dropped outside the list
    const reorderedBlocks = Array.from(blocks);
    const [movedBlock] = reorderedBlocks.splice(result.source.index, 1);
    reorderedBlocks.splice(result.destination.index, 0, movedBlock);
    setBlocks(reorderedBlocks);
  };


  
  // Handle form submission
  async function createNewPost(ev) {
    ev.preventDefault();

    // Process blocks to convert any blob URLs to base64
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
      const response = await fetch('http://localhost:4000/post', {
      // const response = await fetch('https://sope-backend.vercel.app/post', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setRedirect(true);
        alert('Blog post successfully created');
      } else {
        alert('Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('An error occurred while creating the blog post');
    }
  }

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
  

  if (redirect) {
    return <Navigate to={'/admin/blog'} />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <div className="px-5 py-4 bg-black text-white">
          <p className="capitalize text-lg" style={{ fontFamily: 'Muli' }}>
            Welcome, Admin
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={createNewPost}>
            <div className="mb-4">
              <label className="block mb-2">Cover Image</label>
              <input
                type="file"
                onChange={handleCoverImageChange}
                accept="image/*"
                className="mb-2"
              />
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="max-w-md h-auto"
                />
              )}
            </div>
            <input
              className="border border-solid border-black px-5 py-3 w-full"
              style={{ fontFamily: 'Muli' }}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <br />
            <br />
            <input
              className="border border-solid border-black px-5 py-3 w-full"
              style={{ fontFamily: 'Muli' }}
              type="text"
              placeholder="Slug"
              value={slug}
              onChange={(ev) => setSlug(ev.target.value)}
            />
            <br />
            <br />
            <input
              className="border border-solid border-black px-5 py-3 w-full"
              style={{ fontFamily: 'Muli' }}
              type="text"
              placeholder="Category"
              value={author}
              onChange={(ev) => setAuthor(ev.target.value)}
            />
            <br />
            <br />
            <input
              className="border border-solid border-black px-5 py-3 w-full"
              style={{ fontFamily: 'Muli' }}
              type="text"
              placeholder="Date"
              value={date}
              onChange={(ev) => setDate(ev.target.value)}
            />
            <br />
            <br />
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => addBlock('text')}
                className="bg-gray-800 text-white px-4 py-2"
              >
                Add Text Block
              </button>
              <button
                type="button"
                onClick={() => addBlock('image')}
                className="bg-gray-800 text-white px-4 py-2"
              >
                Add Image Block
              </button>
            </div>
            <DragDropContext onDragEnd={reorderBlocks}>
              {blocks && blocks.length > 0 && (
              <Droppable droppableId="blocks">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {blocks.map((block, index) => (
                      <Draggable
                        key={block.id}
                        draggableId={block.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="border border-dashed border-gray-400 p-4"
                          >
                            {block.type === 'text' ? (
                              <textarea
                                className="w-full border border-solid border-gray-400 p-2"
                                placeholder="Write text here..."
                                value={block.content}
                                onChange={(ev) =>
                                  updateBlock(index, { content: ev.target.value })
                                }
                              />
                            ) : (
                              <div>
                                <input
                                  type="file"
                                  onChange={(ev) =>
                                    updateBlock(index, {
                                      src: URL.createObjectURL(ev.target.files[0]),
                                    })
                                  }
                                />
                                {block.src && (
                                  <>
                                    <img
                                      src={block.src}
                                      alt="Preview"
                                      className="mt-2 max-w-full"
                                    />
                                    <textarea
                                      className="w-full border border-solid border-gray-400 p-2 mt-2"
                                      placeholder="Add a caption..."
                                      value={block.caption}
                                      onChange={(ev) =>
                                        updateBlock(index, { caption: ev.target.value })
                                      }
                                    />
                                  </>
                                )}
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => deleteBlock(index)}
                              className="mt-2 text-red-500 hover:underline"
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
            <button
              className="mt-5 bg-black text-white px-5 py-3 uppercase text-sm transition hover:bg-gray-900"
              style={{ fontFamily: 'Muli' }}
              type="submit"
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <span className="loader border-t-transparent border-white border-4 rounded-full w-4 h-4"></span>
                  <span>Creating...</span>
                </div>
              ) : (
                'Create Post'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}