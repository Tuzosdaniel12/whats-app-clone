import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import ChatScreen from "../../components/ChatScreen"
import HeadTab from "../../components/Head"
import Sidebar from "../../components/Sidebar"
import { auth, db } from "../../firebase"
import  {getRecipient } from "../../utils/getRecipientEmail"

const Chats = ({chat, messages}) => {
    const [user] = useAuthState(auth);
    const { recipient, recipientEmail } = getRecipient(chat.users, user);

	const [displayChat, setDisplayChat] = useState(true);
	const [displaySideBar, setDisplaySideBar] = useState(false);

	const setDisplay = () =>{
		setDisplayChat(!displayChat);
		setDisplaySideBar(!displaySideBar);
	}

    return (
		<Container>
			<HeadTab
				title={`Chat with ${
					recipient ? recipient.name : recipientEmail
				}`}
			/>
			<Sidebar setDisplay={setDisplay} displaySideBar={displaySideBar} />
			<ChatContainer display={displayChat}>
				<ChatScreen
					chat={chat}
					messages={messages}
					setDisplay={setDisplay}
				/>
			</ChatContainer>
		</Container>
	);
}

export default Chats

export async function getServerSideProps(context) {
	const ref = db.collection("chats").doc(context.query.id);

	// Prep the Messages...
	const messagesRes = await ref
		.collection("messages")
		.orderBy("timestamp", "asc")
		.get();

	const messages = messagesRes.docs
		.map((doc) => ({
			id: doc.id,
			...doc.data()
		}))
		.map((messages) => ({
			...messages,
			timestamp: messages.timestamp.toDate().getTime()
		}));

	// Prep the Chats...
	const chatRes = await ref.get();
	const chat = {
		id: chatRes.id,
		...chatRes.data()
	};

	return {
		props: {
			messages: JSON.stringify(messages),
			chat: chat
		}
	};
}

const Container = styled.div`
    display: flex;
	height: 100vh;
`

const ChatContainer = styled.div`
	flex: 1;
	height: 100vh;
	overflow-y: scroll;
	::-webkit-scroll {
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
