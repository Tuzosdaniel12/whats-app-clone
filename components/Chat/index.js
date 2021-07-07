import styled from "styled-components"
import { auth, db } from "../../firebase";
import { Avatar } from "@material-ui/core"
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { getRecipient, getRecipientEmail } from "../../utils/getRecipientEmail";


const Chat = ({ id, users, setDisplay, setDisplaySideBar }) => {
	const router = useRouter();
	// get log in users
	const [user] = useAuthState(auth);

	const { recipient, recipientEmail } = getRecipient(users, user);

	const enterChat = () => {
        setDisplaySideBar? setDisplaySideBar(): setDisplay()
		router.push(`/chat/${id}`);
	};

	return (
		<Container onClick={enterChat}>
			{recipient ? (
				<>
					<UserAvatar src={recipient?.photoUrl} />
					<p>{recipient?.name.toUpperCase()}</p>
				</>
			) : (
				<>
					<UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>
					<p>{recipientEmail.toUpperCase()}</p>
				</>
			)}
		</Container>
	);
};

export default Chat

const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;

    :hover {
        background-color: #e9eaeb;
    }
`

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`