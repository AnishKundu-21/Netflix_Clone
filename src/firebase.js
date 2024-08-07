import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDHaSFCUSn7rTtmKc1kwoT_0Lv287zaLGk",
  authDomain: "netflix-clone-3beaa.firebaseapp.com",
  projectId: "netflix-clone-3beaa",
  storageBucket: "netflix-clone-3beaa.appspot.com",
  messagingSenderId: "451869204650",
  appId: "1:451869204650:web:0153fc11946b0fda61f0d3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email: user.email,
            createdAt: new Date()
        })
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword (auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
};

const logout = () => {
    signOut(auth);
}

export {auth, db, signup, login, logout};