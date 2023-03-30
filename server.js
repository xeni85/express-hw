const express = require("express");

//create express app
const app = express();

const switcheroo = false;
// const changeSwitcheroo = () => { switcheroo = !switcheroo; console.log(switcheroo)}

//render engine madelline template
const fs = require('fs') // this engine requires the fs module like we did Saturday
app.engine('madeline', (filePath, options, callback) => { // define the view engine called hypatia
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple view engine we'll be more complex later
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' ).
      replace('#clickSwitch#', options.clickSwitch)

    const anotherRendered = content.toString()      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').
      replace('#images#', options.images).
      replace('#content#','<div>'+ options.content + '</div>' ).
      replace('#clickSwitch#', options.clickSwitch )
   if (switcheroo) {
     return callback(null, rendered)
   } else { 
    return callback(null, anotherRendered) }
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'madeline') // register the hypatia view engine

//define a "root" route directly on app
app.get('/', (req, res) => {
if (switcheroo) {
        res.render('template', { title: 'Buongiorno Principessa', message: 'Ciao Ciao Cara!', content: 'Sono il re della montagna', /*clickSwitch: onclick="changeSwitcheroo()"*/
    })
} else {
    res.render('anotherTemplate', { title: 'Buongiorno Principe', message: 'Ciao Ciao Caro!', images: 'https://thumbs.dreamstime.com/b/regina-della-montagna-26706627.jpg', content: 'Sono la reggina della montagna', /*clickSwitch: '=' + '"' + changeSwitcheroo() +'"'*/})
}   

  })
  
  app.get('/about-me', (req, res) => {
    if (switcheroo) {
            res.render('template', { title: 'Sire', message: 'Hector of Troy', content: 'The most feared man of the Aegeus' })
    } else { res.render('anotherTemplate', { title: 'Madam', message: 'Helena of Troy', images: 'https://www.worldhistory.org/img/r/p/500x600/13343.jpg?v=1645022703', content: 'The beauty of the Aegeus' })
    }
  })
  
  app.get('/great-one', (req, res) => {
    if (switcheroo) {
        res.render('template', { title: 'the great', message: 'Alexander the Great', content: 'King of the known world' })
    } else {
        res.render('anotherTemplate', { title: 'the great', message: 'Katherine the Great', images: 'https://i.natgeofe.com/n/c51adfa9-ed02-46fd-b563-e975c38f50ca/catherine-great-593278368_4x3.jpg', content: 'Queen of Russia' })
    }
  })

  app.get('/silly-walks', (req, res) => {
    if (switcheroo) {
        res.render('template', { title: 'minister', message: 'Master of Silly walks', content: 'I walk funny? You walk funny' })
    } else {
        res.render('anotherTemplate', { title: 'deputy minister', message: 'Apprentice of silly walks', images: 'https://static.tvtropes.org/pmwiki/pub/images/silly_walks_small.jpg', content: 'Una passegata?' })
    }
  })

  app.get('/animals', (req, res) => {
    if (switcheroo) {
        res.render('template', { title: 'Cats', message: 'Master of the universce', content: 'Bow to me!' })
        switcheroo = true;
        console.log('updaed switcheroo' + switcheroo);
    } else {
        res.render('anotherTemplate', { title: 'dogs', message: 'Good boyyy', images: 'https://image.petmd.com/files/styles/863x625/public/CANS_dogsmiling_379727605.jpg', content: 'Wanna play?' })
    }
  })


console.log(switcheroo)
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

