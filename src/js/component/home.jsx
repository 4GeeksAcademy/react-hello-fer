import React, { useState, useEffect } from 'react';

const Home = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');


	useEffect(() => {
		createUser();
		fetchTodos();
	}, []);


	const fetchTodos = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/todo/users/fernando');
			if (!response.ok) throw new Error("Error al obtener las tareas");
			const data = await response.json();
			console.log(data)
			setTodos(data.todos);
		} catch (error) {
			console.error("Error al obtener las tareas:", error);
		}
	};
	const createUser = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/fernando", {
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) throw new Error("Error al crear usuario");

			const data = await response.json();

			
			if (data.id === 0) {
				console.error("Error: El usuario no se creó correctamente.");
				return;
			}

			console.log("Usuario creado correctamente", data);
			setTodos([]);
		} catch (error) {
			console.error("Error al crear usuario:", error);
		}
	};


	
	const addTask = async () => {
		if (inputValue.trim() === '') return;
		const newTodo = { label: inputValue, done: false };
		try {
			const response = await fetch('https://playground.4geeks.com/todo/todos/fernando', {
				method: "POST",
				body: JSON.stringify(newTodo),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) throw new Error("Error al agregar la tarea");
			const data = await response.json();
			setTodos([...todos, data]);
			setInputValue(''); 
		} catch (error) {
			console.error("Error al agregar la tarea:", error);
		}
	};


	const deleteTask = async (todoId) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
				method: "DELETE"
			});
			if (!response.ok) throw new Error("Error al eliminar la tarea");

			// Eliminar la tarea del estado
			setTodos(todos.filter((todo) => todo.id !== todoId));
		} catch (error) {
			console.error("Error al eliminar la tarea:", error);
		}
	};


	const clearTasks = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/todo/todos/fernando', {
				method: "PUT",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) throw new Error("Error al limpiar las tareas");


			setTodos([]);
		} catch (error) {
			console.error("Error al limpiar las tareas:", error);
		}
	};

	return (
		<div className="container">
			<h1>Todos</h1>
			<ul>
				{/* Input para agregar tareas */}
				<li className="linea1">
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								addTask(); 
							}
						}}
						placeholder="What do you need to do?"
					/>
				</li>

				{/* Listar las tareas */}
				{todos?.map((item) => (
					<li className="linea2" key={item.id}>
						{item.label}
						<i
							className="fa-solid fa-x icon"
							onClick={() => deleteTask(item.id)}
						></i>
					</li>
				))}
			</ul>


			<div>{todos.length} item(s) left</div>


			<button onClick={clearTasks}>Clear All</button>
		</div>
	);
};

export default Home;
