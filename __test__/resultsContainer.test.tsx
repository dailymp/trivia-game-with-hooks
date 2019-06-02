import * as React from "react";
import {shallow, mount} from "enzyme";
import { ResultsContainer } from "../src/components/resultsContainer";


const defaultProps = {
    result: null,
    resetGame: jest.fn()
};

describe('ResultsContainer TESTING', () => {

    it('Render correctly ResultsContainer component', () => {
        const ResultsContainerComponent = shallow(<ResultsContainer {...defaultProps}/>);
        expect(ResultsContainerComponent).toBeDefined();
    });
});