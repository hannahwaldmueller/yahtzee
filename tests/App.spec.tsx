import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from "../src/App";


test('does not allow more than two rethrows', async () => {
    render(<App/>);
    const rollDiceButton = screen.getByTestId("rollDiceButton");
    const diceButton_1 = await screen.findByTestId("diceButton_1")
    await act(() => fireEvent.click(diceButton_1));
    await act(() => fireEvent.click(rollDiceButton));
    await act(() => fireEvent.click(diceButton_1));
    await act(() => fireEvent.click(rollDiceButton));

    expect(rollDiceButton).not.toBeInTheDocument();
});

