import { Avatar, Button, IconButton } from "@material-ui/core";

import Chat from "../Chat";

import styled from "styled-components";

import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SearchIcon from "@material-ui/icons/Search"

import * as EmailValidator from "email-validator"

import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const Sidebar = ({ setDisplay, displaySideBar, setDisplaySideBar }) => {
	const [user] = useAuthState(auth);
	const userChatRef = db
		.collection("chats")
		.where("users", "array-contains", user.email);
	const [chatSnapshot] = useCollection(userChatRef);

	const createChat = () => {
		const input = prompt(
			"please enter an email adress for the use you wish to chat with"
		);

		if (!input) return null;

		EmailValidator.validate(input) &&
		!chatAlreadyExist(input) &&
		input !== user.email
			? //we need to chat into the db
			  db.collection("chats").add({
					users: [user.email, input]
			  })
			: alert("Conversation already exists");
	};

	const chatAlreadyExist = (recipientEmail) => {
		!!chatSnapshot?.docs.find((chat) =>
			chat
				.data()
				.users.find((user) => user === recipientEmail?.length > 0)
		);
	};

	return (
		<Container display={displaySideBar}>
			<Header>
				<UserAvatar
					onClick={() => auth.signOut()}
					src={user?.photoURL}
				/>

				<IconContainer>
					<IconButton>
						<ChatIcon />
					</IconButton>

					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</IconContainer>
			</Header>

			<Search>
				<SearchIcon />
				<SearchInput placeholder="Search in Chats!" />
			</Search>

			<SidebarButton onClick={() => createChat()}>
				Start a new chat
			</SidebarButton>

			{/*List of Chats*/}

			{chatSnapshot?.docs.map((chat) => (
				<Chat
					key={chat.id}
					id={chat.id}
					users={chat.data().users}
					setDisplay={setDisplay}
					setDisplaySideBar={setDisplaySideBar}
				/>
			))}
		</Container>
	);
};

export default Sidebar;

const Container = styled.div`
	flex: 0.45;
	border-right: 1px solid whitesmoke;
	height: 100vh;
	min-width: 200px;
	max-width: 350px;
	overflow-y: scroll;

	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;

	@media (max-width: 425px) {
		display: ${(props) => (props.display ? "block" : "none")};
		flex-grow: 1;
		max-width: 100%;
	}
`;
const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;

const IconContainer = styled.div`

`;
const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;

`;

const SidebarButton = styled(Button)`
	width: 100%;

	&&& {
		border-top: 1px solid whitesmoke;
		border-bottom: 1px solid whitesmoke;
	}
`;