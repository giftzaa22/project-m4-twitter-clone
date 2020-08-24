import React, { useContext } from "react";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { Icon } from "react-icons-kit";
import { bell } from "react-icons-kit/feather/bell";
import { home3 } from "react-icons-kit/icomoon/home3";
import { bookmark } from "react-icons-kit/icomoon/bookmark";
import { user } from "react-icons-kit/icomoon/user";
import { NavLink } from "react-router-dom";
import { COLORS } from "./constants";
import styled from "styled-components";
import CurrentUserContext from "./CurrentUserContext";

const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Wrapper>
      <BigLogo />
      <Wrapper2>
        <MyLink exact to="/">
          <Icon icon={home3} /> Home
        </MyLink>
        {currentUser ? (
          <MyLink to={`/profile/${currentUser.profile.handle}`}>
            <Icon icon={user} /> Profile
          </MyLink>
        ) : (
          <span>loading</span>
        )}
        <MyLink to="/notifications">
          <Icon icon={bell} /> Notifications
        </MyLink>
        <MyLink to="/bookmarks">
          <Icon icon={bookmark} /> Bookmarks
        </MyLink>
      </Wrapper2>
      <Button>MEOW</Button>
    </Wrapper>
  );
};

const MyLink = styled(NavLink)`
  color: black;
  text-decoration: none;

  &.active {
    color: ${COLORS.primary};
  }
`;

const BigLogo = styled(Logo)`
  max-width: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  min-width: 150px;
  background-color: white;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 800;
  min-width: 120px;
  background-color: white;
`;

const Button = styled.button`
  background-color: ${COLORS.primary};
  width: 120px;
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 10px;
  margin-top: 20px;
  border-radius: 15px;
`;
export default Sidebar;
