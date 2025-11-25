// import { ColorPicker } from "./features/colorpicker/ColorPicker";
// import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;
// console.log("API URL:", apiUrl+ "colorpicker"); 
// import styles from './Colorpicker.module.css';
import styles from '../mystyles.module.css';

                    // {/* <button href="http://localhost:5173/colorpicker">Go to Color Picker</button> */}
                    // {/* <a href="http://localhost:5173/colorpicker">Go to Color Picker</a> */}

export function Homepage() {
    return (
        <>
            <div className={styles.body}>
                <div className={styles.container}>
                    <h1>Welcome to the page for homework!</h1>

                    <button onClick={() => window.location.href = apiUrl + "colorpicker"} >Go to Color Picker</button>

                    <button onClick={() => window.location.href = apiUrl + "gradient"} >Go to Gradient</button>
                    
                    <button onClick={() => window.location.href = apiUrl + "simpleform"} >Go to Simple form</button>
                    
                    <button>Go to Simple form with submit button</button>
                    <button>Go to Another Feature</button>
                    <button>Go to Quiz</button>
                </div>
            </div>
        </>
    );

}
//   <button onClick={() => navigate("/colorpicker")} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition">Go to Color Picker</button>
//     </div>

{/* <button onClick={() => window.location.href = "http://localhost:5173/colorpicker"} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition">Go to Color Picker</button>
    </div> */}
