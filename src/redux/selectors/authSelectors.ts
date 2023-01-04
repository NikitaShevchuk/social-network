import { RootState } from '../redux-store';

export const getIsAuthorized = (state: RootState) => state.auth.isAuthorized;
