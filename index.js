const http = require("http")
const path = require("path")
const fs = require("fs")

const server = http.createServer((req, res) => {
    //Build File path
    let filePath = path.join(__dirname, "/public", req.url === "/" ? "index.html" : req.url)
    
    //Extension of file
    let ext = path.extname(filePath);

    //Initial content type
    let contentType = "text/html"

    //Checke extension and set content type
    switch (ext) {
        case ".js":
            contentType = "text/html"
            break;
        case '.css':
            contentType = "text/css"
            break;
        case 'json':
            contentType = "application/json"
            break;
        case ".png":
            contentType = "image/png"
            break;
        case ".jpg":
            contentType = "image/jpg"
            break;
    }

    //Readfile
    fs.readFile(filePath, (err, content) => {
        if (err) {
            throw err
        } else {
            res.writeHead(200, { 'Content-Type': contentType});
            res.end(content, "utf8")
        }

    })
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));