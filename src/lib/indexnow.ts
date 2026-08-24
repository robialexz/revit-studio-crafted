/**
 * IndexNow — trimitere rapidă de URL-uri către Bing/Yandex (indexul pe care
 * se sprijină și ChatGPT/Copilot). Cheia este publică prin design (fișierul
 * de verificare găzduit la /{key}.txt); nu este un secret.
 */
export const INDEXNOW_KEY = "09cc0f49373bfe3e74afbd962e8ac392";
export const INDEXNOW_HOST = "nodbim.com";

export const indexnowKeyUrl = () => `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

/** Conținutul fișierului de verificare IndexNow — exact cheia, fără newline. */
export const indexnowKeyFileContent = () => INDEXNOW_KEY;
