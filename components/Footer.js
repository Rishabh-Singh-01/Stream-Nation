import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Footer.module.css';
import {
  faTwitter,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';

library.add(faTwitter, faInstagram, faFacebook);

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerIntro}>
        <p className={styles.footerLogo}>
          <ImageWithFallback
            src='/fullLogo.png'
            height={92}
            width={537}
            alt='Website Logo'
          />
        </p>
        <div className={styles.footerIcon}>
          <Link href='#'>
            <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
          </Link>
          <Link href='#'>
            <FontAwesomeIcon icon={faFacebook} className={styles.icon} />
          </Link>
          <Link href='#'>
            <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
          </Link>
        </div>
        <span className={styles.footerCopyright}>
          Copyright &copy; 2023 by the creator,
          <br /> Inc. All rights reserved.
        </span>
      </div>
      <nav>
        <p>Company</p>
        <ul className={styles.company}>
          <li>
            <Link href={'#'}>Details About Us</Link>
          </li>
          <li>
            <Link href={'#'}>Copyright</Link>
          </li>
          <li>
            <Link href={'#'}>How we work</Link>
          </li>
        </ul>
      </nav>
      <nav>
        <p>Resources</p>
        <ul className={styles.resources}>
          <li>
            <Link href={'#'}>Get Help</Link>
          </li>
          <li>
            <Link href={'#'}>Privacy Terms</Link>
          </li>
          <li>
            <Link href={'#'}>For Business</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
