import React from 'react';
import { render, screen } from '@testing-library/react';
import RestoCard from '../components/RestoCard';
// import { mockData } from '../utils/mockData';
import '@testing-library/jest-dom';
import MOCK_DATA from '../utils/mocks/rescardmock.json';



it("Should render Restaurant component with props Data", () => {
    render(<RestoCard resdata={MOCK_DATA}/>)

//     // const restaurantName = screen.getByText(mockData[0].name);
    // const restoName = screen.getByText("Foo"); // this will pass
    // const restoName = screen.getByText("mohataseem"); //this will fail
    // expect(restoName).toBeInTheDocument();

})

// it("should render restocard with promoted badge",()=>{

// })