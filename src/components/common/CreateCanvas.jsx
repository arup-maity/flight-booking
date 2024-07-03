'use client'
import React, { useRef, useEffect } from 'react';

const BoardingPassCanvas = () => {
   const canvasRef = useRef(null);
   const imageRef = useRef(null);
   const clockOneRef = useRef(null);
   const clockTwoRef = useRef(null);

   useEffect(() => {
      const canvas = canvasRef.current;
      const image = imageRef.current;
      const clockOne = clockOneRef.current;
      const clockTwo = clockTwoRef.current;
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

      // image
      image.onload = () => {
         ctx.drawImage(image, 10, 100, 200, 100); // Adjust coordinates and dimensions
      };
      image.src = '/images/airplane.png';
      // image
      clockOne.onload = () => {
         ctx.drawImage(clockOne, 270, 170, 30, 30); // Adjust coordinates and dimensions
      };
      clockOne.src = '/images/clock.png';
      // image
      clockTwo.onload = () => {
         ctx.drawImage(clockTwo, 510, 170, 30, 30); // Adjust coordinates and dimensions
      };
      clockTwo.src = '/images/clock.png';

      // Passenger information
      // ctx.font = `500 20px Arial`; // Set the font with desired size and font family
      // // ctx.fillStyle = color;
      // ctx.fillText('James Doe', 300, 40);
      // ctx.font = `400 14px Arial`;
      // ctx.fillText('Boarding Pass N’123', 300, 60);
      // ctx.font = `500 18px Arial`;
      // ctx.fillText('Airbus A380', 650, 40);
      // ctx.font = `500 15px Arial`;
      // ctx.fillText('Business Class', 650, 60);

      // 
      ctx.font = `500 25px Arial`;
      ctx.fillText('Mumbai (BOM) - Kolkata (CCU)', 300, 40);

      // Origin information
      // ctx.font = `500 25px Arial`;
      // ctx.fillText('12:00 pm', 50, 50);
      // ctx.font = `500 25px Arial`;
      // ctx.fillText('Newark(EWR)', 50, 70);

      // ctx.font = `600 32px Arial`;
      // ctx.fillText('12:00 pm', 50, 270);
      // ctx.font = `500 14px Arial`;
      // ctx.fillText('Newark(EWR)', 50, 290);

      //
      ctx.font = `500 12px Arial`;
      ctx.fillStyle = '#11221199';
      ctx.fillText('Passanger Details', 310, 120);
      ctx.fillText('Flight Details', 550, 120);
      ctx.font = `500 15px Arial`;
      ctx.fillStyle = '#112211';
      ctx.fillText('Arup Maity', 310, 145);
      ctx.fillText('Airbus A380', 550, 145);

      // Flight details
      ctx.font = `500 12px Arial`;
      ctx.fillStyle = '#11221199';
      ctx.fillText('Check-In', 310, 180);
      ctx.fillText('Check-Out', 550, 180);
      // ctx.fillText('Flight No.', 620, 140);
      // ctx.fillText('Seat', 750, 140);
      ctx.font = `500 15px Arial`;
      ctx.fillStyle = '#112211';
      ctx.fillText('16/04/2024 12:00pm', 310, 200);
      ctx.fillText('16/04/2024 12:00pm', 550, 200);
      // ctx.fillText('A12', 620, 165);
      // ctx.fillText('128', 750, 165);

      // Destination information
      ctx.font = `600 30px Arial`;
      ctx.fillText('EK', 300, 260);
      ctx.font = `500 12px Arial`;
      ctx.fillStyle = '#112211';
      ctx.fillText('ABC12345', 300, 280);

   }, [canvasRef]);

   return (
      <>
         <canvas ref={canvasRef} width={856} height={309} />
         <img ref={imageRef} style={{ display: 'none' }} alt="" />
         <img ref={clockOneRef} style={{ display: 'none' }} alt="" />
         <img ref={clockTwoRef} style={{ display: 'none' }} alt="" />
      </>
   );
};

export default BoardingPassCanvas;
