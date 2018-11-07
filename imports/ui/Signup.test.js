import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapater from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import { Signup } from './Signup';

Enzyme.configure({ adapter: new Adapater() });

if(Meteor.isClient) {
    describe('Signup', function () {

        it('should dynamically display error messages', function () {
            const error = 'Test error message';
            const wrapper = shallow(<Signup createUser={() => {}} />);
            wrapper.setState({ error });
            const errorText = wrapper.find('p').text();

            expect(errorText).toBe(error);

            wrapper.setState({ error: '' });
            expect(wrapper.find('p').length).toBe(0);
        });

        it('should call createUser with the form data', function () {
            const email = 'user@test.com';
            const password = 'testpass1';
            const spy = expect.createSpy();
            const wrapper = mount(
                <MemoryRouter>
                    <Signup createUser={spy} />
                </MemoryRouter>
            );

            // wrapper.ref('email').node.value = email;
            // wrapper.ref('password').node.value = password;
            wrapper.find('input[name="email"]').instance().value = email;
            wrapper.find('input[name="password"]').instance().value = password;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({ email, password });
        });

        it('should set error if short password', function () {
            const email = 'user@test.com';
            const password = '123           ';
            const errorMessage = 'error message';
            const spy = expect.createSpy();
            const wrapper = mount(
                <MemoryRouter>
                    <Signup createUser={spy} />
                </MemoryRouter>
            );

            // wrapper.ref('email').node.value = email;
            // wrapper.ref('password').node.value = password;
            wrapper.find('input[name="email"]').instance().value = email;
            wrapper.find('input[name="password"]').instance().value = password;
            wrapper.find('form').simulate('submit');

            expect(wrapper.find(Signup).instance().state).toNotEqual({error: ''});
        });

        it('should set createUser callback errors', function () {
            const spy = expect.createSpy();
            const password = 'testpass1';
            const reason = 'error message';
            const wrapper = mount(
                <MemoryRouter>
                    <Signup createUser={spy} />
                </MemoryRouter>
            );
            wrapper.find('input[name="password"]').instance().value = password;
            wrapper.find('form').simulate('submit');
            spy.calls[0].arguments[1]({ reason });
        
            // expect(wrapper.state('error')).toNotBe('');
            expect(wrapper.find(Signup).instance().state).toEqual({error: reason});

            // spy.calls[0].arguments[1]();
            // expect(wrapper.find(Signup).instance().state).toEqual({error: ''});
        });

    });
}