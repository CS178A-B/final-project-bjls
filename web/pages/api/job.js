import axios from "axios";

// export const config = {
//     api: {
//         externalResolver: true,
//     },
// };

const fetchJobs = () => {
    if (typeof window !== "undefined") {
        axios
            .get("http://localhost:8000/api/job", {
                headers: {
                    Authorization: `JWT ${window.localStorage.getItem(
                        "token"
                    )}`,
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
    }
};

export default function handler(req, res) {
    switch (req.method) {
        case "GET":
            const response = fetchJobs();
            response ? res.status(200).json(response) : res.status(500).end();
            break;
        case "POST":
            res.status(404).end();
            // resolve();
            break;
        default:
            res.status(400).end();
    }
}

const postJobs = (data) => {
    axios
        .post("http://localhost:8000/api/job", {
            headers: {
                Authorization: `JWT ${window.localStorage.getItem("token")}`,
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
