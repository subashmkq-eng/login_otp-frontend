
import { ThreeDot } from "react-loading-indicators";

const Loader = () => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "transparant",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                backdropFilter: "blur(1px)",
            }}
        >
            {/* <Commet color="#a0a0a0" size="medium" text="" textColor="#4846ed" /> */}
            {/* <OrbitProgress variant="spokes" color="#a0a0a0" size="medium" text="" textColor="" /> */}
            <ThreeDot variant="brick-stack" color="#a0a0a0" size="medium" text="" textColor="" />
        </div>
    );
};

export default Loader;
