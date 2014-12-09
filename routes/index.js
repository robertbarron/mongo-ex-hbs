var express = require('express');
var router = express.Router();

/* render index with list of items */
router.get('/', function(req, res) {
  res.render('index', {
    'title' : 'express'
  });
});

/* Delete */
router.post('/delete', function (req, res) {
  var db = req.db;
    taskId = req.body.taskId,
    collection = db.get('usercollection');

  collection.remove( 
    {'id': taskId},
    function (err, doc) {
      if (err) {
        res.send({'error': true, 'removed' : false});
      } else {
        res.send({'error': false, 'removed' : true});
      }
    }
  );
});

/* add new item to bd */
router.post('/new', function (req, res) {
  var db = req.db,
    taskId = req.body.taskId,
    task = req.body.task,
    status = req.body.done,
    collection = db.get('usercollection');

  collection.insert(
    {'id': taskId, 'task': task, 'done' : status},
    {w: 1},
    function (err, rec) {
      if (err)
        res.send({'error': true, 'created' : false, 'rec': rec});
      else
        res.send({'error': false, 'created' : true, 'rec': rec});
    }
  );
});

/* get list of items */
router.get('/getlist', function (req, res) {
  var db = req.db,
    collection = db.get('usercollection');
  collection.find({},{'sort': [['_id', 1]]},function (err, docs) {
    if (err) {
      res.send({"error" : true});
    } else {
      res.send({"todolist" : docs});
    }
  });
});

/* Update */
router.post('/edit', function (req, res) {
  var db = req.db,
    taskId = req.body.taskId,
    task = req.body.task,
    newTask = req.body.newTask,
    collection = db.get('usercollection');

  collection.update( 
    {'id': ""+taskId},
    { $set: { "task": newTask } },
    { upsert: true },
    function (err, doc) {
      if (err) {
        res.send({'error': true, 'updated' : false, 'doc': doc});
      } else {
        res.send({'error': false, 'updated' : true, 'doc': doc});
      }
    }
  );
});

/* Update */
router.post('/update', function (req, res) {
  var db = req.db,
    taskId = req.body.taskId,
    task = req.body.task,
    status = req.body.done,
    collection = db.get('usercollection');

  collection.update( 
  	{'id': taskId},
		{ $set: { "done": status } },
    { upsert: true },
		function (err, doc) {
    	if (err) {
        res.send({'error': true, 'updated' : false});
    	} else {
        res.send({'error': false, 'updated' : true});
    	}
		}
	);
});

module.exports = router;