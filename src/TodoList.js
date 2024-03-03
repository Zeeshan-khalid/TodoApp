import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function TodoList({ todos, onDeleteTodo, onComplete, onEdit, onUpdateTitle, onUpdateDescription, onUpdateToDo, currentEdit, currentEditedItem }) {
    const handleEdit = (index, item) => {
        onEdit(index, item);
    };


    return (
        <div className="todo-list">
            {todos.map((item, index) => (
                <div key={index}>
                    {currentEdit === index ? (
                        <div className="edit__wrapper" key={index}>
                            <input
                                placeholder="Updated Title"
                                onChange={(e) => onUpdateTitle(e.target.value)}
                                value={currentEditedItem.title}
                            />
                            <textarea
                                placeholder="Updated Title"
                                rows={4}
                                onChange={(e) => onUpdateDescription(e.target.value)}
                                value={currentEditedItem.description}
                            />
                            <button
                                type="button"
                                onClick={onUpdateToDo}
                                className="primaryBtn"
                            >
                                Update
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="todo-list-item">
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    {item.completedOn && <p><small>Completed on: {item.completedOn}</small></p>}
                                </div>
                                <div>
                                    <AiOutlineDelete
                                        className="icon"
                                        onClick={() => onDeleteTodo(index)}

                                    />
                                    {!item.completedOn && (
                                        <>
                                            <BsCheckLg
                                                className="check-icon"
                                                onClick={() => onComplete(index)}

                                            />
                                            <AiOutlineEdit
                                                className="check-icon"
                                                onClick={() => handleEdit(index, item)}

                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TodoList;
