import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../../firebase";
import moment from "moment";
import Linkify from "react-linkify";

const Messages = ({ user, message }) => {
    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

    return (
		<Container>
			<Linkify
				properties={{ target: "_blank" }}>
				<TypeOfMessage>
					{message.message}
					<Timestamp>
						{message.timestamp
							? moment(message.timestamp).format("LT")
							: "..."}
					</Timestamp>
				</TypeOfMessage>
			</Linkify>
		</Container>
	);
}

export default Messages

const Container = styled.div`

`
const MessageElement = styled.p`
	width: fit-content;
	padding: 15px;
	border-radius: 8px;
	margin: 5px;
	min-width: 60px;
	max-width: 85%;
	padding-bottom: 26px;
	position: relative;
	text-align: left;
	word-break: break-word;

	> a {
		color: blue;
		font-weight: bold;
		text-decoration: underline;
	}
`;

const Sender = styled(MessageElement)`
	margin-left: auto;
	background-color: #dcf8c6;
`;

const Reciever = styled(MessageElement)`
	background-color: whitesmoke;
`;

const Timestamp = styled.span`
	color: gray;
	padding: 10px;
	font-size: 9px;
	position: absolute;
	bottom: 0;
	text-align: right;
	right: 0;
`;