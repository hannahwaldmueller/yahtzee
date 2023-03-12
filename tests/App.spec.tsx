import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from "../src/App";
import {TestIds} from "../src/testConstants";

describe('App', () => {
    it('does not allow more than two rethrows', async () => {
        render(<App/>);
        const rollDiceButton = screen.getByTestId("rollDiceButton");
        const diceButton_1 = await screen.findByTestId("diceButton_1")
        await act(() => fireEvent.click(diceButton_1));
        await act(() => fireEvent.click(rollDiceButton));
        await act(() => fireEvent.click(diceButton_1));
        await act(() => fireEvent.click(rollDiceButton));

        expect(rollDiceButton).not.toBeInTheDocument();
    });
})
it('displays message instead of confirmation button when a category is selected for which score is already set', async () => {
    render(<App/>);
    const categoryButton_2 = screen.getByTestId(TestIds.categoryButtonPrefix.concat("2"));
    await act(() => fireEvent.click(categoryButton_2));
    await act(() => fireEvent.click(screen.getByTestId(TestIds.confirmButton)));
    await act(() => fireEvent.click(categoryButton_2));

    expect(!screen.findByTestId(TestIds.confirmButton));
    expect(screen.findByTestId(TestIds.categorySetMessage));
})

