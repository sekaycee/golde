import { Outlet } from 'react-router-dom'

const DashLayout = () => {
  return (
    <>
      <div className="dash-container">
        <Outlet />
      </div>
    </>
  )
}

export default DashLayout
