import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { useRef, useState } from "react";

import { Avatar, IconButton } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";

import Messages from "../../components/Messages"
import styled from "styled-components";
import { getRecipient } from "../../utils/getRecipientEmail.js";

import firebase from "firebase"
import { auth, db } from "../../firebase";

import TimeAgo from "timeago-react";


const ChatScreen = ({ chat, messages, setDisplay }) => {
	const [input, setInput] = useState();
	const [user] = useAuthState(auth);
	const router = useRouter();
	const endOfMessageRef = useRef(null);
	const [messagesSnapshot] = useCollection(
		db
			.collection("chats")
			.doc(router.query.id)
			.collection("messages")
			.orderBy("timestamp", "asc")
	);

	const showMessage = () => {
		if (messagesSnapshot) {
			return messagesSnapshot.docs.map((message) => (
				<Messages
					key={message.id}
					user={message.data().user}
					message={{
						...message.data(),
						timestamp: message.data().timestamp?.toDate().getTime()
					}}
				/>
			));
		} else {
			return JSON.parse(messages).map((message) => (
				<Messages
					key={message.id}
					user={message.user}
					message={message}
				/>
			));
		}
	};

	const sendMessage = (e) => {
		e.preventDefault();

		db.collection("users").doc(user.uid).set(
			{
				lastSeen: firebase.firestore.FieldValue.serverTimestamp()
			},
			{ merge: true }
		);

		db.collection("chats").doc(router.query.id).collection("messages").add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			user: user.email,
			photoURL: user.photoURL
		});

		setInput("");

		ScrollToBottom();
	};

	const ScrollToBottom = () => {
		endOfMessageRef.current.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};

	const { recipient, recipientEmail } = getRecipient(chat.users, user);

	return (
		<Container>
			<Header>
				{recipient ? (
					<Avatar src={recipient?.photoUrl} />
				) : (
					<>
						<Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
					</>
				)}
				<HeaderInfo>
					<h3>{recipient ? recipient.name : recipientEmail}</h3>
					{recipient ? (
						<p>
							Last active:{` `}
							{recipient?.lastSeen?.toDate() ? (
								<TimeAgo
									datetime={recipient?.lastSeen?.toDate()}
								/>
							) : (
								"Unavailable"
							)}
						</p>
					) : (
						<p>Loading Last active...</p>
					)}
				</HeaderInfo>
				<HeaderIcons>
					<Icon onClick={() => setDisplay()} display={false}>
						<ArrowBackIosIcon />
					</Icon>

					<Icon display={true}>
						<CallIcon />
					</Icon>

					<Icon display={true}>
						<MoreVertIcon />
					</Icon>
				</HeaderIcons>
			</Header>

			<MessageContainer>
				{/**/}
				{showMessage()}
				<EndOfMessage ref={endOfMessageRef} />
			</MessageContainer>

			<InputContainer>
				<InsertEmoticonIcon color="action" />
				<AttachFileIcon color="action" />
				<Input
					value={input}
					placeholder="Type a message..."
					onChange={(e) => setInput(e.target.value)}
				/>
				<button
					hidden
					disable={!input}
					type="submit"
					onClick={sendMessage}>
					Send Message
				</button>
				<MicIcon color="action" />
			</InputContainer>
		</Container>
	);
};

export default ChatScreen;

const Container = styled.div`
	display: flex;
	flex-direction: column;
    width: 100%;
`;
const Header = styled.div`
    position: sticky;
    background-color: whitesmoke;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`

const HeaderInfo = styled.div`
	margin-left: 15px;
	flex: 1;

	> h3 {
		margin-bottom: 3px;
	}
	> p {
		font-size: 14px;
		margin: 0;
		color: gray;
	}

	@media (max-width: 425px) {
		> h3 {
			display: block;
		}
		> p {
			font-size: 10px;
		}
	}
`;

const HeaderIcons = styled.div`
	display: flex;
`

const MessageContainer = styled.div`
	padding: 30px;
	padding-bottom: 5px;
	width: 100%;
	background-image: url("https://cdn.wallpapersafari.com/1/80/8DYndB.png");
	min-height: 90vh;
`;

const EndOfMessage = styled.div`
    margin-bottom: 10px;
`

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding:10px;
    position: sticky;
    bottom: 0;
    background-color: whitesmoke;
    z-index: 100;
`
const Input = styled.input`
	flex: 1;
	outline: 0;
	border: none;
	border-radius: 50px;
	background-color: white;
	padding: 20px;
	margin-left: 15px;
	margin-right: 15px;
`;

const Icon = styled(IconButton)`
	&&& {
		padding: 10px;
	}
	@media (min-width: 425px) {
		&&& {
			display: ${(props) => (props.display ? "block" : "none")};
		}
	}
	@media (max-width: 425px) {
		&&& {
			padding: 0;
		}
	}
`;