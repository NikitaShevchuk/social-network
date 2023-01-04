import { RootState } from '../redux-store';

export const getPageSize = (state: RootState) => state.usersPage.pageSize;
export const getTotalCount = (state: RootState) => state.usersPage.totalCount;
export const getCurrentPage = (state: RootState) => state.usersPage.currentPage;
export const getIsFetching = (state: RootState) => state.usersPage.isFetching;
export const usersSelector = (state: RootState) => state.usersPage.users;
export const getDisableWhileRequest = (state: RootState) => state.usersPage.disableWhileRequest;
