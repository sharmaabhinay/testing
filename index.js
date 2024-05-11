const bcdata = require('./config');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
// let PORT = process.env.PORT || 4100
let PORT = 4100;


app.use(express.json());
app.use(cors());
app.get('/',(req,res)=> {
  res.send('hello world')
})
//get user details in admin panel
app.post('/', async (req, res) => {
  try {
    let data = await bcdata.find();
    // console.log('>>>>>>>>>', data);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
//new user register
app.post('/user', async (req, res) => {
  const { username, email, phone, city , gender,dob,qualification} = req.body;
  const data = {
    username: username,
    email: email,
    phone: phone,
    city: city,
    gender:gender,
    dob:dob,
    datecreated:new Date().toLocaleDateString(),
    qualification:qualification
  };
  try {
    const check = await bcdata.find({ email: data.email });
    if (check.length === 0) {
        await bcdata.insertMany({
        name: data.username,
        email: data.email,
        phone: data.phone,
        city: data.city,
        gender:data.gender,
        dob:data.dob,
        date:data.datecreated,
        qualification:data.qualification
        
      });
      res.json('submited')
    }else {
       res.json('exists');
    }
  } catch (err) {
    console.error(err);
    return res.send(err);
  }
});

app.delete('/delete/:id' ,async (req,res) => {
    console.log(req.params.id)
    try{

        await bcdata.deleteOne({_id:req.params.id})
        res.send('deleted')
    }catch(err){
        res.status(500).json(err)
    }
})

//put / upate the data
app.put('/update' ,async (req,res) => {
  let {id,name,email,phone,city} = req.body;
  const data = {
    id:id,
    name:name ,
    email:email,
    phone:phone,
    city:city
  }
  try{
      await bcdata.updateOne({_id:id},{$set:{...data}})
      res.send('data updated')
  }catch(err){
      res.status(500).json(err)
  }
})

//genger fileter
app.post('/gender',async (req,res)=> {
  let gender = {
    data : req.body
  }
  try{
    let filtered = await bcdata.find({gender:gender.data})
    res.json(filtered)
    console.log(filtered)
  }catch(err){
    throw err

  }
})


app.listen(PORT, () => {
  console.log('server is running on port 4100');
});
