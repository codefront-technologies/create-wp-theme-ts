import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #1a1a2e;
  color: white;
  padding: 1rem 2rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  
  &:hover {
    color: #4a9eff;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-left: auto;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: #4a9eff;
  }
`;

const Main = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  background: #1a1a2e;
  color: white;
  padding: 1.5rem 2rem;
  text-align: center;
`;

function Layout() {
  return (
    <LayoutContainer>
      <Header>
        <Nav>
          <Logo to="/">My Site</Logo>
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
          </NavLinks>
        </Nav>
      </Header>
      
      <Main>
        <Outlet />
      </Main>
      
      <Footer>
        <p>&copy; {new Date().getFullYear()} My Site. All rights reserved.</p>
      </Footer>
    </LayoutContainer>
  );
}

export default Layout;
