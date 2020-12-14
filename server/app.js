// imports

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const Student = require('./models/Students')
const { response } = require('express')
const { ObjectID } = require('mongodb')
const port = process.env.PORT || 5000


//db connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/students')
mongoose.connection.on('connected', ()=>{
    console.log('Database is connected')
})
mongoose.connection.on('error', ()=>{
    console.log('Something get wrong')
})

// middlewares
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())

// routes
app.get('/', (req, res) => {
    Student.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(500).send(err)
    })
})

app.post('/students', (req, res) => {
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        place: req.body.place,
    })

    student.save()
    .then(result => {
        console.log(result)
        res.status(200).json({msg: 'Successfully Submitted'})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({msg: 'Error occured!'})
    })
})

app.delete('/students/:id', (req, res)=>{
    const id = req.params.id
    Student.remove({_id:id}, (err, result)=>{
        if(err){
            console.log(err)
            res.status(500).send('Error occured')
        }
        else{
            console.log(result)
            res.status(200).json({msg: 'Successfully deleted'})
        }
    })
})

app.put('/students/:id', (req, res)=> {
    
    Student.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
    .then(result=>{
        console.log(result)
        res.status(200).json({msg: 'Successfully Updated'})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({msg: 'Error occured'})
    })

})

//server

app.listen(port, () => console.log(`Listening on port ${port}`))
