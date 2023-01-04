import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Search_Title from '../components/Search_Title'
import '@testing-library/jest-dom/extend-expect'
import movieAppStore from "../store/store";





describe('Input Text', () => {

    it('Search the title', () => {
        const onChangeText = jest.fn((value) => { })

        //i get an error in render that's why i put the store in the search title to get the result

        const { queryByPlaceholderText } = render(<Search_Title store={movieAppStore} onChangeText={onChangeText} />)

        const searchInput = queryByPlaceholderText('Search')

        fireEvent.change(searchInput, { target: { value: 'ocean' } })

        expect(searchInput.value).toBe('ocean')
    })
})
