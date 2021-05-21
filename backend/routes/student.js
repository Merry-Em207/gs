const router = require('express').Router();

let Student = require('../models/student.model');

//home
router.route('/').get((req, res)=> {
    Student.find()
     .then(student=> res.json(student))
     .catch(error => res.status(400).json("Error: "+error));

   
});
//add

router.route('/add').post((req, res)=> {
    const fullname = req.body.fullname;
    const email = req.body.email;

    const newStudent = new Student ({fullname, email});
    newStudent.save()
      .then(student=> res.json("New Student added."))
      .catch(error => res.status(400).json("Error: " + error));
});
//delete
router.route('/:id').delete((req,res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(student => res.json('Record was deletd.'))
        .catch(err => res.status(400).json('Error: '+err));
});

//update
router.route('/update/:id').post((req,res) => {
    Student.findById(req.params.id)
        .then(student => {

            student.fullname = req.body.fullname;       
            student.email = req.body.email;
    

            student.save()
                .then(student => res.json('Record was updated!'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;