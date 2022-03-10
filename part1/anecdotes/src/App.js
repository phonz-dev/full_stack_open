import { useState } from "react";

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const Anecdote = ({ anecdote, numVotes }) => (
	<>
		<p>{anecdote}</p>
		<p>
			has {numVotes} {numVotes === 1 ? "vote" : "votes"}
		</p>
	</>
);

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
	];
	const points = new Array(anecdotes.length).fill(0);
	const copy = [...points];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(copy);

	const generateRandomIndex = (start, end) => {
		return Math.floor(Math.random() * (end - start) + start);
	};

	const indexOfMostVotes = () => votes.indexOf(Math.max(...votes));

	const selectAnecdote = () => {
		const randIdx = generateRandomIndex(0, anecdotes.length);
		setSelected(randIdx);
	};

	const incrementVote = () => {
		votes[selected] += 1;
		setVotes(votes);
	};

	return (
		<div>
			<div>
				<h2>Anecdote of the day</h2>
				<Anecdote anecdote={anecdotes[selected]} numVotes={votes[selected]} />
				<div>
					<Button handleClick={incrementVote} text="vote" />
					<Button handleClick={selectAnecdote} text="next anecdote" />
				</div>
			</div>
			<div>
				<h2>Anecdote with most votes</h2>
				<Anecdote
					anecdote={anecdotes[indexOfMostVotes()]}
					numVotes={votes[indexOfMostVotes()]}
				/>
			</div>
		</div>
	);
};

export default App;
