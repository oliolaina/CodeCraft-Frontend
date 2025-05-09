import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/images/logo.svg';
import "../../assets/fonts/fonts.css";

export interface NavLink {
  label: string;
  to: string;
}

interface HeaderProps {
  links: NavLink[];
  profileLink: NavLink;
  logoText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  links,
  profileLink,
  logoText = 'CodeCraft'
}) => (
  <header className={styles.header}>
    <div className={styles.logo}><img src={logo} className={styles.logo} alt="logo" />{logoText}</div>
    <nav className={styles.nav}>
      {links.map((link) => (
        <a key={link.to} href={link.to} className={styles.link}>
          {link.label}
        </a>
      ))}
    </nav>
    <a href={profileLink.to} className={styles.profile}>
        {profileLink.label}
      </a>
  </header>
);
