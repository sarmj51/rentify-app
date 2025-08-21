import styles from './HeaderComponent.module.scss';
export const HeaderComponent = () => {
    return (
        <header>
            <div className={styles.headerContent}>
                <h1 className={styles.headerTitle}>Rentify</h1>
                <nav className={styles.headerNav}>
                    <ul className={styles.headerNavList}>
                        <li><a href="/">Home</a></li>
                        <li><a href="/properties">Properties</a></li>
                        <li><a href="/owners">Owners</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}