import './App.css';
import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
	const [name, setName] = useState('');
	const [country, setCountry] = useState('');
	const [studentsData, setstudentsData] = useState([]);
	const [isUpdated, setIsUpdated] = useState(false);

	useEffect(() => {
		setIsUpdated(false);
		const callAPI = async () => {
			try {
				const res = await axios.get('/home');
				setstudentsData(res.data);
				console.log(res.data);
			} catch (err) {
				console.error(`Error occured: ${err}`);
			}
		};
		callAPI();
	}, []);

	const postNewStudentData = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				'/post-new-student-data',
				{
					name: name,
					country: country,
				},
				{
					headers: {
						// It indicates that the request body format is JSON.
						'Content-Type': 'application/json',
					},
				}
			);
		} catch (err) {
			console.log(err);
		}
		setName('');
		setCountry('');
		setIsUpdated(true);
	};

	const updateData = () => {
		window.location.reload();
	};
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<form onSubmit={postNewStudentData}>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
					<button type="submit">Add Student</button>
				</form>
				<div>
					{studentsData.length !== 0 && !isUpdated ? (
						studentsData.map((student, index) => {
							return (
								<div key={index}>
									<p>
										Name: {student.name} | Country: {student.country}
									</p>
									<p></p>
								</div>
							);
						})
					) : (
						<>
							<p>new student data added!</p>
							<button onClick={() => updateData()}>Update List</button>
						</>
					)}
				</div>
			</header>
		</div>
	);
}

export default App;
