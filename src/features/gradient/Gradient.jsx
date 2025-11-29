import { useState } from 'react';
import clsx from 'clsx';
// import styles from './Colorpicker.module.css';
import styles from '../mystyles.module.css';


export function Gradient() {
    const [color1, setColor1] = useState('#ffffffff');
    const [color2, setColor2] = useState('#ffffffff');

    return (
        <>
        <button onClick={() => window.location.href = "/"} >Home</button>
            <div className={styles.bodyHome}>
                <div className={styles.container}>
                    <h2>Colors Picker for gradient</h2>
                    <div className={styles.boxBig} style={{ background: `linear-gradient(to right, ${color1}, ${color2})` }}>

                    </div>
                    <div className={styles.pickers}>
                        <div className={styles.box}>
                            <input
                                type="color"
                                value={color1}
                                onChange={(e) => setColor1(e.target.value)}
                                style={{ width: '75px', height: '75px', border: 'none', cursor: 'pointer' }}
                            />
                            <h3>Selected Color: {color1}</h3>
                        </div>
                      
                        <div className={styles.box}>
                            <input
                                type="color"
                                value={color2}
                                onChange={(e) => setColor2(e.target.value)}
                                style={{ width: '75px', height: '75px', border: 'none', cursor: 'pointer' }}
                            />
                            <h3>Selected Color: {color2}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

//   useEffect(() => {

//     document.body.style.backgroundColor = color;
//   }, [color]);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Color Picker</h2>
//       <input
//         type="color"
//         value={color}
//         onChange={(e) => setColor(e.target.value)}
//         style={{ width: '100px', height: '100px', border: 'none', cursor: 'pointer' }}
//       />
//       <p>Selected Color: {color}</p>
//     </div>
//   );
// }