const http = require("http")
const fs = require("fs")
let args=require("minimist")(process.argv.slice(2));
let homeContent = "";
let projectContent = "";
let registrationContent="";
fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

fs.readFile("registration.html",(err,reg) => {
  if (err){
    throw err;
  }
  registrationContent=reg;
});
fs.readFile("home.html", (err, home) => {
    if (err) {
    throw err;
    }
    homeContent = home;
});

http
  .createServer((request, response) => {
    let url = request.url;
    console.log(url)
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration":
        response.write(registrationContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(args["port"]);

