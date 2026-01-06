import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faCode, faGlobe } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 0;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #1a1a2e;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: #4a9eff;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const CTAButton = styled.a`
  display: inline-block;
  background: #4a9eff;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s ease;

  &:hover {
    background: #3a8eef;
  }
`;

function Home() {
  return (
    <Container>
      <Hero>
        <Title>Welcome to Your New Site</Title>
        <Subtitle>
          A modern WordPress theme powered by React, TypeScript, and Vite. Fast, flexible, and ready
          for customization.
        </Subtitle>
        <CTAButton href="#features">Explore Features</CTAButton>
      </Hero>

      <FeatureGrid id="features">
        <FeatureCard>
          <IconWrapper>
            <FontAwesomeIcon icon={faRocket} />
          </IconWrapper>
          <FeatureTitle>Lightning Fast</FeatureTitle>
          <FeatureDescription>
            Built with Vite for instant hot module replacement and optimized production builds.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <IconWrapper>
            <FontAwesomeIcon icon={faCode} />
          </IconWrapper>
          <FeatureTitle>Modern Stack</FeatureTitle>
          <FeatureDescription>
            React 18, TypeScript, and styled-components for a great developer experience.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <IconWrapper>
            <FontAwesomeIcon icon={faGlobe} />
          </IconWrapper>
          <FeatureTitle>WordPress Ready</FeatureTitle>
          <FeatureDescription>
            Builds directly to a WordPress theme zip file ready for deployment.
          </FeatureDescription>
        </FeatureCard>
      </FeatureGrid>
    </Container>
  );
}

export default Home;
