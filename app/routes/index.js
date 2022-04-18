var express = require('express');
var router = express.Router();
var formidable = require('formidable');
<<<<<<< HEAD
var fs = require('fs');
=======
var fs = require('fs')

>>>>>>> 025f6f877f3691338b183a314d8695d2352a4b9f

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

router.delete('/file',(req, res)=>{

  let form = new formidable.IncomingForm({

    uploadDir:'./upload',
    keepExtensions: true

  })

  form.parse(req, (err,fields,files)=>{

    let path = './' + fields.path;
    if(fs.existsSync(path)){
<<<<<<< HEAD
=======

      fs.unlink(path,err=>{

        if(err){

          res.status(400).json({

            err

          });

        }else{

          res.json({

            fields

          });

        }

      });

    }

    res.json({
      files
    });
>>>>>>> 025f6f877f3691338b183a314d8695d2352a4b9f

      fs.unlink(path, err=>{

        if(err){

          res.status(400).json({

            err

          });

        }else{

          res.json({

            files
            
          });

        }

      });

    }
    
  });

})

router.post('/upload', (req,res)=>{

  let form = new formidable.IncomingForm({

    uploadDir:'./upload',
    keepExtensions: true

  })

  form.parse(req, (err,fields,files)=>{

    res.json({
      files
    });

  });
 

})

module.exports = router;
