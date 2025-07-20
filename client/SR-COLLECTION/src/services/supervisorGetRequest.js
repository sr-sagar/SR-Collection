const backendURL = import.meta.env.VITE_BACKEND_URL;

const supervisorGetRequests = async(url) => {
    const req = await fetch(`${backendURL}/${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem('sToken')}`
        },
    });

    const res = await req.json();
        if(req.status == 200 || req.status == 201)
        {
            return {res,status: req.status};
        }
        else if(req.status == 400 || req.status == 404){
            return {res,status: req.status};
        }
        else{
            return {res,status: req.status};
        }
}

export default supervisorGetRequests;