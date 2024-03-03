import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSpinner9 } from "react-icons/im";
import TodoInput from './TodoInput';
import TodoList from './TodoList';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [currentEdit, setCurrentEdit] = useState('');
    const [currentEditedItem, setCurrentEditedItem] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem('todolist'));
        let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
        if (savedTodo) {
            setTodos(savedTodo);
        }
        if (savedCompletedTodo) {
            setCompletedTodos(savedCompletedTodo);
        }
    }, []);

    const handleAddTodo = (newTodoItem) => {
        let updatedTodoArr = [...allTodos, newTodoItem];
        setTodos(updatedTodoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
        toast.success('Task added successfully!', { autoClose: 2000 });
    };

    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index, 1);
        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
        setTodos(reducedTodo);
        toast.error(`Task has been deleted successfully`, { autoClose: 2000 });
    };

    const handleComplete = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = `${dd}-${mm}-${yyyy} at ${h}:${m}:${s}`;

        let filteredItem = {
            ...allTodos[index],
            completedOn: completedOn,
        };

        let updatedCompletedArr = [...completedTodos, filteredItem];
        setCompletedTodos(updatedCompletedArr);

        let reducedTodo = [...allTodos];
        reducedTodo.splice(index, 1);
        setTodos(reducedTodo);
        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
        localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));

        toast.success('Task marked as completed!', { autoClose: 2000 });
    };

    const handleDeleteCompletedTodo = (index) => {
        let reducedTodo = [...completedTodos];
        reducedTodo.splice(index, 1);
        localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
        setCompletedTodos(reducedTodo);
        toast.error(`Task has been deleted successfully`, { autoClose: 2000 });
    };

    const handleEdit = (index, item) => {
        setCurrentEdit(index);
        setCurrentEditedItem(item);
    };

    const handleUpdateTitle = (value) => {
        setCurrentEditedItem((prev) => {
            return { ...prev, title: value };
        });
    };

    const handleUpdateDescription = (value) => {
        setCurrentEditedItem((prev) => {
            return { ...prev, description: value };
        });
    };

    const handleUpdateToDo = () => {
        let newToDo = [...allTodos];
        newToDo[currentEdit] = currentEditedItem;
        setTodos(newToDo);
        setCurrentEdit('');
        localStorage.setItem('todolist', JSON.stringify(newToDo));
        toast.success('Task updated successfully!', { autoClose: 2000 });
    };

    return (
        <div className="App">
            <ToastContainer position="bottom-right" />
            {isLoading ? (
                <div className="loader">
                    <ImSpinner9 className="spinner-icon" />
                </div>
            ) : (
                <div>
                    <h1>Todo App</h1>
                    <div className="todo-wrapper">
                        <TodoInput onAddTodo={handleAddTodo} />
                        <div className="btn-area">
                            <button
                                className={`secondaryBtn ${!isCompleteScreen && 'active'}`}
                                onClick={() => setIsCompleteScreen(false)}
                            >
                                Todo
                            </button>
                            <button
                                className={`secondaryBtn ${isCompleteScreen && 'active'}`}
                                onClick={() => setIsCompleteScreen(true)}
                            >
                                Completed
                            </button>
                        </div>

                        <TodoList
                            todos={isCompleteScreen ? completedTodos : allTodos}
                            onDeleteTodo={isCompleteScreen ? handleDeleteCompletedTodo : handleDeleteTodo}
                            onComplete={handleComplete}
                            onEdit={handleEdit}
                            onUpdateTitle={handleUpdateTitle}
                            onUpdateDescription={handleUpdateDescription}
                            onUpdateToDo={handleUpdateToDo}
                            currentEdit={currentEdit}
                            currentEditedItem={currentEditedItem}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
