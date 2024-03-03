import React, { useState } from 'react';

function TodoInput({ onAddTodo }) {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const handleAddTodo = () => {
        // Check if both title and description are non-empty
        if (newTitle.trim() === '') {
            setTitleError('Title is required');
        } else {
            setTitleError('');
        }

        if (newDescription.trim() === '') {
            setDescriptionError('Description is required');
        } else {
            setDescriptionError('');
        }

        // If both fields are non-empty, proceed to add the todo item
        if (newTitle.trim() !== '' && newDescription.trim() !== '') {
            onAddTodo({
                title: newTitle,
                description: newDescription,
            });

            // Clear input fields after adding todo item
            setNewTitle('');
            setNewDescription('');
        }
    };

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
        if (e.target.value.trim() !== '') {
            setTitleError('');
        }
    };

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
        if (e.target.value.trim() !== '') {
            setDescriptionError('');
        }
    };

    return (
        <div className="todo-input">
            <div className="todo-input-item">
                <label>Title *</label>
                <input
                    type="text"
                    value={newTitle}
                    onChange={handleTitleChange}
                    placeholder="What's the task title?"
                />
                {titleError && <span className="error">{titleError}</span>}
            </div>
            <div className="todo-input-item">
                <label>Description *</label>
                <input
                    type="text"
                    value={newDescription}
                    onChange={handleDescriptionChange}
                    placeholder="What's the task description?"
                />
                {descriptionError && <span className="error">{descriptionError}</span>}
            </div>
            <div className="todo-input-item">
                <button type="button" onClick={handleAddTodo} className="primaryBtn">
                    Add
                </button>
            </div>
        </div>
    );
}

export default TodoInput;
