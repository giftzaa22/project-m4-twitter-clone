import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { bubble } from "react-icons-kit/icomoon/bubble";
import { loop } from "react-icons-kit/icomoon/loop";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import { upload2 } from "react-icons-kit/icomoon/upload2";
import { ic_favorite_border } from "react-icons-kit/md/ic_favorite_border";

//1 destructure new props id and isLiked
// make heart icon full heart or empty based on isLiked prop
// use a local state to keep track of is liked or not liked
// use the local state set function to change isLiked to unliked
//give this function to the onClick of heart icon
const TweetActions = ({ id, liked }) => {
  const [isLiked, setIsLiked] = useState(liked);

  const handleLikeIcon = () => {
    fetch(`/api/tweet/${id}/like`, {
      method: "PUT",
      body: JSON.stringify({ like: !isLiked }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => setIsLiked(!isLiked))
      .catch(console.error);
  };
  return (
    <Wrapper>
      <Icon icon={bubble} />
      <Icon icon={loop} />
      <Icon
        onClick={handleLikeIcon}
        icon={isLiked ? ic_favorite : ic_favorite_border}
      />
      <Icon icon={upload2} />
    </Wrapper>
  );
};

export default TweetActions;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 30px;
  background-color: white;
  color: black;
`;
