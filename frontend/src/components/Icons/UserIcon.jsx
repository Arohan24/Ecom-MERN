import React from 'react'
import { useTheme } from '../../utils/context/ThemeContext'

const UserIcon=({hover})=>{
  const theme=useTheme()
  return (
    <div
      style={{ display: 'inline-block' }}
    >
      <svg
        stroke={theme.color}
        fill={hover ? theme.hover.color : theme.color}
        strokeWidth="0"
        viewBox="0 0 448 512"
        color={theme.color}
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: hover ? theme.hover.color : theme.color }}
      >
        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z"></path>
      </svg>
    </div>
  )
}

export default UserIcon;





