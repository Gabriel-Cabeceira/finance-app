import React from 'react';
import { CarouselContainer, MonthContainer, Month, ControlButton } from './monthCarroussel.styles';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function MonthCarousel({ currentMonthIndex, setCurrentMonthIndex, currentYear, setCurrentYear }) {
  const handlePrev = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);

        // console.log(currentMonthIndex, currentYear)


    } else {
      setCurrentMonthIndex(11); // Wrap around to December if going from January
      setCurrentYear(currentYear - 1); // Decrement year if wrapping around

      // console.log(currentMonthIndex, currentYear)

    }
  };



  const handleNext = () => {
    if (currentMonthIndex < months.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);

      // console.log(currentMonthIndex + 2, currentYear)

    } else {
      setCurrentMonthIndex(0); // Wrap around to January if going from December
      setCurrentYear(currentYear + 1); // Increment year if wrapping around

      // console.log(currentMonthIndex, currentYear)

    }
  };

  return (
    <CarouselContainer>
      <ControlButton onClick={handlePrev} disabled={currentMonthIndex === 0 && currentYear === new Date().getFullYear()}>
        &#8249;
      </ControlButton>
      <MonthContainer>
        <div style={{ display: 'flex', transform: `translateX(-${currentMonthIndex * 100}%)`, transition: 'transform 0.3s ease-in-out' }}>
          {months.map((month, index) => (
            <Month className='date' key={index}>
              <span>{month}</span>
              <div className='underline'></div>
              <span>{currentYear}</span>
            </Month>
          ))}
        </div>
      </MonthContainer>
      <ControlButton onClick={handleNext} disabled={currentMonthIndex === 11 && currentYear === new Date().getFullYear()}>
        &#8250;
      </ControlButton>
    </CarouselContainer>
  );
}
