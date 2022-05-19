const app = require("./server/index");

const server = require("http").createServer(app);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("API correctly running");
});

server.listen(PORT, function () {
  server.address().port;
  console.log("App correctly running on http://localhost:" + PORT);
});
