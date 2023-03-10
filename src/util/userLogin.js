import React, { useState } from 'react'
import { useData } from '../data'
import { Button, Input } from 'antd'

function UserLogin() {
    const context = useData();
    const [isHover, setHover] = useState(false);
    const handleAuth =()=>{
        if(context.user){
          context.setUser(null)
        }else{
          context.setUser("12dc1a")
        }
      }
    return(
        <Button className="app_user" shape='round' size='large' 
        onMouseLeave={()=>setHover(false)} 
        onMouseEnter={()=>setHover(true)}
        onClick={handleAuth}
        icon={isHover ? "":context.user ? "Q":"W"}
        >
          {isHover ? context.user ? "Log out":"Log in":""}
        </Button>
    )
}

export default UserLogin