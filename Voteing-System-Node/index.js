const uuid = require("uuid"),
	express = require("express"),
	cors = require("cors"),
	fs = require("fs"),
	path = require("path"),
	app = express();

const PORT = process.env.PORT || 5000;
const filePath = path.join(__dirname, "/saves", "save.json");
var hold;

function loadFile() {
	try {
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) throw err;
			try {
				hold = JSON.parse(data);
			} catch (err) {
				console.log(err);
			}
		});
	} catch (err) {
		console.log(err);
	}
}

function saveFile() {
	try {
		fs.writeFile(filePath, JSON.stringify(hold), err => {
			if (err) throw err;
			console.log("Writing to file...");
		});
	} catch (err) {
		console.log(err);
	}
}

app.use(cors());

app.use(express.json());

app.get("/api/question", (req, res) => {
	loadFile();
	res.json(hold);
});

app.post("/api/question", (req, res) => {
	hold = req.body;
	console.log(req.body.id);
	saveFile();
	res.status(200)
		.header("Content-Type", "text/plain")
		.send("recived");
});

app.get("/api/vote/:responseIndex", (req, res) => {
	hold.response[parseInt(req.params.responseIndex)].voted++;
	saveFile();
	res.status(200)
		.header("Content-Type", "text/plain")
		.send(`Voted on ${hold.response[parseInt(req.params.responseIndex)].title}`);
});

app.post("/api/login", (req, res) => {
	var json = {
		username: "test",
		password: "1254",
	};

	var reqJson = req.body;

	if (reqJson.username === json.username && reqJson.password === json.password) {
		res.send("accept");
	} else {
		res.send("reject");
	}
});

app.use(function(req, res, next) {
	res.status(404).send("Page not found!");
});

app.listen(PORT, () => {
	loadFile();
	console.log(`Listening on port ${PORT}`);
});
