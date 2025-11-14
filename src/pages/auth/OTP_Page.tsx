import { Button } from 'primereact/button'
import OtpInput from 'react-otp-input';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosApi from '../../helper/axiosApi';
import { loginSuccess } from '../../redux/slices/loginslice';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const OTP_Page = () => {

    const email = useSelector((state: any) => state.otp.email);

    const [otp, setOtp] = useState<string>('');
    const [seconds, setSeconds] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [isloading, setIsloading] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goTologin = async () => {
        navigate("/login");
    };



    const Verify_otp = async () => {
        try {
            setIsloading(true);

            const token = localStorage.getItem("otp_token"); // << FIX

            const res = await axiosApi.post("/verify-otp", {
                email,
                otp,
                token
            });

            if (res.data.success) {
                toast.success("OTP verified successfully!");
                dispatch(loginSuccess());
                navigate("/dashboard");
            } else {
                toast.error("Invalid OTP. Please try again.");
                console.log(res, "response");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            toast.error("Something went wrong during verification!");
        } finally {
            setIsloading(false);
        }
    };


    const handleResendOTP = async () => {

        try {
            setIsloading(true);

            const response = await axiosApi.post("/send-mail", {
                to: email,
                subject: "Your OTP Code",
                text: "Here is your OTP code",
            });

            if (response.data.success) {
                toast.success("OTP sent successfully!");

            } else {
                toast.error("Failed to send OTP");
            }
            setSeconds(30);
            setCanResend(false);

        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("Something went wrong while sending OTP!");
        } finally {
            setIsloading(false);
        }
    };

    const formatTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const remainingSeconds = secs % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };

    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [seconds]);

    return (
        <>
            <div style={{ height: '100vh', width: '100vw', backgroundColor: '#f5f7f9', color: '#fff', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>

                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                    <div style={{ fontWeight: '600', fontSize: '32px', color: '#5d5d5d' }}>Check Your email</div>
                    <div style={{ fontWeight: '400', fontSize: '18px', color: '#a1a3a5', textAlign: 'center', padding: '10px' }}>
                        Please enter the four digit verification code we sent to
                        <br />
                        <p style={{ fontWeight: 'bold', margin: '0px', color: '#5d5d5d' }}>{email}</p>

                    </div>
                </div>
                <div>
                    <div style={{ marginBottom: '20px' }}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            inputStyle={{
                                borderRadius: '50%',
                                height: '50px',
                                width: '50px',
                                marginRight: '10px',
                                marginLeft: '10px',
                                border: '1px solid transparent',
                                backgroundColor: '#eeeeee',
                                color: '#000',
                                fontSize: '20px',
                                fontFamily: 'cursive',
                                textAlign: 'center',
                                outline: 'none',
                                transition: 'all 0.2s ease-in-out',
                            }}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#4846ed';
                                        e.target.style.boxShadow = '0 0 10px #4846ed';
                                        e.target.style.backgroundColor = '#fff';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'transparent';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.backgroundColor = '#eeeeee';
                                    }}
                                />
                            )}
                            shouldAutoFocus
                            renderSeparator={<span>-</span>}
                        />
                    </div>


                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <Button
                        style={{
                            color: '#fff',
                            backgroundColor: '#4846ed',
                            border: 'none',
                            height: '40px',
                            width: '300px',
                            fontFamily: 'cursive',
                            borderRadius: '50px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            fontSize: '14px',
                            fontWeight: '400',
                        }}
                        onClick={Verify_otp}
                    >
                        Confirm
                    </Button>

                </div>
                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>

                    <div
                        style={{
                            fontWeight: 400,
                            fontSize: '18px',
                            color: '#5d5f5f',
                            textAlign: 'center',
                            padding: '10px',
                        }}
                    >
                        {!canResend ? (
                            <>Don’t get the code? Resend in {formatTime(seconds)}</>
                        ) : (
                            <span
                                onClick={handleResendOTP}
                                style={{
                                    color: '#4846ed',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                }}
                            >
                                Resend OTP
                            </span>
                        )}
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#5d5f5f', textAlign: 'center', padding: '10px', display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
                        onClick={goTologin}>
                        &#8617; back
                    </div>
                </div>


            </div>
            {isloading && <Loader />}

            <Toaster position="top-center" reverseOrder={false} />
        </>
    )
}


export default OTP_Page

