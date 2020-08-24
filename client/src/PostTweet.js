import React, { useState } from "react";
import styled from "styled-components";

const PostTweet = (props) => {
  const [currentTweet, setCurrentTweet] = useState("");
  const [error, setError] = useState(false);

  const errorMessage = "unable to continue";
  const textLenght = 280;
  const maxCharacters = (characters) => {
    if (characters > textLenght) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleOnChange = (ev) => {
    maxCharacters(ev.target.value.lenght);
    setCurrentTweet(ev.target.value);
  };

  const handleSubmitTweet = (ev) => {
    ev.preventDefault();
    fetch(`/api/tweet`, {
      method: "POST",
      body: JSON.stringify({ status: currentTweet }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        props.fetchTweets();
      })
      .catch(console.error);
  };
  return (
    <div style={{ textAlign: "center" }}>
      {error && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmitTweet}>
        <Wrapper>
          <TextArea
            type="text"
            name="content"
            placeholder="What's Happening?"
            value={currentTweet}
            onChange={handleOnChange}
          ></TextArea>
        </Wrapper>
        <Button type="submit" disabled={currentTweet.length > 0 ? false : true}>
          MEOW
        </Button>
        <Copy>Remaining Characters: {textLenght - currentTweet.length}</Copy>
      </form>
    </div>
  );
};

const Button = styled.button`
  height: 30px;
  width: 120px;
  background-color: darkgray;
  color: white;
  border-radius: 15px;
`;
const TextArea = styled.textarea`
  height: 300px;
  width: 800px;
  font-size: 25px;
  font-family: "Times New Roman", Times, serif;
`;

// const Avatar = styled.img`
//   max-width: 60px;
//   border-radius: 50%;
// `;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Copy = styled.h5`
  color: darkgray;
`;
export default PostTweet;
