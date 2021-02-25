import axios from "axios";

const fetchJobs = (token) => {
    axios
        .get("http://localhost:8000/api/job", {
            headers: {
                Authorization: `JWT ${token}`,
            },
        })
        .then((r) => {
            console.log(r);
            return r.data;
        })
        .catch((e) => {
            console.log(e.response);
            return e.response;
        });
};

const fetchUserData = (token) => {
    axios
        .get("http://localhost:8000/api/current-user", {
            headers: {
                Authorization: `JWT ${token}`,
            },
        })
        .then((r) => {
            console.log(r);
            return r.data();
        })
        .catch((e) => {
            console.log(e.response);
        });
};

const logInApi = (loginInfo) => {
    axios
        .post("http://localhost:8000/api/token-auth/", loginInfo)
        .then((r) => {
            console.log(r);
            if (r.status === 200) {
                window.localStorage.setItem("token", r.data.token);
            }
            return r.data();
        })
        .catch((error) => {
            console.log(error.response);
            return error.response;
        });
};

const signUpApi = (signUpInfo) => {
    axios
        .post("http://localhost:8000/api/user/", signUpInfo)
        .then((r) => {
            console.log(r);
            return r.data;
        })
        .catch((error) => {
            console.log(error.response);
            return error.response.data;
        });
};
