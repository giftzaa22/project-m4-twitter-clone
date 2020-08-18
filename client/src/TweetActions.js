import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { bubble } from "react-icons-kit/icomoon/bubble";
import { loop } from "react-icons-kit/icomoon/loop";
import { heart } from "react-icons-kit/icomoon/heart";
import { upload2 } from "react-icons-kit/icomoon/upload2";
import { Link } from "react-router-dom";

const TweetActions = () => {
  return (
    <Wrapper>
      <Link>
        <Icon icon={bubble} />
      </Link>
      <Link>
        <Icon icon={loop} />
      </Link>
      <Link>
        <Icon icon={heart} />
      </Link>
      <Link>
        <Icon icon={upload2} />
      </Link>
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
