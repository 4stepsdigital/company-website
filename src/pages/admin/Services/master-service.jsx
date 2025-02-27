import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCirclePlus,
  faTrash,
  faSave,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import AdminLayout from "@/Component/admin/AdminLayout";

function MasterSolution() {
  const [solution, setSolution] = useState(""); // Solution name state
  const [solutionsList, setSolutionsList] = useState([]); // List of solutions
  const [editSolutionId, setEditSolutionId] = useState(null); // Edit solution id
  const [editSolutionValue, setEditSolutionValue] = useState("");// Edit solution value
  const [serviceId,setServiceId]=useState(null);
  const [description,setDescription]=useState("");

  // Fetch solutions on component mount
  useEffect(() => {
    const fetchSolutions = async () => {
      const response = await fetch("/api/service/master-service");
      const data = await response.json();
      setSolutionsList(data.data); // Set fetched solutions
    };

    fetchSolutions();
  }, []);

  // Handle input change for solution name
  const handleSolutionChange = (e) => setSolution(e.target.value);

  // Handle form submission to add a new solution
  const handleSubmitSolution = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/service/master-service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: solution }),
    });

    if (response.ok) {
      const newSolution = await response.json();
      setSolutionsList([...solutionsList, newSolution.data]); // Add new solution to list
      setSolution(""); // Clear input field
      alert("Service  added successfully!");
    }
  };

  // Toggle edit mode for a solution
  const toggleEditSolution = (id) => {
    if (editSolutionId === id) {
      setEditSolutionId(null);
      setEditSolutionValue("");
    } else {
      setEditSolutionId(id);
      const solutionToEdit = solutionsList.find((item) => item._id === id);
      setEditSolutionValue(solutionToEdit.name);
    }
  };

  // Save the edited solution
  const saveEditSolution = async (id) => {
    try {
      const response = await fetch(`/api/service/master-service`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id, // Send the id here
          name: editSolutionValue, // Send the updated name here
        }),
      });

      if (response.ok) {
        const updatedSolution = await response.json();
        const updatedSolutions = solutionsList.map(
          (item) => (item._id === id ? updatedSolution.data : item) // Update the solution
        );
        setSolutionsList(updatedSolutions); // Update the solutions list
        setEditSolutionId(null);
        setEditSolutionValue("");
        alert("Solution updated successfully!");
      } else {
        const errorResponse = await response.json();
        alert(`Error updating solution: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error updating solution:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  // Handle solution deletion
  const handleDeleteSolution = async (id) => {
    const response = await fetch(`/api/service/master-service?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const filteredSolutions = solutionsList.filter((item) => item._id !== id);
      setSolutionsList(filteredSolutions);
      alert("Solution deleted successfully!");
    }
  };

  // console.log("handle Submit data is here ----> ",description);

  useEffect(()=>{
    // console.log("service id is as -----> ",serviceId)
    if(serviceId){
    const data=solutionsList?.filter(res=>res?._id===serviceId);
    if(data?.length>0){
      setDescription(data?.[0]?.description||"")
    }
    }
  },[serviceId])

  const handleSubmitDescription=async (e)=>{
    e.preventDefault();
    if(!serviceId){
      return alert("serviceId not accessed")
    }
    try {

      const res=await fetch(`/api/service/add-description-to-master`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({description,serviceId})
      })

      if(res?.ok){
        alert("description data saved in the service")
        setServiceId(null);
      }
      
    } catch (error) {
      alert(`something went wrong ${error}`)
    }
  }

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 rounded">
        <div className="shadow-[0_0px_10px_-3px_rgba(0,0,0,0.3)] p-4 rounded-md bg-white border-l-2 border-teal-600">
          <div>
            <form
              onSubmit={handleSubmitSolution}
              className="flex items-end gap-3"
            >
              <div className="grow flex flex-col">
                <label htmlFor="solution" className="mb-2 pl-2 font-semibold">
                  Services
                </label>
                <input
                  id="solution"
                  value={solution}
                  onChange={handleSolutionChange}
                  placeholder="Enter Solution"
                  className="border rounded-md px-2 h-8"
                />
              </div>
              <button type="submit" className="text-xl cursor-pointer">
                <FontAwesomeIcon icon={faCirclePlus} />
              </button>
            </form>

            {/* Display solutions */}
            <div className="mt-3 max-h-[300px] overflow-y-auto p-3">
              {solutionsList.map((item, index) => (
                <div key={item._id} className="flex justify-between mt-2">
                  <p>
                    {editSolutionId === item._id ? (
                      <input
                        className="border rounded-md h-8 px-2"
                        value={editSolutionValue}
                        onChange={(e) => setEditSolutionValue(e.target.value)}
                      />
                    ) : (
                      <span className=" capitalize">
                        {index + 1}. {item.name}
                      </span>
                    )}
                  </p>

                  <div className="flex gap-2">
                  {
                    (serviceId=== item._id)?<button onClick={() => {setServiceId(null)}}>
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="hover:text-primary"
                    />
                  </button>:<button onClick={() => {setServiceId(item._id)}}>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="hover:text-primary"
                      />
                    </button>
                  }
                    {editSolutionId === item._id ? (
                      <button onClick={() => saveEditSolution(item._id)}>
                        <FontAwesomeIcon
                          icon={faSave}
                          className="text-green-600"
                        />
                      </button>
                    ) : (
                      <button onClick={() => toggleEditSolution(item._id)}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="hover:text-primary"
                        />
                      </button>
                    )}
                    <button onClick={() => handleDeleteSolution(item._id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="hover:text-primary"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
         
        </div>
        {serviceId&& <div className="shadow-[0_0px_10px_-3px_rgba(0,0,0,0.3)] p-4 rounded-md bg-white border-l-2 border-teal-600">
          <div>
            <form
              onSubmit={handleSubmitDescription}
              className="flex flex-col gap-3"
            >
              <div className="grow flex flex-col">
                <label htmlFor="solution" className="mb-2 pl-2 font-semibold">
                  Services Description
                </label>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)}  className="border rounded-md px-2 h-40 outline-none focus:border-orange-400"></textarea>
              </div>
              <button type="submit" className="w-full px-2 py-1 bg-black text-white">Save</button>
            </form>
          </div>
         
        </div>}
      </div>
    </AdminLayout>
  );
}

export default MasterSolution;
