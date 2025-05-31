import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders logo and links', () => {
    render(
      <Header
        links={[{ label: 'Home', to: '/' }]}
        profileLink={{ label: 'Profile', to: '/profile' }}
        logoText='TestLogo'
      />
    );
    expect(screen.getByText('TestLogo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
