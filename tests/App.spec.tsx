import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from "../src/App";
import {TestIds} from "../src/test-constants";

describe('App', () => {
    it('does not allow more than two rethrows', async () => {
        render(<App/>);
        const rollDiceButton = screen.getByTestId(TestIds.rollDiceBtn);
        const diceButton_1 = await screen.findByTestId(TestIds.diceButton_1);
        await act(() => fireEvent.click(diceButton_1));
        await act(() => fireEvent.click(rollDiceButton));
        await act(() => fireEvent.click(diceButton_1));
        await act(() => fireEvent.click(rollDiceButton));

        expect(rollDiceButton).not.toBeInTheDocument();
        expect(screen.getByTestId(TestIds.noRethrowsMsg)).toBeInTheDocument();
    });
})
it('displays message instead of confirmation button when a category is selected for which score is already set', async () => {
    render(<App/>);
    const categoryButton_2 = screen.getByTestId(TestIds.categoryButtonPrefix.concat("2"));
    await act(() => fireEvent.click(categoryButton_2));
    const confirmButton = screen.getByTestId(TestIds.confirmButton);
    await act(() => fireEvent.click(confirmButton));
    await act(() => fireEvent.click(categoryButton_2));

    expect(confirmButton).not.toBeInTheDocument();
    expect(screen.getByTestId(TestIds.categorySetMsg)).toBeInTheDocument();
})

