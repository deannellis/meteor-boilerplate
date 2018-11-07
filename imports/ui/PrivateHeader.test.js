import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapater from 'enzyme-adapter-react-16';
import { PrivateHeader } from './PrivateHeader';

Enzyme.configure({ adapter: new Adapater() });

if(Meteor.isClient) {
    describe('Private Header', function () {
        it('should set button text to logout', function () {
            const wrapper = mount( <PrivateHeader title="Test Title" handleLogout={() => {}} /> );
            const buttonText = wrapper.find('button').text()

            expect(buttonText).toBe('Log out');
        });

        it('should use title prop as h1 text', function () {
            const title = 'Test Title';
            const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}} /> );
            const titleText = wrapper.find('h1').text();

            expect(titleText).toBe(title);
        });

        it('should call handleLogout on click', function () {
            const spy = expect.createSpy();
            const wrapper = mount( <PrivateHeader title="Test Title" handleLogout={spy} /> );
            wrapper.find('button').simulate('click');

            expect(spy).toHaveBeenCalled();
        });

    });
}
