import React, { useState } from "react";

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
				<li>
					<input type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								if (inputValue.trim() === "") {
									alert("Please enter a item!");
									return;
								}
								setTodos(todos.concat(inputValue));
								setInputValue("");
							}
						}}
						placeholder="what do you need to do"></input>
				</li>
				{todos.map((item, index) => (
					<li>
						{item}{""}
						<i
							class="fa-solid fa-trash"
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
