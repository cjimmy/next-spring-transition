import styles from '../../styles/Home.module.css';

// This file is not important to the example

const Footer = () => (
  <footer className={styles.footer}>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{' '}
      <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
    </a>
  </footer>
);

export default Footer;
