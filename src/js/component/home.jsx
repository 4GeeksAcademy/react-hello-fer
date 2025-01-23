import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	const API_URL = "https://playground.4geeks.com/users/fernando/todos";

	useEffect(() => {
		const createUser = async () => {
			try {
				const response = await fetch("https://playground.4geeks.com/users/fernando", {
					method: "POST",
				});
				if (!response.ok) {
					console.error("Error al crear usuario");
				}
			} catch (error) {
				console.error(error);
			}
		};

		const getTodos = async () => {
			try {
				const response = await fetch(API_URL);
				if (response.ok) {
					const data = await response.json();
					setTodos(data);
				} else {
					console.error("Error al obtener las tareas");
				}
			} catch (error) {
				console.error(error);
			}
		};

		createUser().then(getTodos);
	}, []);

	const updateTodosOnServer = async (newTodos) => {
		try {
			const response = await fetch(API_URL, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTodos),
			});
			if (!response.ok) {
				console.error("Error al actualizar las tareas");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const addTask = () => {
		if (inputValue.trim() === "") {
			Swal.fire({
				title: "Por favor inserte una tarea",
				imageUrl: "https://media.tenor.com/p34oU47DQ-8AAAAM/monkey-conduciendo.gif",
				imageHeight: 200,
			});
			return;
		}
		const newTodos = [...todos, { label: inputValue, done: false }];
		setTodos(newTodos);
		setInputValue("");
		updateTodosOnServer(newTodos);
	};

	const deleteTask = (index) => {
		const newTodos = todos.filter((_, i) => i !== index);
		setTodos(newTodos);
		updateTodosOnServer(newTodos);
	};

	const clearTasks = () => {
		setTodos([]);
		updateTodosOnServer([]);
	};

	return (
		<div className="container">
			<h1>Todos</h1>
			<ul>
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
					></input>
				</li>
				{todos.map((item, index) => (
					<li className="linea2" key={index}>
						{item.label}
						<i
							className="fa-solid fa-x icon"
							onClick={() => deleteTask(index)}
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
