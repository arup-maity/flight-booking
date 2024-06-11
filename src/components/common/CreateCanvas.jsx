'use client'
import React, { useRef, useEffect } from 'react';

const BoardingPassCanvas = () => {
   const canvasRef = useRef(null);
   const imageRef = useRef(null);

   useEffect(() => {
      const canvas = canvasRef.current;
      const image = imageRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');

      // Draw the background and borders of the boarding pass
      ctx.fillStyle = 'white'; // Assuming a green background
      ctx.fillRect(0, 0, 856, 309); // Adjust width and height as needed
      ctx.strokeRect(0, 0, 856, 309); // Outline
      //
      ctx.fillStyle = '#EBF6F2'; // Set the fill color for the square
      ctx.fillRect(0, 0, 246, 309); // Draw the square at (0, 0) with specified dimensions
      // 
      ctx.fillStyle = '#8DD3BB'; // Set the fill color for the square
      ctx.fillRect(246, 0, 610, 96); // Draw the square at (0, 0) with specified dimensions


      // Draw the text elements
      ctx.font = '12px Arial'; // Adjust font size and style
      ctx.fillStyle = 'black';   // Text color

      // // image
      // image.onload = () => {
      //    ctx.drawImage(image, 10, 10, 100, 100); // Adjust coordinates and dimensions
      // };

      // image.src = 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg';

      // Passenger information
      ctx.font = `700 20px Arial`; // Set the font with desired size and font family
      // ctx.fillStyle = color;
      ctx.fillText('James Doe', 350, 50);
      ctx.font = `400 14px Arial`;
      ctx.fillText('Boarding Pass N’123', 350, 70);
      ctx.font = `700 16px Arial`;
      ctx.fillText('Business Class', 720, 50);


      // Origin information
      ctx.font = `600 32px Arial`;
      ctx.fillText('12:00 pm', 50, 50);
      ctx.font = `500 14px Arial`;
      ctx.fillText('Newark(EWR)', 50, 70);

      ctx.font = `600 32px Arial`;
      ctx.fillText('12:00 pm', 50, 270);
      ctx.font = `500 14px Arial`;
      ctx.fillText('Newark(EWR)', 50, 290);

      // Flight details
      ctx.font = `600 16px Arial`;
      ctx.fillStyle = '#11221199';
      ctx.fillText('Date', 300, 140);
      ctx.fillText('Flight time', 450, 140);
      ctx.fillText('Gate', 600, 140);
      ctx.fillText('Seat', 750, 140);
      ctx.font = `500 15px Arial`;
      ctx.fillStyle = '#112211';
      ctx.fillText('16/04/2024', 300, 165);
      ctx.fillText('12:00 pm', 450, 165);
      ctx.fillText('A12', 600, 165);
      ctx.fillText('128', 750, 165);

      // Destination information
      ctx.font = `600 30px Arial`;
      ctx.fillText('EK', 300, 250);
      ctx.font = `500 12px Arial`;
      ctx.fillStyle = '#112211';
      ctx.fillText('ABC12345', 300, 270);

   }, [canvasRef]);

   return (
      <>
         <canvas ref={canvasRef} width={856} height={309} />
         <img ref={imageRef} style={{ display: 'none' }} alt="" />
      </>
   );
};

export default BoardingPassCanvas;
