import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

export const getRecipientEmail = (users, userLoggedIn) =>(
    users?.filter(userToFilter => userToFilter !== userLoggedIn?.email)[0]
)




export const getRecipient = (users, user) => {
	const recipientEmail = getRecipientEmail(users, user);

	const collection = useCollection

	const [recipientSnapshot] = collection(
		db.collection("users").where("email", "==", recipientEmail)
	);

	const recipient = recipientSnapshot?.docs?.[0]?.data();

    return { recipient, recipientEmail };
};
