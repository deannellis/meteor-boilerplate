import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapater from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import { Login } from './Login';

Enzyme.configure({ adapter: new Adapater() });

if(Meteor.isClient) {
    describe('Login', function () {

        it('should dynamically display error messages', function () {
            const error = 'Test error message';
            const wrapper = shallow(<Login loginWithPassword={() => {}} />);
            wrapper.setState({ error });
            const errorText = wrapper.find('p').text();

            expect(errorText).toBe(error);

            wrapper.setState({ error: '' });
            expect(wrapper.find('p').length).toBe(0);
        });

        it('should call loginWithPassword with the form data', function () {
            const email = 'user@test.com';
            const password = 'testpass';
            const spy = expect.createSpy();
            const wrapper = mount(
                <MemoryRouter>
                    <Login loginWithPassword={spy} />
                </MemoryRouter>
            );

            // wrapper.ref('email').node.value = email;
            // wrapper.ref('password').node.value = password;
            wrapper.find('input[name="email"]').instance().value = email;
            wrapper.find('input[name="password"]').instance().value = password;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({ email });
            expect(spy.calls[0].arguments[1]).toBe(password);
        });

        it('should set loginWithPassword callback errors', function () {
            const spy = expect.createSpy();
            const reason = 'error message';
            const wrapper = mount(
                <MemoryRouter>
                    <Login loginWithPassword={spy} />
                </MemoryRouter>
            );
            wrapper.find('form').simulate('submit');
            spy.calls[0].arguments[2]({ reason });
        
            // expect(wrapper.state('error')).toNotBe('');
            expect(wrapper.find(Login).instance().state).toEqual({error: reason});

            spy.calls[0].arguments[2]();
            expect(wrapper.find(Login).instance().state).toEqual({error: ''});
        });

    });
}

