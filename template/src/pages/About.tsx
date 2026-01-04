import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  color: #444;
  line-height: 1.8;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
    color: #1a1a2e;
    margin: 2rem 0 1rem;
  }
`;

function About() {
  return (
    <Container>
      <Title>About</Title>
      <Content>
        <p>
          Welcome to our site! This is a custom WordPress theme built with modern
          web technologies including React, TypeScript, and Vite.
        </p>
        
        <h2>Our Technology Stack</h2>
        <p>
          We use React 18 for building interactive user interfaces, TypeScript for
          type safety and better developer experience, and Vite for lightning-fast
          builds and hot module replacement during development.
        </p>
        
        <h2>WordPress Integration</h2>
        <p>
          This theme seamlessly integrates with WordPress, allowing you to leverage
          the power of the world's most popular CMS while building with modern
          frontend tools. The production build creates a standard WordPress theme
          zip file that can be uploaded directly to your WordPress installation.
        </p>
        
        <h2>Get Started</h2>
        <p>
          Edit this page by modifying <code>src/pages/About.tsx</code>. Your changes
          will be reflected instantly in development mode thanks to Vite's hot
          module replacement.
        </p>
      </Content>
    </Container>
  );
}

export default About;
