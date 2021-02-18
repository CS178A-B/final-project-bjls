import axios from "axios";

const fetchUserData = () => {
        axios
            .get("http://localhost:8000/api/job", {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("token")}`,
                },
            })
            .then((r) => {
                console.log(r);
                setJobData(r.data);
            })
            .catch((e) => {
                console.log(e.response);
            });
    }
};
