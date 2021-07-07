import Head from '../components/Head.js'
import Sidebar from '../components/Sidebar'
import Welcome from '../components/Welcome/index.js';
import styled from "styled-components";

export default function Home() {
  return (
		<Container>
			<Head title="WhatAppClone"/>
			<Sidebar/>
			<Welcome/>
		</Container>
  );
}

const Container = styled.div`
	display: flex;
`;