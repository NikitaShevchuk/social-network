import { connect } from 'react-redux';
import Feed from './Feed';
import { addPostActionCreator } from '../../redux/reducers/postPageReducer';
import { postsSelector } from '../../redux/selectors/postsReselector';
import { RootState } from '../../redux/redux-store';

const mapStateToProps = (state: RootState) => ({
    postList: postsSelector(state),
    profileImg: state.auth.profileImg
});

const FeedContainer = connect(mapStateToProps, { addPostActionCreator })(Feed);

export default FeedContainer;
