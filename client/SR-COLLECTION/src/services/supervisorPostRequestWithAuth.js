const backendURL = import.meta.env.VITE_BACKEND_URL;

const supervisorPostRequestWithAuth = async(userData,url) => {
    const req = await fetch(`${backendURL}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem('sToken')}`
        },
        body: JSON.stringify(userData)
    });

    const res = await req.json();
        if(req.status == 200 || req.status == 201)
        {
            return {status: req.status, message: res.message, isEmail : res.isEmail};
        }
        else if(req.status == 400 || req.status == 404){
            return {status: req.status, message: res.message, isEmail : res.isEmail};
        }
        else{
            return {status: req.status, message: res.message, isEmail : res.isEmail};
        }
}

export default supervisorPostRequestWithAuth;