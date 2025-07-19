import { toast } from "react-toastify";

const PostRequests = async(userData,url) => {
    const req = await fetch(`http://localhost:8080/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    });

    const res = await req.json();
        if(req.status == 200 || req.status == 201)
        {
            toast.success(url == "userLogIn"? "LogIn Successfull.": "SignUp Successfull.");
            localStorage.setItem('token', res.jwtToken)
            localStorage.setItem('userRole', res.userRole)
            localStorage.setItem('email', res.email)
            localStorage.setItem('userName', res.userName)

            return {status: req.status, message: res.message, error: res.error};
        }
        else if(req.status == 400 || req.status == 404){
            toast.error("an error has occoured.")
            return {status: req.status, message: res.message, error: res.error};
        }
        else{
            toast.error("an error has occoured.")
            return {status: req.status, message: res.message, error: res.error};
        }
}

export default PostRequests;