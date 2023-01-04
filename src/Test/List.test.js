import { render, fireEvent, screen } from "@testing-library/react";
import movieAppStore from "../store/store";
import React from 'react';
import { Provider } from "react-redux";
import List from '../components/List';





//test filtre par category
describe('Filter checkk', () => {

    it('Filtrer par category', () => {
        render(
            
            <Provider store={movieAppStore}>
                <List />
            </Provider>,
        );
        const check = screen.getByTestId("cheking");

        fireEvent.click(check);

        expect(check).toBe(check)
    })
})
