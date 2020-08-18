import React, { useState, Component } from "react";
import styled from "styled-components";
import TweetActions from "./TweetActions";
import { COLORS } from "./constants";

const Tweet = ({ tweet }) => {
  return (
    <Wrapper>
      <Div3>
        <Div1>
          <Avatar src={tweet.author.avatarSrc} />
          <Div2>
            <Author2>
              <strong> {tweet.author.displayName} </strong>
            </Author2>
            <Author>@ {tweet.author.handle} </Author>
          </Div2>
        </Div1>
        <Div4>
          <Author> {tweet.status} </Author>

          <MediaPic src={tweet.media.length > 0 ? tweet.media[0].url : ""} />
          <Author> {tweet.timestamp} </Author>
          <TweetActions>Tweet bar actions icons</TweetActions>
        </Div4>
      </Div3>
    </Wrapper>
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
  font-size: 0.6rem;
`;

const Author = styled.span`
  font-size: 0.4 rem;
`;
