const express = require('express');
const app = express();
app.use(express.json());
const { mongoose } = require('./db/mongoose');


// Load in the mongoose models
const { List, Task } = require('./db/models');



/* ROUTE HANDLERS */

/* LIST ROUTES */


/**
 * GET /lists
 * Purpose: Get all list items
 */
app.get('/lists', (req, res) => {
    List.
    find({}).
    then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
})

/**
 * POST /lists
 * Purpose: Create a list
 */
app.post('/lists', (req, res) => {
    console.log(req.body);
    let title = req.body.title;
    

    if (!title) {
        return res.status(400).send('Title is required');
    }

    let newList = new List({
        title
    });

    newList.save().then((listDoc) => {
        res.set('Content-Type', 'application/json');
        res.send(listDoc);
    }).catch((e) => {
        console.log("There is an error creating");
        console.log(e);
        res.status(400).send(e);
    });
});


/**
 * PATCH /lists/:id
 * Purpose: Update a specified list
 */
app.patch('/lists/:id', (req, res) => {
  List.findOneAndUpdate({_id: req.params.id}, {
    $set:req.body
  }).then(()=> {
    res.sendStatus(200);
  });
});

/**
 * DELETE /lists/:id
 * Purpose: Delete a list
 */
app.delete('/lists/:id', (req, res) => {
    List.findOneAndRemove({
        _id:req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
});


/**
 * GET /lists/:listID/tasks
 * Purpose: Get all task in specified list
 */
app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
         res.send(tasks);
    }) 
})


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})