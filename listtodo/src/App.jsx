import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [inputVal, setInputVal] = useState("")
  const [isId, setIsId] = useState(null)
  const [card, setCard] = useState([])
  const [isClick, setIsClick] = useState("Submit")

  function handleInput(e) {
    const val = e.target.value;
    setInputVal(val)
  }

  function udateBtn(id, name) {
    setIsId(id);
    setInputVal(name);
    setIsClick("Update")
  }

  const fetchData = async () => {
    try {
      await fetch("http://localhost:3000/add-data", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ firstName: inputVal })
      })
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-data");
      const data = await response.json();
      setCard(data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => { getData() }, [])

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/delete-data/${id}`, {
        method: "delete",
      })
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdate = async (id) => {
    try {
      await fetch(`http://localhost:3000/data-update/${id}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({ firstName: inputVal })
      })
      getData()
    } catch (err) {
      console.log(err);
    }
  }

  function handleSubmit() {
    if (!inputVal) {
      alert("enter task first");
      return;
    }
    if (isId) {
      handleUpdate(isId)
    } else {
      fetchData();
    }

    setInputVal("");
  }
  
  return (
    <>
      <div className='m-auto w-[500px] pt-20'>
        <div className='flex gap-10 pb-5'>
          <input type="text" autoFocus value={inputVal} placeholder='Enter your task' onChange={handleInput} className='border p-1 w-[300px]' />
          <button className='text-white bg-black rounded-md p-1' onClick={handleSubmit}>{isClick}</button>
        </div>
        <div>
          {
            card.map((ele) => {
              return (
                <div key={ele?.firstName} className='my-1 w-[500px] bg-black text-white mx-auto p-2 rounded-md text-start flex justify-between items-center'>
                  {ele?.firstName}
                  <button onClick={() => handleDelete(ele._id)}>Delete</button>
                  <button onClick={() => udateBtn(ele._id, ele.firstName)}>Update</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
