import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'

import { BurgerBuilder } from './BurgerBuilder';
import Spinner from '../../components/UI/Spinner/Spinner';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder 
            initIngredients={() => {}} 
            purchaseInit={() => {}}
            setAuthRedirectPath={() => {}}
        />);
    });

    // it('should render spinner when loading', () => {
    //     // wrapper.setState({loading: true});
    //     wrapper.setProps({
    //     })
    //     expect(wrapper.contains(Spinner).toEqual(true));
    // })

    it('should render <BuildControls /> when receiving ingredients', () => {
        // wrapper.setState({loading: true});
        wrapper.setProps({
            ingredients: {
                salad: 0
            }
        })
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })

    it('should not render <BuildControls /> when not receiving ingredients', () => {
        // wrapper.setState({loading: true});
        wrapper.setProps({
            ingredients: null
        })
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    })
})
