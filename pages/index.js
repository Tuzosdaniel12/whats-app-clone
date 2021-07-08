import Head from '../components/Head.js'
import Sidebar from '../components/Sidebar'
import styled from "styled-components";
import { useState } from 'react';
import Welcome from '../components/Welcome/index.js';

export default function Home() {

	const [displaySideBar, setDisplaySideBar] = useState(true);

  return (
		<Container>
			<Head title="WhatAppClone" />
			<Sidebar
				setDisplaySideBar={setDisplaySideBar}
				displaySideBar={displaySideBar}
			/>
			<WelcomeContainer>
				<Welcome />
			</WelcomeContainer>

		</Container>
  );
}

const Container = styled.div`
	height: 100vh;
	display: flex;
`;

const WelcomeContainer = styled.div`
	flex: 1;
	height: 100vh;
	@media (max-width: 425px) {
		display: ${(props) => (props.display ? "block" : "none")};
	}
`;