import React from 'react';
import Enzyme, {mount} from "enzyme";
import App from "../Containers/App";
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({adapter: new Adapter()});


describe("sample_test", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<App/>);
    });

    test("elements_rendered", () => {
         let input = wrapper.find("#graph-input");
         expect(input.exists()).toEqual(true);
         let createBtn = wrapper.find("#create-btn");
         expect(createBtn .exists()).toEqual(true);
         let cleanBtn = wrapper.find("#clean-btn");
         expect(cleanBtn .exists()).toEqual(true);

    });

    test("nodes_number", () => {
        let nodes = ["A ", "B\n", "C ", "D\n", "E ", "K\n", "T", "E"];
        let graphInput = "";
        nodes.forEach((item) => graphInput = graphInput + item);
        let input = wrapper.find("#graph-input");
        input.simulate('change', {target: {value: graphInput}});
        let createBtn = wrapper.find("#create-btn");
        createBtn.simulate("click");
        expect(wrapper.find('.node').length).toEqual(nodes.length);
    });
    test("edges_position_", () => {
        let nodePosition = {
            A: {x: 300, y: 220},
            B: {x: 150, y: 330},
        };
        wrapper.instance().randomPosition = jest.fn(node => nodePosition[node]);
        let edges = [["A", "B"]];
        let graphInput = "";
        edges.forEach((item) => graphInput = graphInput + item[0] + " " + item[1]);
        let input = wrapper.find("#graph-input");
        input.simulate('change', {target: {value: graphInput}});
        let createBtn = wrapper.find("#create-btn");
        createBtn.simulate("click");
        edges.forEach(item => {
            let nodeId1 = item[0].replace(/\s/g, "");
            let nodeId2 = item[1].replace(/\s/g, "");
            let id = ("#" + item[0] + item[1]).replace(/\s/g, "");
            console.log("Node : %s(%d, %d)", nodeId1, nodePosition[nodeId1].x, nodePosition[nodeId1].y);
            console.log("Node : %s(%d, %d)", nodeId2, nodePosition[nodeId2].x, nodePosition[nodeId2].y);
            console.log(wrapper.find(id).props());
            expect(wrapper.find(id).props().x1).toEqual(nodePosition[nodeId1].x);
            expect(wrapper.find(id).props().y1).toEqual(nodePosition[nodeId1].y);
            expect(wrapper.find(id).props().x2).toEqual(nodePosition[nodeId2].x);
            expect(wrapper.find(id).props().y2).toEqual(nodePosition[nodeId2].y);
        });
    });
});
