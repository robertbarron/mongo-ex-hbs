var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/todolist', function (req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{'sort': [['_id', 1]]},function (e, docs) {
        res.render('todolist', {
            "todolist" : docs
        });
    });
});

/* Update */
router.post('/update', function(req, res) {
  var db = req.db;
    task = req.body.task,
    status = req.body.done,
    collection = db.get('usercollection');

  collection.update( 
  	{'task': task},
		{
      $set: {
        "done": status
      }
    },
    { upsert: true },
		function(err, doc) {
    	if (err) {
        res.send({'error': true, 'updated' : false});
    	} else {
        res.send({'error': false, 'updated' : true});
    	}
		}
	);
});

module.exports = router;