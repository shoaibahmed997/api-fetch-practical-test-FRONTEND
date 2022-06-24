import React, { useState,useEffect } from 'react'
import {Button} from '@mui/material'
import { Link } from 'react-router-dom'
import {TableContainer,TableBody,Table,TableCell,TableRow,TableHead,Paper} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { baseurl } from '../helper/urls';

const List = () => {
  const [companies,setcompanies] = useState([])
  const fetchdata = async()=>{
    try {
      const req = await fetch(`${baseurl}/api/all`)
      const res = await req.json()
      setcompanies(res.data)
    } catch (error) {
      alert(error)
    }
  }
  useEffect(()=>{
    fetchdata()
  },[])

  const handleDelete = async(cin)=>{
      try {
        const req = await fetch(`${baseurl}/api/delete/${cin}`)
        const res = await req.json()
        fetchdata()
      } catch (error) {
        alert(error)
      }
  }


    return (
        <div className='searchpage'>
        <div>
           <Link to='/search'> <Button variant='contained' color='secondary'>Add Company</Button></Link>
        </div>
        <div style={{padding:"40px"}}>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead sx={{background:"#1e1e1e"}}>
                <TableRow>
                    <TableCell sx={{color:"white"}}>Company Name</TableCell>
                    <TableCell sx={{color:"white"}}>CIN Number</TableCell>
                    <TableCell sx={{color:"white"}}>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {companies && companies.map((item,index)=>(
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}> 
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.cin}</TableCell>
                      <TableCell><DeleteIcon onClick={()=>handleDelete(item.cin)} sx={{color:"#eb0014"}} className='DeleteIcon' /> </TableCell>
                    </TableRow>
                  ))
                }
            </TableBody>
          </Table>
        </TableContainer>
        </div>
    </div>
  )
}

export default List