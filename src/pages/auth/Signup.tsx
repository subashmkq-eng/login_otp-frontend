import { Button, Checkbox, Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosApi from "../../helper/axiosApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/loginslice";

const Signup = () => {

  const navigate = useNavigate();


  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const [checked, setChecked] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    axiosApi.get('/api/hello')
      .then((response: any) => {
        setData(response.data.message);
        console.log('Backend response:', response.data);
      })
      .catch((error: any) => {
        console.error('Error connecting to backend:', error);
      });
  }, []);

  const dispatch = useDispatch();


  const handlesubmit = () => {

    dispatch(loginSuccess());
    navigate("/dashboard");
    console.log(data);
  }
  return (
    <>
      <div style={{ backgroundColor: '#210435ff', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <div style={{ backgroundColor: "transparent", height: '70vh', width: '70vw', borderRadius: '10px', display: 'flex', flexDirection: 'row', padding: '15px', gap: '5px' }}>

          <div style={{ backgroundColor: '#11001c', height: '100%', width: '50%', borderRadius: '10px' }}>

          </div>
          <div style={{ backgroundColor: '#11001c', height: '100%', width: '50%', borderRadius: '10px', display: 'flex', flexDirection: 'column', paddingRight: '20px', paddingLeft: '20px', gap: '10px' }}>


            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                <div style={{ display: 'flex', flexDirection: 'column', }}>
                  <p style={{ color: 'white', fontSize: '48px', fontWeight: 600 }}>Create an Account</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', paddingLeft: '10px' }}>
                <p style={{ color: 'grey' }}>Already have an account?</p>
                <Link to="/login" style={{ color: '#660099' }}>Login</Link>
              </div>

            </div>


            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '40px', paddingRight: '40px', gap: '20px' }}>

              <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between', gap: '15px' }}>
                <Input
                  height={'50px'}
                  maxWidth={'300px'}
                  placeholder="First Name"
                  color="#d7b8ff"
                  background={'#301e47ff'}
                  borderColor="#401d6eff"
                  focusRingColor="#d7b8ff"
                  _hover={{ borderColor: "#401d6eff" }}
                  _active={{ borderColor: "#401d6eff" }}
                  _placeholder={{ color: "#d7b8ff" }}
                  onChange={handleInputChange}
                />
                <Input
                  height={'50px'}
                  placeholder="Last Name"
                  color="#d7b8ff"
                  background={'#301e47ff'}
                  borderColor="#401d6eff"
                  focusRingColor="#d7b8ff"
                  _hover={{ borderColor: "#401d6eff" }}
                  _active={{ borderColor: "#401d6eff" }}
                  _placeholder={{ color: "#d7b8ff" }}
                  onChange={handleInputChange}
                />


              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'space-between' }}>
                <Input
                  height={'50px'}
                  placeholder="Email"
                  color="#d7b8ff"
                  background={'#301e47ff'}
                  borderColor="#401d6eff"
                  focusRingColor="#d7b8ff"
                  _hover={{ borderColor: "#401d6eff" }}
                  _active={{ borderColor: "#401d6eff" }}
                  _placeholder={{ color: "#d7b8ff" }}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'space-between' }}>
                <Input

                  type="password"
                  height={'50px'}
                  placeholder="Enter your Password"
                  color="#d7b8ff"
                  background={'#301e47ff'}
                  borderColor="#401d6eff"
                  focusRingColor="#d7b8ff"
                  _hover={{ borderColor: "#401d6eff" }}
                  _placeholder={{ color: "#d7b8ff" }}
                  onChange={handleInputChange}
                />
              </div>

            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '40px', gap: '5px' }}>
              <Checkbox.Root checked={checked} onCheckedChange={() => setChecked(!checked)}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>I agreee to the</Checkbox.Label>
              </Checkbox.Root>
              <Link to="/login" style={{ color: '#660099' }}>Terms & Conditions</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '40px', gap: '5px' }} >
              <Button
                disabled={!checked}
                width={'90%'}
                height={'50px'}
                backgroundColor={'#350066'}
                color={'white'}
                _hover={{ backgroundColor: '#401d6eff' }}
                onClick={handlesubmit}
              >
                Create Account
              </Button>
            </div>


          </div>

        </div>
      </div>
    </>
  )
}

export default Signup



