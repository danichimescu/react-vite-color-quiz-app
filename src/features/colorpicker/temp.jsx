import { useEffect, useState } from 'react';

export function ColorPicker() {
//   const [color, setColor] = useState('#6f6666ff');
// const mycolor = '#6f6666ff';
  const [color, setColor] = useState('#6f6666ff');




  useEffect(() => {

//  <div style={{backgroundColor: color}}></div> 
// document.body.style.backgroundColor = color;
// make a div that fills the screen with the selected color
// const div = document.createElement('div');
// div.style.position = 'fixed';
// div.style.top = '0';
// div.style.left = '0';
// div.style.width = '100%';
// div.style.height = '100%';
// div.style.backgroundColor = color;
// div.style.zIndex = '-1';
// document.body.appendChild(div);

// make a div with class my-div that fills the screen with the selected color
const div = document.createElement('div');
div.className = 'my-div';
// div.style.position = 'fixed';
// div.style.top = '0';
// div.style.left = '0';
div.style.width = '200px';
div.style.height = '1000px';
div.style.border = '1px solid black';
div.style.backgroundColor = color;
// div.style.zIndex = '-1';
document.body.appendChild(div);


// make a rectangle that fills the screen with the selected color
// document.body.style.margin = '0';
// document.body.style.height = '200px';
// document.body.style.width = '1000px';    
// document.body.style.transition = 'background 0.2s ease';
// document.body.style.display = 'flex';
// document.body.style.justifyContent = 'center';
// document.body.style.alignItems = 'center';
// document.body.style.flexDirection = 'column';
// document.body.style.fontFamily = 'Arial, sans-serif';
// document.body.style.color = color;
// document.body.style.textShadow = '1px 1px 2px #000000';
// document.body.style.fontSize = '24px';
// document.body.style.fontWeight = 'bold';
// document.body.style.userSelect = 'none';
// document.body.style.overflow = 'hidden';
// document.body.style.boxSizing = 'border-box';
// document.body.style.padding = '20px';
// document.body.style.backgroundClip = 'border-box';
// document.body.style.backgroundOrigin = 'border-box';
// document.body.style.backgroundRepeat = 'no-repeat';
// document.body.style.backgroundPosition = 'center';
// document.body.style.backgroundSize = 'cover';
// document.body.style.backdropFilter = 'blur(10px)';
// document.body.style.webkitBackdropFilter = 'blur(10px)';
// document.body.style.border = 'none';
    
  }, [color]);

  return (
<>
    <h2>Color Picker</h2>
   
    <div className="my-div" style={{backgroundColor: color}}></div>

    <div style={{ padding: '20px' }}>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ width: '100px', height: '100px', border: 'none', cursor: 'pointer' }}
      />
      <p>Selected Color: {color}</p>
    </div>
</>
  );



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
}