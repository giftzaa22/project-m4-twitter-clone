import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Tweet from "./Tweet";

const TweetDetails = () => {
  const { tweetId } = useParams();
  const [tweet, setTweet] = useState(null);
  const [tweetsStatus, setTweetsStatus] = useState("loading");
  React.useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTweet(data.tweet);
        setTweetsStatus("idle");
      })
      .catch((error) => {
        console.log("error message please try again", error);
        if (error) {
        }
      });
  }, [tweetId]);
  return tweetsStatus === "idle" ? (
    <Tweet tweet={tweet} />
  ) : tweetsStatus === "loading" ? (
    <div>loading</div>
  ) : (
    <div>error</div>
  );
};

export default TweetDetails;
