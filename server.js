const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

app.set('view engine', 'hbs')

app.use(express.static('public'));
app.use((req, res, next) => {
fs.appendFile('server.log', `${new Date().toString()}: ${req.method} ${req.url}\n`, (error) => {
  if (error) {console.log(error, 'Unable to write request to log file.')};
});
console.log(`${new Date().toString()}: ${req.method} ${req.url}`);
next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

hbs.registerPartials('views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('Hello from Express!');
  res.render('home.hbs', {
    title: 'Home',
    message: 'Welcome message'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
