import styled from "styled-components"
import ChatScreen from "../../components/ChatScreen"
import HeadTab from "../../components/Head"
import Sidebar from "../../components/Sidebar"

const Chats = () => {
    return (
        <Container>
            <HeadTab title="Chat"/>
            <Sidebar />
            <ChatContainer>
                <ChatScreen/>
            </ChatContainer>
        </Container>
    )
}

export default Chats

const Container = styled.div`
    display: flex;

`

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scroll{
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;
