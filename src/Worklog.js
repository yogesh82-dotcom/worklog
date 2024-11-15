import { useEffect, useState } from "react"

export default function Worklog(){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [working_hours, setWorking_hours] = useState('');
    const [worklog , setWorklog] = useState([])
    const [error, setError] = useState("")
    const [message ,  setMessage] = useState("")
    const [editId, setEditId] = useState(-1);

    //edit

    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editWorking_hours, setEditWorking_hours] = useState('');
    const apiUrl = "http://localhost:8000"

    const handleSubmit = ()=>{
        setError("")
        if(title.trim() !== '' && description.trim() !== '' ){
            fetch(apiUrl + "/worklogs",{
                method: "POST",
                headers:{
                    'content-Type' : 'application/json'
                },
                body : JSON.stringify({title,description,working_hours})
            }).then((res)=>{
                if(res.ok){
                    setWorklog([...worklog,{title,description,working_hours}])
                    setMessage("Log added successully")
                    setTimeout(() => {
                        setMessage("");  
                    },3000);
                }else{
                    setError("Unable to create New Log ")
                }
               
            }).catch(()=>{
                setError("Unable to create new log")
            })
        
        }
    }

    useEffect(()=>{
        getItems()
    }, [])

    const getItems = ()=>{
        fetch(apiUrl + "/worklogs")
        .then((res)=> res.json())
        .then((res)=>{
            setWorklog(res)
        })
    }


    const handleUpdate = ()=>{

    }

    return <>
        <div className="p-4 bg-success text-light ">
            <h1><center>Worklog Website using MERN stack</center></h1>
        </div>
        <div >
            <h3>Add new log</h3>
            {message && <p className="text-success">{message}</p>}
            <div className="form-group d-flex gap-2">
                <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" type="text"></input>
                <input placeholder="description" onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" type="text"></input>
                <input placeholder="Time" onChange={(e) => setWorking_hours(e.target.value)} value={working_hours} className="form-control" type="time"></input>
                <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="row mt-3">
            <h3>Worklogs</h3>
            <ul className="list-group">
            {
                worklog.map((item) => <li className="list-group-item text-white bg-dark d-flex justify-content-between align-items-center my-2">
                    <div className="d-flex flex-column">
                        {
                            editId == -1 || editId !== item._id ? <>
                                <span className="fw-bold">{item.title}</span>
                                <span>{item.description}</span>
                            </> : <>
                                <div className="form-group d-flex gap-2">
                                    <input placeholder="Title" onChange={(e) => setEditTitle(e.target.value)} value={title} className="form-control" type="text"></input>
                                    <input placeholder="description" onChange={(e) => setEditDescription(e.target.value)} value={description} className="form-control" type="text"></input>
                                    <input placeholder="Time" onChange={(e) => setEditWorking_hours(e.target.value)} value={working_hours} className="form-control" type="time"></input>
                                </div>
                            </>
                        }
                    </div>
                    <div className="d-flex gap-2">
                        { editId == -1 || editId !== item._id ? <button className="btn btn-warning" onClick={ ()=>setEditId(item._id)}> Edit </button> : <button className="btn btn-warning" onClick={handleUpdate}>Update</button> }
                        <button className="btn btn-danger">Delete</button>
                    </div>
                </li>)
            }
            </ul>
        </div>
    </>
}

