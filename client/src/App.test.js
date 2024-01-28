/*
Attempt at using Jest Test Library
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ReactDOM } from "react";
import App from "./App";

it('render Application', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div)
})

/*
describe('attributes', () =>{
    it('uses correct landing page', ()=>{
        const app = new App()
        expect(app.public).toEqual('prototype.com')
    })
    it('gets right theme for landing page', ()=>{
        const app = new App()
        expect(app.colorScheme().toEqual('insert main color scheme'))
    })
})
*/
