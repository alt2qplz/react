import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus component', () => {

    /*

    testInstance.instance

    Экземпляр компонента, соответствующий его тестовому экземпляру. Свойство доступно только для классовых компонентов,
    т. к. функциональные компоненты не имеют экземпляров. Этот экземпляр компонента будет соответствовать значению this
    внутри данного компонента.

    */

    //Тест не работает, так как нельзя взять инстанс не у классовой компоненты
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='myStatus'/>);
        const instance = component.getInstance();
        expect(instance.status).toBe('myStatus')
    });

    test(`after creation span should be displayed`, () => {
        const component = create(<ProfileStatus status='myStatus'/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    test(`after creation text in span is correct`, () => {
        const component = create(<ProfileStatus status='myStatus'/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[0]).toBe('myStatus');
    });

    test(`after creation input shouldn't be displayed`, () => {
        const component = create(<ProfileStatus status='myStatus'/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType('input');
        }).toThrow();
    });

    test(`input should be displayed in editMode instead of span`, () => {
        const component = create(<ProfileStatus status='myStatus'/>);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onClick();
        let input = root.findByType('input');
        expect(input).not.toBeNull();
    });

    //Тест не работает, так как нельзя взять инстанс не у классовой компоненты
    test(`callback should be called`, () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status='myStatus' updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.setEditMode(false);
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});