export const fetchGeneric = async (url, method = "GET", headers = {}, body = "" ) =>{

    try {
        let response;
        if(method == "GET"){
            response = await fetch(url,{ method, headers});
        }
        else if(method == "POST"){
            response = await fetch(url,{ method, headers, body});
        }

        let data = null;
        if(!response.ok){
            return data;
        }
        data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error en la peticion");    
    }
}