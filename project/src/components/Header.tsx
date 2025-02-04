import styled from "styled-components";

const Header = () => {
    return (
        <Container>
            <img src="/public/btheegg-logo.png"/>
        </Container>
    );
};

export default Header;

const Container = styled.div`
    width:100%;
    height:88px;
    background-color:red;
`