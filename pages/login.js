import { Button } from "@material-ui/core";
import HeadTab from "../components/Head";
import styled from "styled-components";
import { auth, provider } from "../firebase";

const login = () => {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
		<Container>
			<HeadTab title="Login" />

			<LoginContainer>
				<Logo
					src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
					alt="logo"
				/>
				<Button onClick={signIn} variant="outlined">
					Sign in with Google
				</Button>
			</LoginContainer>
		</Container>
	);
};

export default login;

const Container = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
	width: 100vw;
	background-color: whitesmoke;
`;

const LoginContainer = styled.div`
	padding: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	border-radius: 5px;
	box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.75);

	@media (max-width: 425px) {
		padding: 50px;
	}
`;

const Logo = styled.img`
	height: 200px;
	width: 200px;
	margin-bottom: 50px;

`;