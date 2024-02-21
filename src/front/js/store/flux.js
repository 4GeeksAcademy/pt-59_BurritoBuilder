const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,			
			token: null,
			user: null,
			ingredients: [],
			orders: [],
			//we can add more state properties as needed
		},
		actions: {
			// Use getActions to call a function within a fuction
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},			
			signUp: async (form, navigate) => {
				const url = process.env.BACKEND_URL+"/api/signup";
				await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({						
						"username": form.email,
                      	"password": form.password,
						"is_active": true
					})					
				})
				.then(async resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok) {
						alert("user already exists");
						return false;
					}
					await resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					navigate('/login');														
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			login: async(form) => {
				console.log(form)
				const store = getStore();
				const url =  process.env.BACKEND_URL+"/api/token";
				try{
					let response = await fetch(url, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({						
							"username": form.email,
							  "password": form.password
						})					
					})
					if(response.status==200){
						const data = await response.json();
						sessionStorage.setItem("token", data.token);
						sessionStorage.setItem("user", data.user_id);
						setStore({token: data.token});
						setStore({user: data.user_id})
						return true
					}
					else {
						alert("wrong username or password");
						return false;
					}
				}catch(error){console.log(error)}
				
			},
			authenticateUser: (navigate) => {
				const store = getStore();
				console.log(store.token);
				const url = process.env.BACKEND_URL+"/api/private"
				fetch(url, {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + store.token
					}
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						navigate("/login");
						alert("Please login to continue");
												
					}
					
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json();
				})
				.then(data => {
					setStore({user: data});
					
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			tokenFromStore: () => {
				let store = getStore();
				const token = sessionStorage.getItem("token");
				if (token && token!= null && token!=undefined) setStore({token: token});
			},
			logout: (navigate) => {			
				setStore({user:null});
				sessionStorage.removeItem("token");
				setStore({token: null});
				navigate("/");
			},
			//Burger Builder Actions Start Here
			getIngredients: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/ingredients");
                    const data = await response.json();
                    setStore({ ingredients: data });
                } catch (error) {
                    console.log("Error loading ingredients from backend", error);
                }
            },
// flux.js

createOrder: async (orderData, selectedIngredients) => {
    try {
        // Add selected ingredients to order data
        orderData.ingredients = selectedIngredients;

        const response = await fetch(process.env.BACKEND_URL + "/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });
        const data = await response.json();
        // Handle response data as needed, such as updating state
        console.log("Order created:", data);
    } catch (error) {
        console.log("Error creating order", error);
    }
},

            // Add more actions for interacting with orders as needed
            // Example: getOrders, updateOrder, deleteOrder, etc.
		}
	};
};

export default getState;
