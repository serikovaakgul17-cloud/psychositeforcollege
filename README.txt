Психолог қасыңда — көпбеттік HTML/CSS/JavaScript жобасы.

ТІРКЕЛУ ЖӘНЕ КІРУ (Firebase Authentication, тегін)
Беті: auth.html. Код: js/auth.js. Стиль: css/auth.css.
Тіркелу жұмыс істеуі үшін Firebase баптау керек:
1. console.firebase.google.com -> Add project (Google Analytics керек емес).
2. Build -> Authentication -> Get started -> Sign-in method -> Email/Password -> Enable.
3. Project settings (шестерня) -> Your apps -> Web (</>) -> тіркеп, firebaseConfig көшіріңіз.
4. js/auth.js ішіндегі firebaseConfig (PASTE_...) мәндерін ауыстырыңыз.
5. Authentication -> Settings -> Authorized domains -> Add domain:
   muratbekovmadiyar24-bit.github.io
6. Файлдарды GitHub-қа қайта жүктеңіз.
Ескерту: auth.html файлын қос басып ашсаңыз жұмыс істемейді (браузер модульдерді file:// арқылы бұғаттайды).
GitHub Pages сілтемесімен немесе localhost серверімен ашыңыз.
Тек Gmail қабылдау: js/auth.js ішінде ONLY_GMAIL = true (барлық пошта үшін false).
