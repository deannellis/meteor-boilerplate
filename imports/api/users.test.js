import expect from 'expect';
import { validateNewUser } from './users';
import { Meteor } from 'meteor/meteor';

if(Meteor.isServer) {
    describe('users', function () {
        it('should allow valid email address', function () {
            const testUser = {
                emails: [
                    {
                        address: 'user@test.com'
                    }
                ]
            };
    
            const res = validateNewUser(testUser);
    
            expect(res).toBe(true);
        });

        it('should reject invalid email', function () {
            const testUser = {
                emails: [
                    {
                        address: 'invalid email format'
                    }
                ]
            };

            expect(() => {
                validateNewUser(testUser);
            }).toThrow();
        });

    });
}
