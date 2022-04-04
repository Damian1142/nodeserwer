const util = require('minecraft-server-util');
const express = require("express");
const app = express()

app.get('/', function(req,res){
    res.json("{\"status\":200}")
})

app.get('/rcon', function(req,res) {
    const client = new util.RCON();

client.on('message', async (data) => {
    res.json(data)

    // Close the client whenever necessary. Make sure
    // that all responses have been read from the server
    // before closing to ensure they fire this event.
    await client.close();
});

const connectOpts = {
    timeout: 1000 * 5
    // ... any other connection options specified by
    // NetConnectOpts in the built-in `net` Node.js module
};

const loginOpts = {
    timeout: 1000 * 5
};

(async () => {
    await client.connect(req.query.ip,Number.parseInt(req.query.port), connectOpts);
    await client.login(req.query.pw, loginOpts);
    await client.run(req.query.cd);
})();
});

app.listen(80,() => {console.log("Słucham")})