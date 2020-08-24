import React, { useState, useEffect } from "react";
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
  const [activeTab, setActiveTab] = useState("tweets");
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

  const upDateProfile = () => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfile(data);
      });
  };

  const followToggle = () => {
    fetch(`/api/${profileId}/follow`, { method: `PUT` })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          upDateProfile();
        }
      });
  };
  const unfollowToggle = () => {
    fetch(`/api/${profileId}/unfollow`, { method: `PUT` })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          upDateProfile();
        }
      });
  };
  if (profile)
    return (
      <Wrapper>
        <Banner
          style={{ backgroundImage: `url(${profile.profile.bannerSrc})` }}
        />
        <Avatar src={profile.profile.avatarSrc} />
        {profile.profile.isBeingFollowedByYou === true ? (
          <Button onClick={unfollowToggle}>Following</Button>
        ) : (
          <Button onClick={followToggle}>Follow</Button>
        )}
        <Wrapper2>
          <span>
            <strong>{profile.profile.displayName}</strong>
          </span>
          <Wrapper3>
            <Copy>@{profile.profile.handle}</Copy>
            <Copy2>Follows you </Copy2>
          </Wrapper3>
          <Copy3>{profile.profile.bio}</Copy3>
          <Wrapper3>
            <Copy>
              <Icon icon={pin} />
              {profile.profile.location}
            </Copy>
            <Copy2>
              <Icon icon={calendar} />
              {profile.profile.joined}
            </Copy2>
          </Wrapper3>
          <Wrapper3>
            <Copy>{profile.profile.numFollowing} Following</Copy>
            <Copy2>{profile.profile.numFollowers}Followers</Copy2>
          </Wrapper3>
        </Wrapper2>
        <ProfileInformation>
          <Section>
            <Button2 onClick={() => setActiveTab("tweets")}>tweets</Button2>
            <Button2 onClick={() => setActiveTab("media")}>media</Button2>
            <Button2 onClick={() => setActiveTab("likes")}>likes</Button2>

            {activeTab === "tweets" && <Tweets tweets={tweets} />}
            {activeTab === "media"}
            {activeTab === "likes"}
          </Section>
        </ProfileInformation>
        {tweets.map((tweet) => (
          <Tweet tweet={tweet} />
        ))}
      </Wrapper>
    );
  else return <span>loading</span>;
};

export default Profile;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  background-color: white;
  border: 0.5px solid ${COLORS.customgrey};
  position: relative;
`;
const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: space-around;
  align-items: left;
  margin-top: 10px;
`;
const Wrapper3 = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  text-align: justify;
  width: 50%;
  justify-content: space-around;
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

const Copy = styled.span`
  color: darkgray;
  margin-left: 5px;
`;

const Copy2 = styled.span`
  color: darkgray;
  margin-left: 25px;
`;

const Copy3 = styled.span`
  color: darkslategray;
  margin-left: 5px;
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

const ProfileInformation = styled.div`
  background-color: white;
  color: black;
  margin: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  list-style-type: none;
  -webkit-padding-start: 0;
`;

const Tweets = styled.div`
  color: blue;
`;

const Button2 = styled.button`
  width: 150px;
  color: lightslategray;
  padding: 10px;
  margin-left: 100px;
  justify-content: space-around;
  margin-top: 30px;
  border: none;
  background: none;
`;

const Section = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 30px;
`;
