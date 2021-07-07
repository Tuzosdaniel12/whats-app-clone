import Head from '../components/Head.js'
import Sidebar from '../components/Sidebar'
import styled from "styled-components";
import { useState } from 'react';

export default function Home() {

	const [displaySideBar, setDisplaySideBar] = useState(true);

  return (
		<Container>
			<Head title="WhatAppClone" />
			<Sidebar
				setDisplaySideBar={setDisplaySideBar}
				displaySideBar={displaySideBar}
			/>
		</Container>
  );
}

const Container = styled.div`
	display: flex;
`;