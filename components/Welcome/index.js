import React from 'react'
import { Box } from "@material-ui/core";
import styled from "styled-components";

const Welcome = () => {
    return (
		<Container>
			<LogoContainer>
				<Logo
					src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
					alt="logo"
				/>
				<Box m={2} variant="outlined" disabled color="text.primary">
					Welcome to WhatsApp Clone
				</Box>
				<Box fontWeight="fontWeightLight" color="text.primary">
					Start a chat on the left!!!
				</Box>
			</LogoContainer>
		</Container>
	);
}

export default Welcome


const Container = styled.div`
    flex:1;
	display: grid;
	place-items: center;
	height: 100vh;
	background-color: whitesmoke;
`;

const LogoContainer = styled.div`
	padding: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	border-radius: 5px;
	box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.75);
`;

const Logo = styled.img`
	height: 200px;
	width: 200px;
	margin-bottom: 50px;
`;

