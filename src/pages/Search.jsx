import { Autocomplete, Button, TextField } from '@mui/material'
import React, { useState,useEffect } from 'react'
import {debounce} from 'lodash'
import { useNavigate} from 'react-router-dom'
import { baseurl,proxyurl,DataFetchUrl } from '../helper/urls'

// NOTE - The provided backend url provided with assignemnt cannot fetch due to the cors policy of browser
// so to solve this issue i implemented a proxy app with my heroku account. Any Request made first goes to 
// proxy server setup at proxy url and that proxy server redirectly and fetches the data from zaubacorp backend url
// and returns the result. Another solution for this issue is mentioned in the backend part of this application.


const domparser = new DOMParser()


const Search = () => {
    const [value,setvalue] = useState("")
    const [options,setoptions] = useState([])
    const [selected,setSelected] = useState("")
    let navigate = useNavigate()

    // This Function converts the html received from the zoubacorp to object with label,cin and id 
    // that can be seen in the autocomplete dropdown
    const domToObject = (htmlcol)=>{
        const results = []
        for(let i=0;i<htmlcol.length;i++){
            let cinextract = htmlcol.item(i).id.split('/')
            let obj = {id:i, label:htmlcol.item(i).innerText, cin:cinextract[2]}
            results.push(obj)
        }

        setoptions(prev=>([...options,...results]))
    }

    //  This Function helps store the selected company in the database
    const handleSubmit = async()=>{
        if (!selected.name && !selected.cin) return 
        try {
            const req = await fetch(`${baseurl}/api/create`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({name:selected.label,cin:selected.cin})
            })
            const res = await req.json()
            navigate('/')
        } catch (error) {
            console.log(error)
        }


    }

    // This function Fetches the data stored in database
    const fetchData = async()=>{
        try {
            const req = await fetch(proxyurl+ DataFetchUrl,{
                method:"POST",
                body:JSON.stringify({search:value,filter:"company"}),
                headers:{"x-requested-with":"XMLHttpRequest","Content-Type":"application/json"}
            })
            const res = await req.text()
            const html = domparser.parseFromString(res,"text/html")
            const result = html.getElementsByTagName("div")
            domToObject(result)

        } catch (error) {
            console.log(error)
        }
    }

    // DEBOUNCING HELPER FUNCITON
    const handleText = (e)=>{
        deb(e.target.value)
    }

    //  DEBOUNCE FUNCTION FOR OPTIMIZATION AND REDUCING THE NETWORK CALLS MADE
    const deb = debounce((text)=>{
        setvalue(text)
    },300)

    useEffect(() => {
        fetchData()
       
    }, [value]);
  return (
    <div className='search'>
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        onChange={(e,newValue)=>{setSelected(newValue)}} 
        value={selected}
        sx={{ width: 600 }}
        renderInput={(params) => <TextField onChange={handleText}  {...params} label="Seach Company" />}
        />
        <Button onClick={handleSubmit} variant='contained' color="secondary">Submit</Button>
    </div>
  )
}

export default Search