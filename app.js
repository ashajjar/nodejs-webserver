const express = require("express");
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
var app = express();

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public/'));
app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', `${log}\n`, (err) => {
        if (err) {
            console.log('Cannot write to server.log');
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

app.get('/', (request, response) => {
    response.render('home.hbs', {
        title: 'Welcome',
        greeting: 'Hello World!'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Stop there ....'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        projects: [
            {
                title: 'nodejs-webserver',
                url: 'https://github.com/ashajjar/nodejs-webserver',
                description: 'Creating NodeJS Webserver for NodeJS Udemy Course'
            },
            {
                title: 'NodeJS Course',
                url: 'https://github.com/ashajjar/nodejs-course',
                description: 'NodeJS Course'
            }
        ],
        title:'Projects'
    });
});

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});