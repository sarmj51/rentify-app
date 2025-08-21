import styles from './FooterComponent.module.scss';

export const FooterComponent = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p className={styles.footerText}>Copyright @ Rentify</p>
            </div>
        </footer>
    )
}