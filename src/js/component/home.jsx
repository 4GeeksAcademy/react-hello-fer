import React, { useState } from "react";
import Swal from 'sweetalert2'
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	return (
		<div className="container">
			<h1>Todos</h1>
			<ul>
				<li className="linea1">
					<input type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault()
								if (inputValue.trim() === "") {
									Swal.fire({
										title:"hola señor/señora",
										imageUrl: "https://media.tenor.com/p34oU47DQ-8AAAAM/monkey-conduciendo.gif",
										imageHeight: 200,
										text: "Por favor inserte tarea"
									  });
									return;
								}
								setTodos(todos.concat(inputValue));
								setInputValue("");
							}
						}}
						placeholder="what do you need to do"></input>
				</li>
				{todos.map((item, index) => (
					<li className="linea2">
						{item}{""}
						<i
							className="fa-solid fa-trash icon"
							onClick={() =>
								setTodos(
									todos.filter(
										(t, currentIndex) =>
											index != currentIndex
									)
								)
							}>

						</i>

					</li>))}

			</ul>
			<div>{todos.length} item left</div>
		</div>
	);
};

export default Home;
