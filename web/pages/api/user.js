import axios from "axios";

export default async (req, res) => {
    switch (method) {
        case "GET":
            const user = await fetchUserData();
            console.log(user);
            if (!user) {
                console.log(user);
                return res.status(404).json({
                    status: 404,
                    message: "Not Found",
                });
            }
            return res.json({ user });
            break;
        case "POST":
            // handlePost()
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

const fetchUserData = () => {
    axios
        .get("http://localhost:8000/api/job", {
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
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
