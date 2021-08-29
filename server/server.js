// define express to use the Express framework
const express = require('express');
// execute express() to cretate an instance of express
// it stores the object that has properties/methods to build an application
const app = express();
// the path module from Node.js... provides utilities for working with files and directory paths
const path = require('path');
const port = 4000;
// npm package to provide the Express middleware, and it can be used to enable CORS
const cors = require('cors');
// the file system module from Node.js
const fs = require('fs');

// middleware to recognize the incoming request object as strings or arrays.
// express.urlencoded() does the job
app.use(express.urlencoded({ extended: true }));
// middleware to recognize the incoming Request Object as a JSON Object.
app.use(express.json());
// if you wanna allow any api to enable cors, write the middleware↓ here
app.use(cors());

// if it's specific api, put in the second parameter of get()
// app.get("/", cors(), async (req, res) => {
//   res.send("working!");
// });

app.post('/post-new-student-data', async (req, res) => {
	let newStudentData = req.body;

	fs.readFile(
		path.join(__dirname, 'data', 'students.json'),
		(err, currentData) => {
			if (err) throw err;
			const updatedStudentsData = JSON.parse(currentData);
			updatedStudentsData.push(newStudentData);
			fs.writeFileSync(
				path.join(__dirname, 'data', 'students.json'),
				// JSON.stringify() JS Object → json string
				JSON.stringify(updatedStudentsData),

				(err) => {
					if (err) throw err;
				}
			);
		}
	);
	console.log(
		`new student data added! Name: ${newStudentData.name} Country: ${newStudentData.country}`
	);
});

// create a routing with the get HTTP request method to respond to a client request
// this time it responds with data from JSON
app.get('/home', cors(), async (req, res) => {
	const studentsData = fs.readFileSync(
		path.join(__dirname, 'data', 'students.json'),
		(err, data) => {
			if (err) throw err;
			// JSON.parse() json string → JS Object
			return JSON.parse(data);
		}
	);
	res.send(studentsData);
});

app.listen(port, () => {
	console.log(`The server is listening at http://localhost:${port} (-ω-) ~ ☀️`);
});
