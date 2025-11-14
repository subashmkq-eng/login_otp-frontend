import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/loginslice"


const Dashboard = () => {

  const dispatch = useDispatch();
  const handleclick = () => {
    console.log('first')
    dispatch(logout());
  }
  return (
    <>
      <div>Dashboard</div>
      <button onClick={handleclick}> test</button>
    </>
  )
}

export default Dashboard