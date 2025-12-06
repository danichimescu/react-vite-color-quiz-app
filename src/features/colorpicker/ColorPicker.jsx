import { useState } from 'react';
import clsx from 'clsx';
// import styles from './Colorpicker.module.css';
import styles from '../mystyles.module.css';


export function ColorPicker() {
    const [color, setColor] = useState('#ffffffff');

    //  <div style={{ backgroundColor: '#756f6fff', height: '50vh', width: '50vw', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '50px' }}>
    //  <div style={{backgroundColor: color}}></div> 
    //  <h1 className={styles.bigblue}>Hello Car!</h1>;

    // asta e ok
    {/* <div style={{ backgroundColor: color, height: '25vh', width: '25vw', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '50px' }}> sssss </div> */ }

    // <div style={{backgroundColor: color}}>ceva</div>
    //<div className={`${styles.boxBig} ${styles.back}`} >
    return (
        <>
         <button onClick={() => window.location.href = "/"} >Home</button>
            <div className={styles.bodyColorpicker}>
                <div className={styles.container}>
                    <h2>Color Picker</h2>
                    <div className={styles.boxBig} style={{backgroundColor: color}}>  
                    
                    </div>
                    <div className={styles.box}>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{ width: '75px', height: '75px', border: 'none', cursor: 'pointer' }}
                        />
                        <h3>Selected Color: {color}</h3>
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