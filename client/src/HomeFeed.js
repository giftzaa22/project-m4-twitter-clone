import React, { useState, useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";
import Tweet from "./Tweet";
import styled from "styled-components";
import PostTweet from "./PostTweet";

const HomeFeed = () => {
  const { status } = useContext(CurrentUserContext);
  const [tweets, setTweets] = useState([]);
  const [tweetsStatus, setTweetsStatus] = useState("loading");

  const fetchTweets = () => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data);
        setTweetsStatus("idle");
      })
      .catch((error) => {
        console.log("request not found, please try again", error);
        if (error) {
          window.location.href = "/error";
        }
      });
  };
  React.useEffect(() => {
    fetchTweets();
  }, []);
  const tweetDisplay =
    tweetsStatus === "idle" ? (
      tweets.tweetIds.map((id) => {
        const tweet = tweets.tweetsById[id];

        return <Tweet tweet={tweet} />;
      })
    ) : (
      <div>"TweetComponent"</div>
    );
  return status === "idle" ? (
    <TweetFeed>
      <H1>HOME</H1>
      <PostTweet fetchTweets={fetchTweets} />
      <div>TWEETFEED{tweetDisplay}</div>
    </TweetFeed>
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

const TweetFeed = styled.div`
  padding-left: 10px;
`;

export default HomeFeed;
