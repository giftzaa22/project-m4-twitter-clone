import React, { useState, Component } from "react";
import styled from "styled-components";
import TweetActions from "./TweetActions";
import { COLORS } from "./constants";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

const Tweet = ({ tweet }) => {
  let history = useHistory();
  function handleClick(ev) {
    ev.preventDefault();
    history.push(`/profile/${tweet.author.handle}`);
  }
  return tweet ? (
    <Wrapper>
      <Div3>
        <Div1>
          <Avatar src={tweet.author.avatarSrc} onClick={handleClick} />
          <Div2>
            <Author2 onClick={handleClick}>
              <strong> {tweet.author.displayName} </strong>
            </Author2>

            <Author onClick={handleClick}>@ {tweet.author.handle} </Author>
          </Div2>
        </Div1>
        <Div4>
          <Author3> {tweet.status} </Author3>
          <Link to={`/tweet/${tweet.id}`}>
            <MediaPic src={tweet.media.length > 0 ? tweet.media[0].url : ""} />
          </Link>
          <Author>
            {" "}
            {format(new Date(tweet.timestamp), "hh:mm a . MMMM dd yy ")}{" "}
          </Author>
          {/*pass to tweet actions new proprs: id and isLied (coming from tweet variable)*/}
          <TweetActions id={tweet.id} LIKED={tweet.isLiked}>
            Tweet bar actions icons
          </TweetActions>
        </Div4>
      </Div3>
    </Wrapper>
  ) : (
    <div>loading</div>
  );
};

export default Tweet;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  margin: 10px;
  background-color: white;
  border: 0.5px solid ${COLORS.customgrey};
  padding-bottom: 20px;
  text-decoration: none;
`;

const Div1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: space-around;
  align-items: center;
  background-color: white;
`;

const Div2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  background-color: white;
`;
const Div3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  background-color: white;
`;

const Div4 = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  background-color: white;
  padding-left: 60px;
`;

const Avatar = styled.img`
  max-width: 60px;
  border-radius: 50%;
`;

const MediaPic = styled.img`
  max-height: 10%;
  border-radius: 20%;
  padding-bottom: 20px;
  width: 450px;
`;

const Author2 = styled.span`
  font-size: 1rem;
  color: black;
`;

const Author3 = styled.span`
  font-size: 1.5rem;
  color: black;
`;

const Author = styled.span`
  font-size: 1rem;
  color: darkgray;
`;
