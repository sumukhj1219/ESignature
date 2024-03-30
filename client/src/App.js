import { Download, Eraser } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#561ecb");

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const download = document.getElementById('download');
    const eraser = document.getElementById('clear')

    const handleDownload = () => {
      const dataUrl = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'canvas_image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    const handleMouseDown = (e) => {
      setIsDrawing(true);
      context.beginPath();
      context.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      context.lineTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      context.lineWidth = 3;
      context.stroke();
    };

    const handleDelete=()=>{
      context.clearRect(0, 0, canvas.width, canvas.height);
	}

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    download.addEventListener('click', handleDownload);
    eraser.addEventListener('click', handleDelete)
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDrawing]);

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.strokeStyle = color; // Set drawing color
  }, [color]); // Update color when it changes

  return (
    <div className='flex flex-col mt-12 items-center justify-center'>
	  <h1 className='font-extrabold md:text-7xl text-6xl bg-gradient-to-r from-cyan-300 to-blue-500 via-cyan-500 bg-clip-text text-transparent'>SiGn Here</h1>

      <canvas className='border-2 border-gray-200 shadow-2xl rounded-lg mx-auto mt-12' id="canvas" width={600} height={500}></canvas>
      <div className='flex flex-row mt-2 items-center justify-center gap-x-8 md:gap-x-20'>
        <div className="relative">
          <input type='color' className='rounded-sm w-10 h-10 border-none outline-none appearance-none' value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <button id='download'>
          <Download size={40}/>
        </button>
		<button id='clear'>
			<Eraser size={40}/>
		</button>
      </div>
    </div>
  );
};

export default App;
