import styles from './layout.module.css'

export default function Layout({ children }) {
    return <div className={styles.container}>{children}
    <div className={styles.waves}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#5000ca" fillOpacity="1" d="M0,192L30,202.7C60,213,120,235,180,213.3C240,192,300,128,360,128C420,128,480,192,540,213.3C600,235,660,213,720,192C780,171,840,149,900,160C960,171,1020,213,1080,245.3C1140,277,1200,299,1260,266.7C1320,235,1380,149,1410,106.7L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
            </path>
        </svg>
    </div>

    </div>;
  }