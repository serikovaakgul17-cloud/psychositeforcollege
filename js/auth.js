// Тіркелу және кіру (Firebase Authentication, тегін).
// 1) Төмендегі firebaseConfig мәндерін өз жобаңыздан қойыңыз (README-дегі нұсқаулық).
// 2) Басқа беттерге: <a href="auth.html" id="authLink">Кіру</a>
//    және <script type="module" src="js/auth.js"></script>

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ====== БАПТАУ ======
const firebaseConfig = {
  apiKey: "AIzaSyAoRUrOVeAPqAE3-JyJKnCtvOmBeFG6Sz4",
  authDomain: "psychology-site-a1450.firebaseapp.com",
  projectId: "psychology-site-a1450",
  appId: "1:913419590070:web:0090c6274d50d1c06c0917"
};
const ONLY_GMAIL = true;          // true — тек @gmail.com қабылдайды
const SEND_VERIFY_EMAIL = true;   // тіркелгенде растау хатын жіберу
// =====================

const configured = !firebaseConfig.apiKey.startsWith("PASTE");
let auth = null;
if (configured) {
  auth = getAuth(initializeApp(firebaseConfig));
}

const $ = (id) => document.getElementById(id);

// ---- Меню батырмасы (барлық беттерде) ----
function updateNavLink(user) {
  const link = $("authLink");
  if (!link) return;
  if (user) {
    link.textContent = "Шығу";
    link.title = user.email || "";
    link.href = "#";
    link.onclick = async (e) => {
      e.preventDefault();
      await signOut(auth);
    };
  } else {
    link.textContent = "Кіру";
    link.title = "";
    link.href = "auth.html";
    link.onclick = null;
  }
}

// ---- Тек auth.html бетінде ----
const form = $("authForm");
let mode = "login"; // login | register

function showState(user) {
  if (!form) return;
  const done = $("authDone");
  const tabs = document.querySelector(".auth-tabs");
  if (user) {
    form.hidden = true;
    tabs.hidden = true;
    done.hidden = false;
    $("userEmail").textContent = user.email;
    $("verifyNote").hidden = user.emailVerified || !SEND_VERIFY_EMAIL;
  } else {
    form.hidden = false;
    tabs.hidden = false;
    done.hidden = true;
  }
}

function setMsg(text, ok = false) {
  const el = $("authMsg");
  el.textContent = text;
  el.classList.toggle("is-ok", ok);
}

function setMode(next) {
  mode = next;
  const reg = mode === "register";
  $("tabLogin").classList.toggle("is-active", !reg);
  $("tabRegister").classList.toggle("is-active", reg);
  $("tabLogin").setAttribute("aria-selected", String(!reg));
  $("tabRegister").setAttribute("aria-selected", String(reg));
  $("confirmField").hidden = !reg;
  $("authSubmit").textContent = reg ? "Тіркелу" : "Кіру";
  $("password").autocomplete = reg ? "new-password" : "current-password";
  $("forgotBtn").hidden = reg;
  setMsg("");
}

const ERRORS = {
  "auth/email-already-in-use": "Бұл пошта бұрын тіркелген. «Кіру» бөліміне өтіңіз.",
  "auth/invalid-email": "Пошта мекенжайы дұрыс емес.",
  "auth/weak-password": "Құпия сөз тым қарапайым. Кемінде 6 таңба жазыңыз.",
  "auth/invalid-credential": "Пошта немесе құпия сөз қате.",
  "auth/wrong-password": "Пошта немесе құпия сөз қате.",
  "auth/user-not-found": "Мұндай пайдаланушы табылмады.",
  "auth/too-many-requests": "Тым көп әрекет. Бірнеше минуттан кейін қайталаңыз.",
  "auth/network-request-failed": "Интернет байланысын тексеріңіз.",
  "auth/operation-not-allowed": "Firebase-те «Email/Password» кіру әдісі қосылмаған."
};
const errText = (e) => ERRORS[e.code] || "Қате болды: " + (e.code || e.message);

if (form) {
  $("tabLogin").addEventListener("click", () => setMode("login"));
  $("tabRegister").addEventListener("click", () => setMode("register"));

  $("togglePass").addEventListener("click", () => {
    const p = $("password");
    const show = p.type === "password";
    p.type = show ? "text" : "password";
    $("password2").type = show ? "text" : "password";
    $("togglePass").textContent = show ? "Жасыру" : "Көрсету";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!auth) {
      setMsg("Firebase әлі бапталмаған: js/auth.js ішіне firebaseConfig қойыңыз.");
      return;
    }
    const email = $("email").value.trim().toLowerCase();
    const pass = $("password").value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setMsg("Пошта мекенжайы дұрыс емес.");
    if (ONLY_GMAIL && !email.endsWith("@gmail.com")) return setMsg("Тек @gmail.com пошта қабылданады.");
    if (pass.length < 6) return setMsg("Құпия сөз кемінде 6 таңба болуы керек.");
    if (mode === "register" && pass !== $("password2").value) return setMsg("Құпия сөздер сәйкес емес.");

    const btn = $("authSubmit");
    btn.disabled = true;
    setMsg("");
    try {
      if (mode === "register") {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        if (SEND_VERIFY_EMAIL) await sendEmailVerification(cred.user);
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
      }
    } catch (err) {
      setMsg(errText(err));
    } finally {
      btn.disabled = false;
    }
  });

  $("forgotBtn").addEventListener("click", async () => {
    if (!auth) return setMsg("Firebase әлі бапталмаған.");
    const email = $("email").value.trim();
    if (!email) return setMsg("Алдымен поштаңызды жазыңыз.");
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Құпия сөзді қалпына келтіру хаты жіберілді.", true);
    } catch (err) {
      setMsg(errText(err));
    }
  });

  $("logoutBtn").addEventListener("click", () => auth && signOut(auth));
}

// ---- Кіру күйін бақылау (барлық оқиға өңдегіштерден кейін қосылады) ----
if (auth) {
  onAuthStateChanged(auth, (user) => {
    updateNavLink(user);
    showState(user);
  });
} else {
  updateNavLink(null);
}
