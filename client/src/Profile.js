import React, { useState, useEffect, useContext } from "react";
import CurrentUserContext from "./CurrentUserContext";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { COLORS } from "./constants";
import { Icon } from "react-icons-kit";
import { pin } from "react-icons-kit/entypo/pin";
import { calendar } from "react-icons-kit/entypo/calendar";
import Tweet from "./Tweet";
const Profile = () => {
  // params = {profileId: 'treasureymog'}
  //PARAMS TAKES THE WILD CARD AND READS IT AS THE KEY WHATEVER IT IS
  // TAKE THAT WILD CARD VALUE
  //const params = useParams();

  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  //  create a new local state for feed
  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((profileData) => {
        console.log(profileData);
        setProfile(profileData);
      });

    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((feedData) => {
        const tweetsdata = Object.values(feedData.tweetsById);
        setTweets(tweetsdata);
        //setFeed with data setFeed(data)
      });
    // add a new .then to call `/api/${profileId}/feed`
    // this will give us a list of tweets by the user
    // when you get the data, res.json() and then use it in a local state
    // use this local state with your tweet component
  }, [profileId]);
  console.log("error in line 23", profile);
  if (profile)
    return (
      <Wrapper>
        <Banner
          style={{ backgroundImage: `url(${profile.profile.bannerSrc})` }}
        />
        <Avatar src={profile.profile.avatarSrc} />
        <Button>Follow</Button>
        <Wrapper2>
          <span>
            <strong>{profile.profile.displayName}</strong>
          </span>
          <Wrapper3>
            <Copy>@{profile.profile.handle}</Copy>
            <Copy>Follows you </Copy>
          </Wrapper3>
          <h4>{profile.profile.bio}</h4>
          <Wrapper4>
            <Copy>
              <Icon icon={pin} />
              {profile.profile.location}
            </Copy>
            <Copy>
              <Icon icon={calendar} />
              {profile.profile.joined}
            </Copy>
          </Wrapper4>
          <Wrapper5>
            <Copy>{profile.profile.numFollowing} Following</Copy>
            <Copy>{profile.profile.numFollowers}Followers</Copy>
          </Wrapper5>
        </Wrapper2>
        {tweets.map((tweet) => (
          <Tweet tweet={tweet} />
        ))}
      </Wrapper>
    );
  // if (profile & tweet) return;
  else return <span>loading</span>;
};
// if ((params = currentUser.profile.handle))
export default Profile;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  background-color: white;
  border: 0.5px solid ${COLORS.customgrey};
  padding-bottom: 20px;
  margin: 10px;
  position: relative;
`;
const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  margin-top: 5px;
`;
const Wrapper3 = styled.div`
  display: flex;
  flex-direction: row;
  text-align: justify;
  margin: 0px;
  /* border: 2px red solid; */
`;
const Wrapper4 = styled.div`
  display: flex;
  flex-direction: row;
  text-align: justify;
`;
const Wrapper5 = styled.div`
  display: flex;
  flex-direction: row;
  text-align: justify;
`;
const Banner = styled.div`
  max-width: 100%;
  padding-bottom: 20px;
  min-height: 300px;
  background-size: cover;
`;
const Avatar = styled.img`
  border-radius: 50%;
  max-width: 80px;
  position: absolute;
  top: 260px;
  left: 20px;
  border: 2px white solid;
`;

const Copy = styled.h5`
  color: ${COLORS.mediumgrey};
  margin-left: 10px;
`;

const Button = styled.button`
  width: 120px;
  background-color: ${COLORS.primary};
  color: white;
  border-radius: 15px;
  padding: 4px;
  margin-left: 550px;
  margin-top: 30px;
`;
