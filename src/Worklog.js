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
    const apiUrl = "https://worklog-server-s3y8.onrender.com"

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
    const handleEdit = (item) =>{
        setEditId(item._id);
        setEditTitle(item.title);
        setEditDescription(item.description);
        setEditWorking_hours(item.working_hours);
    }

    const handleUpdate = ()=>{
        setError("")
        if(editTitletitle.trim() !== '' && editDescriptiondescription.trim() !== '' ){
            fetch(apiUrl + "/worklogs"+editId,{
                method: "PUT",
                headers:{
                    'content-Type' : 'application/json'
                },
                body : JSON.stringify({editTitle,editDescription,editWorking_hours})
            }).then((res)=>{
                if(res.ok){
                    const updatedWorklog = worklog.map((item)=>{
                        if(item.id== editId){
                            item.title = editTitle;
                            item.description =editDescription;
                            item.working_hours = editWorking_hours;
                        }
                        return item;
                    })
                    setWorklog(updatedWorklog)
                    setMessage("Log updated successully")
                    setTimeout(() => {
                        setMessage("");  
                    },3000);
                    setEditId(-1)
                }else{
                    setError("Unable to create New Log ")
                }
               
            }).catch(()=>{
                setError("Unable to create new log")
            })
        
        }
    }

    const handleEditCancel = ()=>{

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
                    <div className="d-flex flex-column me-2 ">
                        {
                            editId == -1 || editId !== item._id ? <>
                                <span className="fw-bold">{item.title}</span>
                                <span>{item.description}</span>
                            </> : <>
                                <div className="form-group d-flex gap-2">
                                    <input placeholder="Title" onChange={(e) => setEditTitle(e.target.value)} value={editTitle} className="form-control" type="text"></input>
                                    <input placeholder="description" onChange={(e) => setEditDescription(e.target.value)} value={editDescription} className="form-control" type="text"></input>
                                    <input placeholder="Time" onChange={(e) => setEditWorking_hours(e.target.value)} value={editWorking_hours} className="form-control" type="time"></input>
                                </div>
                            </>
                        }
                    </div>
                    <div className="d-flex gap-2">
                        { editId == -1 ?<button className="btn btn-warning" onClick={ ()=>handleEdit(item)}> Edit </button> : <button className="btn btn-warning" onClick={handleUpdate}>Update</button> }
                        { editId == -1 ?<button className="btn btn-danger">Delete</button> :
                        <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button> }
                    </div>
                </li>)
            }
            </ul>
        </div>
    </>
}
//from handleUpdate.
