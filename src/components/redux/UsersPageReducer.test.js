import {followUser} from "./UsersPageReducer";

test('follow user', () => {
    followUser(24018)
    expect(state[0].followed).toBe(true)
});
