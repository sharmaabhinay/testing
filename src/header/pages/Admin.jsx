import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const [data, setData] = useState([]);
  const notify = (message) => toast(message);
  const [userData,setUserData] = useState({
    id:'',
    name:'',
    email:"",
    phone:'',
    city:""
  })


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:4100');
        setData(response.data);
      } catch (error) {
        throw error
      }
    };

    fetchData();// Call the fetchData function when the component mounts
  }, []);
 
  const handleonClick =async (iid) => {
    
    try{
      const res = await axios.delete(`http://localhost:4100/delete/${iid}`)
      if(res.data == 'delete'){
        throw res.data
      }else{
        setTimeout(() => {
          notify('Data Deleted')
        }, 500);
        try {
          const response = await axios.post('http://localhost:4100');
          setData(response.data);
        } catch (error) {
          throw error
        }
      }
    }catch(err){
      throw err
    }
  }



  
  const updateData = (i)=> {
    document.querySelector('.updateForm').style.display = 'grid';
    document.querySelector('.name').value = i.name;
    document.querySelector('.email').value = i.email;
    document.querySelector('.phone').value = i.phone;
    document.querySelector('.city').value = i.city;
    setUserData({id:i._id,name:i.name,email:i.email,phone:i.phone,city:i.city})

  }
  const setfun = (e) => {
    setUserData({...userData,[e.target.name]:e.target.value})
    
  }
  const subData =async (e) => {
    e.preventDefault()
    try{
      let res = await axios.put('http://localhost:4100/update' , userData)
      if(res.data){
        document.querySelector('.updateForm').style.display = 'none';
        notify('Data updated')
        

        try {
          const response = await axios.post('http://localhost:4100');
          setData(response.data);
        } catch (error) {
          throw error
        }
        
      }else{
        notify('something went wrong')
      }
    }catch(err){
      throw err
    } 
    

  }
   //gender filter function
   const genderfilter = (e)=> {
    let genders = e.target.value;
    // useEffect(()=> {
      try{
        let res = axios.post('http://localhost:4100/gender',genders)
        if(res.ok){
          console.log(res)
          setData(res.data)
        }else{
          console.log('something went wrong')
        }
      }catch(err){
        throw err
      }
    // },[])
    console.log(e.target.value)
  }



  return (
    <>
    <ToastContainer position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition: Bounce
        />
        <div className='updateForm'>
          <form action="" onSubmit={subData}>
          <div className='inputparent'>
            <input type="text" name='name' placeholder='name' onChange={setfun} className='name'/>
            <input type="email" name='email' placeholder='email' onChange={setfun} className='email'/>
            <input type="number" name='phone' placeholder='phone' onChange={setfun} className='phone'/>
            <input type="text" name='city' placeholder='city' onChange={setfun} className='city'/>

          </div>
          <div className="buttons">
            <button type='submit'>submit</button>
            <button className='close'>close</button>

          </div>
        </form>
        </div>
        
     <div className='dataContainer'>

      <div className='total'>
        <div>Total no. of data is 0{data.length}</div>
      </div>
      <div>
        <input type="checkbox" name='genderm' value='male' onChange={genderfilter}/><label htmlFor="">male</label>
        <input type="checkbox" name='genderf' value='female' onChange={genderfilter}/><label htmlFor="">female</label>
      </div>
      <table width={300} className='table'>
        <thead>
          <tr>
            <th>s.no</th>
            {/* <th>id</th> */}
            <th>name</th>
            <th>email</th>
            <th>phone</th>
            <th>city</th>
            <th>gender</th>
            <th>dob</th>
            <th>date</th>
            <th>qualification</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item,i)=> (
              
              <tr key={i}>
                <td onClick={()=> getDetails(item)}>{i + 1}</td>
                {/* <td>{item._id.toString()}</td> */}
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>+91 {item.phone}</td>
                <td>{item.city}</td>
                <td>{item.gender}</td>
                <td>{item.dob}</td>
                <td>{item.date}</td>
                <td>{item.qualification}</td>
                <span onClick={()=> handleonClick(item._id.toString())} className='cross'>❌</span>
                <span onClick={()=> updateData(item)} className='editPen'>🖊️</span>
              </tr>
            ))
          }
          

        </tbody>
        
      </table>
     </div>
     
    </>
  );
};

export default Admin;
