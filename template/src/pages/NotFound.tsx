import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 8rem 2rem;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  color: #1a1a2e;
  margin-bottom: 0;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  color: #888;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  background: #4a9eff;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s ease;

  &:hover {
    background: #3a8eef;
  }
`;

function NotFound() {
  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Title>Page Not Found</Title>
      <Description>Sorry, we couldn&apos;t find the page you&apos;re looking for.</Description>
      <HomeLink to="/">Go Home</HomeLink>
    </Container>
  );
}

export default NotFound;
