import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { useHistory, Link } from "react-router-dom";
import { privates } from "../utils/session";
import { useState } from "react";
import { BlogContext } from "../blogContext/BlogProvider";

const Post = ({
  post: { _id, body, username, email, createdAt, likes, comments }
}) => {
  const { likePost, like_style } = useContext(BlogContext);
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user["username"]);
  return (
    <SubGrid>
      <div className='user'>
        <p className='avatar'>{username[0]}</p>
        <div>
          <p>{username}</p>
          <p className='date'>
            <span>
              {moment(createdAt).fromNow(true)} <i className='fas fa-users'></i>
            </span>
          </p>
        </div>
      </div>
      <div className='body'>
        <p>{body}</p>
      </div>
      <div className='comment'>
        <span onClick={() => likePost(_id)}>
          <i
            style={like_style === _id ? { color: "orangered" } : {}}
            className='fas fa-heart'
          ></i>{" "} like {likes.length}
        </span>
        <div>
          <span style={{ color: "orangered", paddingRight: "1.3rem" }}>
            {/* <i className='fas fa-trash'></i> */}
          </span>
          <span>
            <Link className='link' to={`/comments/${_id}`}>
              <i className='fas fa-comments'></i> {comments.length}
            </Link>
          </span>
        </div>
      </div>
    </SubGrid>
  );
};

const SubGrid = styled.div`
  padding: 2%;
  border-radius: 5px;
  border: 0.3px solid #999;
  box-shadow: 0 2px 25px #eee;
  margin: 0.5% 0;
  .user {
    display: flex;
    padding-bottom: 1rem;
    .avatar {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid #999;
      margin-right: 20px;
      font-size: 1.5rem;
    }
    p:first-child {
      color: #4267b2;
    }
    .date {
      font-size: 0.7rem;
    }
  }
  .body {
    padding: 0rem 4rem 1.1rem 3rem;
  }
  .comment {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #999;
    border-bottom: 1px solid #999;
    padding: 5px 0;
    span:first-child {
      /* color: #999; */
    }
    .link{
      text-decoration: none;
      color: burlywood;
    }
    .trash {
      padding-right: 1.3rem;
      color: #ff0000;
    }
  }
`;

export default Post;
