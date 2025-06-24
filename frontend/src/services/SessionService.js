const getSessionFromStorage = () => {
    try {
        const session = localStorage.getItem("User");
        return session ? JSON.parse(session) : null;
    } catch (error) {
        console.log("🚀 ~ getSessionFromStorage ~ error", error);
        return null;
    }
};

const saveSession = (user) => {
    try {
        if (user) {
            localStorage.setItem("User", JSON.stringify(user));
        }
    } catch (error) {
        console.log("🚀 ~ saveSession ~ error", error);
    }
};

const getProfile = () => {
    try {
        const user = localStorage.getItem("User");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.log("🚀 ~ getProfile ~ error", error);
        return null;
    }
};

const clear = () => {
    try {
        localStorage.removeItem("User");
        localStorage.removeItem("token"); // kalau kamu simpan token auth
    } catch (error) {
        console.log("🚀 ~ clear session error", error);
    }
};

export const SessionService = {
    getSessionFromStorage,
    saveSession,
    getProfile,
    clear, // ✅ ditambahkan
};
