import React, { useState, useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";
import Tweet from "./Tweet";
import styled from "styled-components";

const HomeFeed = () => {
  const { CurrentUser, setcurrentUser, status, setStatus } = useContext(
    CurrentUserContext
  );
  const [tweets, setTweets] = useState([]);
  const [tweetsStatus, setTweetsStatus] = useState("loading");

  React.useEffect(() => {
    fetch("/api/me/home-feed")
      //HIGHER ORDER FUNCTION?RES THEN DATA?
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
        // When the data is received, the staus is changed to idle
        setTweetsStatus("idle");
      })
      .catch((error) => {
        console.log("request not found, please try again", error);
        if (error) {
          window.location.href = "/error";
        }
      });
  }, []);
  const tweetDisplay =
    tweetsStatus === "idle" ? (
      tweets.tweetIds.map((id) => {
        const tweet = tweets.tweetsById[id];
        //add IF BEING FOLLOWED BY YOU?

        return <Tweet tweet={tweet} />;
      })
    ) : (
      <div>"loading"</div>
    );
  return status === "idle" ? (
    <div>
      <H1>HOME</H1>
      <div>{tweetDisplay}</div>
    </div>
  ) : status === "loading" ? (
    <div>loading</div>
  ) : (
    <div>error</div>
  );
};

const H1 = styled.h1`
  font-size: 1 rem;
  padding-left: 10px;
`;

// const TweetFeed = styled.div`
//   padding-left: 10px;
// `;

export default HomeFeed;
