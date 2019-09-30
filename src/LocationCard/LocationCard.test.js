import React from 'react'
import {mount} from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LocationCard from './index'

configure({ adapter: new Adapter() });

function getCardConfig() {
    let config = {
        index: 1,
        data: {
            name: 'test name',
            address: 'This is a test address',
            position: {
                lat: 23,
                lng: 79
            }
        },
        editingIndex: -1,
        editModeFn:  () => {},
        deleteFn:  () => {}
    }

    return config
}

describe('A location card', () => {
    test('has a div with class name "locationCard"', () => {
        let config = getCardConfig()
        const wrapper = mount(<LocationCard config={config} />)
        expect(wrapper.find('.locationCard')).toHaveLength(1);
    })

    test('shows Location Name on the header', () => {
        let config = getCardConfig()
        const wrapper = mount(<LocationCard config={config} />)
        expect(wrapper.find('.card-header').text()).toEqual('test name')
    })

    test('shows address of the location', () => {
        let config = getCardConfig()
        const wrapper = mount(<LocationCard config={config} />)
        expect(wrapper.find('.address').text()).toContain('This is a test address')
    })

    test('has Edit and Delete Buttons', () => {
        let config = getCardConfig()
        const wrapper = mount(<LocationCard config={config} />)
        expect(wrapper.find('.btn-primary').text()).toEqual('Edit')
        expect(wrapper.find('.btn-danger').text()).toEqual('Delete')
    })
})

describe('When the edit button is clicked', () => {
    test('editModeFn() is called', () => {
        let config = getCardConfig()  
        config.editModeFn = jest.fn();
        const wrapper = mount(<LocationCard config={config} />)
        wrapper.find('.btn-primary').simulate('click')
        expect(config.editModeFn).toHaveBeenCalled();
    })

    test('the text on the button changes to "Editing"', () => {
        let config = getCardConfig()
        //call to editModeFn() eventually changes the 'editingIndex'
        config.editingIndex = 1
        const wrapper = mount(<LocationCard config={config} />)
        
        expect(wrapper.find('.btn-primary').text()).toEqual('Cancel')
    })
})

