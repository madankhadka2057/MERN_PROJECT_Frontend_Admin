const { AuthenticatedApi } = require("./Hello");

    class ApiServices {
        async getDatas(endpoint){
                try{
                    const response=AuthenticatedApi.get(`/${endpoint}`)
                    return (await response).data.data
                }
                catch(err){
                    console.log("Error Occure",err)
                    throw err
                }
        }
    }
    const api= new ApiServices()

export default api