import React, { Fragment,useEffect } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPost} from '../../actions/post'
import PropTypes from 'prop-types'
import Spinner from '../../components/layout/spinner'
import PostItem from '../posts/PostItem'
import CommentForm from './commentform'
import CommentItem from './commentitem'

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.posts
});

export default connect(mapStateToProps, { getPost })(Post);