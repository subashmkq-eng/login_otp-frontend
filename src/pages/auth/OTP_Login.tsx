import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../../redux/slices/otpslice';
import axiosApi from '../../helper/axiosApi';
import google_logo from '../../../Assets/icons8-google.svg';
import { Toaster } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';
const OTP_Login = () => {

    const email = useSelector((state: any) => state.otp.email);
    const dispatch = useDispatch();

    const [isloading, setIsloading] = useState(false)

    const navigate = useNavigate();

    const goTootp = async () => {
        try {
            setIsloading(true);

            const response = await axiosApi.post("/api/send-mail", {
                to: email,
                subject: "Your OTP Code",
                text: "Here is your OTP code",
            });

            const token = response.data.token;
            localStorage.setItem("otp_token", token);

            if (response.data.success) {
                toast.success("OTP sent successfully!");
                dispatch(setEmail(email));
                navigate("/otp");
            } else {
                toast.error("Failed to send OTP");
            }

        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("Something went wrong while sending OTP!");
        } finally {
            setIsloading(false);
        }
    };


    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Get user info from Google API
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });

                const userEmail = userInfo.data.email;
                console.log('Selected Gmail:', userEmail);

                // Send OTP using your backend
                const sendRes = await axiosApi.post("send-mail", {
                    to: userEmail,
                    subject: 'Your OTP Code',
                    text: 'Here is your OTP code',
                });

                const token = sendRes.data.token;
                localStorage.setItem("otp_token", token);

                dispatch(setEmail(userEmail));
                navigate("/otp");
                console.log("OTP sent to:", userEmail);
            } catch (err) {
                console.error("Google login OTP error:", err);
            }
        },
    });

    return (
        <>
            <div style={{ height: '100vh', width: '100vw', backgroundColor: '#f5f7f9', color: '#fff', justifyContent: 'center', alignItems: 'center', display: 'flex', gap: '20px', flexDirection: 'column' }}>

                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', padding: '0px 20px', width: '80%', }}>
                    <div style={{ fontWeight: '600', fontSize: '32px', color: '#5d5f5f' }}>Enter your email</div>
                    <div style={{ fontWeight: '400', fontSize: '18px', color: '#5d5f5f', textAlign: 'center', padding: ' 20px 10px 0px 10px ' }}>
                        Please enter your email to receive the verification code.
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px 20px 0px 20px',
                        width: '80%',
                    }}
                >
                    <Input
                        value={email}
                        placeholder="Enter your email"
                        disableUnderline
                        sx={{
                            backgroundColor: '#fff',
                            width: '400px',
                            height: '40px',
                            borderRadius: '5px',
                            fontFamily: 'cursive',
                            px: 2,
                            fontSize: '14px',
                            color: '#000',
                            border: '1px solid #ccc',
                            outline: 'none',
                            '&:hover': {
                                borderColor: '#888',
                            },
                            '&:focus-within': {
                                borderColor: '#4846ed',
                                boxShadow: '0 0 5px rgba(72, 70, 237, 0.5)',
                            },
                        }}
                        onChange={(e: any) => dispatch(setEmail(e.target.value))}
                    />


                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 20px 0px 20px', width: '80%', }}>
                    <Button
                        style={{
                            color: '#fff',
                            backgroundColor: email ? '#4846ed' : '#a0a0a0',
                            border: 'none',
                            height: '40px',
                            width: '300px',
                            borderRadius: '50px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            fontSize: '14px',
                            fontWeight: '400',
                            fontFamily: 'cursive',
                            cursor: email ? 'pointer' : 'not-allowed',
                            transition: '0.3s ease',
                        }}
                        onClick={goTootp}
                        disabled={!email}
                    >
                        Get OTP
                    </Button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px', width: '80%', }}>
                    <div style={{ fontWeight: '400', fontSize: '15px', color: '#5d5f5f' }}>
                        or Verify With
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px', width: '80%', }}>
                    <div style={{ fontWeight: '400', fontSize: '18px', color: '#5d5f5f', gap: '30px', display: 'flex' }}>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '400', fontSize: '20px', gap: '10px', border: '1px solid #ccc', width: '280px', height: '40px', borderRadius: '5px', cursor: 'pointer' }}
                            onClick={() => login()}>
                            <img src={google_logo} alt="Logo" style={{ width: '30px', height: '30px' }} />
                            <div>Google</div>
                        </div>

                    </div>
                </div>
            </div>
            {isloading && <Loader />}

            <Toaster position="top-center" reverseOrder={false} />


        </>
    )
}


export default OTP_Login
