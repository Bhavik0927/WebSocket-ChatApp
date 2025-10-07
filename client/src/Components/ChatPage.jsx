import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ChatPage = () => {

  const navigate = useNavigate();

  const handleLogout = async () =>{
    try {
      const response = await axios.post("http://localhost:5000/api/user/logout",{},{
        withCredentials:true,
      })
      navigate('/');
      toast.success("Logout Successfully")
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <button onClick={handleLogout}>LogOut</button>
    </div>
  )
}

export default ChatPage