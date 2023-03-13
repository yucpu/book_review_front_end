import React, { useMemo, useState } from 'react'
import { useData } from '../data'
import { Button } from 'antd'
import Icon from '@ant-design/icons';

const OnlineIcon = () => (
  <svg fill="#000000" width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>signal</title>
    <path d="M2 25.25c-0.414 0-0.75 0.336-0.75 0.75v0 4c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-4c-0-0.414-0.336-0.75-0.75-0.75v0zM8.968 19.25c-0.414 0-0.75 0.336-0.75 0.75v0 10c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-10c-0-0.414-0.336-0.75-0.75-0.75v0zM16 13.25c-0.414 0-0.75 0.336-0.75 0.75v0 16c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-16c-0-0.414-0.336-0.75-0.75-0.75v0zM30 1.25c-0.414 0-0.75 0.336-0.75 0.75v0 28c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-28c-0-0.414-0.336-0.75-0.75-0.75v0zM23 7.249c-0.414 0-0.75 0.336-0.75 0.75v0 22.001c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-22.001c-0-0.414-0.336-0.75-0.75-0.75v0z"></path>
  </svg>
)
const OfflineIcon = () => (
  <svg fill="#000000" width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>signal-slash</title>
    <path d="M2 25.25c-0.414 0-0.75 0.336-0.75 0.75v0 4c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-4c-0-0.414-0.336-0.75-0.75-0.75v0zM8.968 19.25c-0.414 0-0.75 0.336-0.75 0.75v0 10c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-10c-0-0.414-0.336-0.75-0.75-0.75v0zM16 20.25c-0.414 0-0.75 0.336-0.75 0.75v0 9c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-9c-0-0.414-0.336-0.75-0.75-0.75v0zM23 27.25c-0.414 0-0.75 0.336-0.75 0.75v0 2c0 0.414 0.336 0.75 0.75 0.75s0.75-0.336 0.75-0.75v0-2c-0-0.414-0.336-0.75-0.75-0.75v0zM30 1.25c-0.414 0-0.75 0.336-0.75 0.75v0 26.189l-5.5-5.5v-14.69c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 13.19l-5.5-5.5v-1.689c0-0.414-0.336-0.75-0.75-0.75s-0.75 0.336-0.75 0.75v0 0.189l-12.72-12.72c-0.135-0.131-0.32-0.212-0.523-0.212-0.414 0-0.75 0.336-0.75 0.75 0 0.203 0.081 0.388 0.213 0.523l27.999 28.001c0.136 0.135 0.324 0.219 0.531 0.219h0c0.104-0.001 0.202-0.021 0.292-0.059l-0.005 0.002c0.274-0.117 0.462-0.383 0.463-0.693v-28c-0-0.414-0.336-0.75-0.75-0.75v0z"></path>
  </svg>
)

function UserLogin() {
  const context = useData();
  const [isHover, setHover] = useState(false);
  const handleAuth = () => {
    if (context.user) {
      context.setUser(null)
    } else {
      context.setUser("12dc1a")
    }
  }
  return useMemo(() => {
    return (
      <Button className="app_user" shape='round' size='large'
        onMouseLeave={() => setHover(false)}
        onMouseEnter={() => setHover(true)}
        onClick={handleAuth}
        icon={isHover ? "" : context.user ? <Icon component={OnlineIcon}/> :<Icon component={OfflineIcon}/> }
      >
        {isHover ? context.user ? "Log out" : "Log in" : ""}

      </Button>
    )
  }, [context.user, isHover])

}
export default UserLogin