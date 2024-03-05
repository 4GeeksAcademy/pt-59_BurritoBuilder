const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,			
			token: null,
			user: null,
			ingredients: [],
			burgers: [],
			// orders: [],
			current_burger: {},
			ShoppingCart: [],
			FavoriteBurger: [], 
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
							"email": form.email,
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
	//--> Burger Builder Actions Start Here <--
	
	// createBurger works <--2/26/24 added Authorization that calls stored token
	createBurger: async () => {
		const store = getStore(); 
		const response = await fetch(process.env.BACKEND_URL + "/api/burgers", {	
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + store.token 
			},	
		});
		const data = await response.json();
			setStore({ current_burger: data });
			setStore({ burgers: data });
			console.log("Burger created:", data);
	},
	// getIngredients works <--2/26/24
	getIngredients: async () => { 
		const response = await fetch(process.env.BACKEND_URL + "/api/ingredients");
		const data = await response.json();
		setStore({ ingredients: data });	
	},

	getBurgers: async () => { 
		const response = await fetch(process.env.BACKEND_URL + "/api/burgers"); 
		const data = await response.json();
		setStore({ burgers: data.burgers });	
	},
	
	fetchBurgerIngredients: async (ingredients) => {
		const store = getStore(); 
		const response = await fetch(`${process.env.BACKEND_URL}/api/burgers/${ingredients}`, {
			method: "GET",
			headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + store.token 
			},	
		});
	const data = await response.json();
		setStore({ current_burger: data.burger });
	},
	//this does not work as intended
	getCurrentBurger: async (burger_id) => { 
		try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/burgers/${burger_id}`);
			
			
			const data = await response.json();
			// Setting the store with the extracted data
			setStore({ current_burger: data });
		} catch (error) {
			console.log("Error loading current burger from backend", error);
		}
	},
	addIngredientToBurger:async (burger_id, ingredient_id) => {
		if (typeof(burger_id)=="undefined"){
			let burger = getStore().burgers[getStore().burgers.length - 1]
			// console.log(burger)	
			burger_id=burger.id
		}
		const response = await fetch(`${process.env.BACKEND_URL}/api/burgers/${burger_id}`, {
			method: "PUT",
			headers: {
			"Content-Type": "application/json"
			},
			body: JSON.stringify({
			id: ingredient_id
			})
		});
		// Handle the response as needed
		if (!response.ok) {
			throw new Error('Failed to add ingredient to burger');
		}
		// Return any data from the response if needed
		const data = await response.json();
		setStore({current_burger: data.burger});
		
		},
		clearIngredients: async (burger_id, setBurgerIngredients, store) => {
			try {   
				const response = await fetch(`${process.env.BACKEND_URL}/api/burgers/${burger_id}/ingredients`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						// 'Authorization': `Bearer ${store.token}`
					},
				});
				if (!response.ok) {
					// Handle the case where the request was not successful
					throw new Error('Failed to clear ingredients from the burger');
				}
				// Clear ingredients from the global state if needed
				setBurgerIngredients([]);
				// Return the response data if needed
				const responseData = await response.json();
				return responseData;
			} catch (error) {
				// Handle any errors that occur during the fetch request
				console.error('Error clearing ingredients:', error);
				throw error;
			}
		},
		// Fetch to post the burger ID and user ID to the shopping cart:
		addToShoppingCart:  async (userId, burgerId) => {
			try {
				const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/shopping-cart/${userId}/burgers`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ 
						burger_id: burgerId
					}),

				});
				if (!response.ok) {
					throw new Error('Failed to add burger to shopping cart');
				}
				const responseData = await response.json();
				return responseData;
			} catch (error) {
				console.error('Error adding burger to shopping cart:', error);
				throw error;
			}
		},
		// Fetch to post the burger ID and user ID to favorites:
		 addToFavorites: async (userId, burgerId) => {
			try {
				const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/favorite-burgers/${userId}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ burger_id: burgerId }),
				});
				if (!response.ok) {
					throw new Error('Failed to add burger to favorites');
				}
				const responseData = await response.json();
				return responseData;
			} catch (error) {
				console.error('Error adding burger to favorites:', error);
				throw error;
			}
		},
		
		



		
	// Add Ingredient to Burger
	// addIngredienttoBurger:async (ingredientId) => { 
	// 	try {
	// 		const response = await fetch(`${process.env.BACKEND_URL}/api/burgers/<int:burger_id>/add_ingredient`, {
	// 			method: "PUT",
	// 			headers: {
	// 				"Content-Type": "application/json"
	// 			},
	// 			body: JSON.stringify({ 
	// 				ingredient_id: ingredientId
	// 			 })
	// 		});
			
	// 	} catch (error) {
	// 		console.log("Error adding ingredient to order", error);
	// 	}
	// },
	// removeIngredientfromBurger:async (burgerId, ingredientId) => { 
	// 	try {
	// 		const response = await fetch(`${process.env.BACKEND_URL}/api/burgers/<int:burger_id>/remove_ingredient`, {
	// 			method: "DELETE",
	// 			headers: {
	// 				"Content-Type": "application/json"
	// 			},
	// 			body: JSON.stringify({ ingredient_id: ingredientId }) // Send ingredientId for removal
	// 		});

	// 		} catch (error) {
	// 		  console.log("Error removing ingredient from burger", error);
	// 		  throw error;
	// 		}
	// 	  },
	// Remove Ingredient from Burger


	//need to work on displaying the ingredients for the burger
	// getBurgers: async () => { 
	// 	try {
	// 		const response = await fetch(`${process.env.BACKEND_URL}/api/burgers${burger_id}`); 
	// 		if (!response.ok) {
	// 			throw new Error('Failed to fetch burgersss');
	// 		}
	// 		const data = await response.json();
	// 		return data; // Return the fetched burgers data
	// 	} catch (error) {
	// 		console.error("Error loading burgerssss data from backend:", error);
	// 		throw error; // Re-throw the error to be handled elsewhere if needed
	// 	} 
	// },	
	


		// addIngredientToOrder: async (ingredient) => {
		// 	try {
		// 		const response = await fetch(`${process.env.BACKEND_URL}/api/add-ingredient`, {
		// 			method: "POST",
		// 			headers: {
		// 				"Content-Type": "application/json"
		// 			},
		// 			body: JSON.stringify({
		// 				name: ingredient.name, 
		// 				price: ingredient.price,
		// 				is_selected: true, 
		// 				ingredientImg: ingredient.imgSrc 
		// 			})
		// 		});
				
		// 	} catch (error) {
		// 		console.log("Error adding ingredient to order", error);
		// 	}
		// },
		
		
		// removeIngredientFromOrder: async (ingredient) => {
		// 	try {
		// 		// Perform a DELETE request to remove the ingredient from the order
		// 		const response = await fetch(process.env.BACKEND_URL + `/api/remove-ingredient/${ingredient.name}`, {
		// 			method: "DELETE",
		// 			headers: {
		// 				"Content-Type": "application/json"
		// 			}
		// 		});
		// 		// Handle the response as needed
		// 	} catch (error) {
		// 		console.log("Error removing ingredient from order", error);
		// 	}
		// },
		

			

		// createIngredientstoBurger: async (orderData, selectedIngredients) => {
		// 	try {
		// 		// Add selected ingredients to order data
		// 		orderData.ingredients = selectedIngredients;

		// 		// Send the order data to the backend to create a new order
		// 		const response = await fetch(process.env.BACKEND_URL + "/api/burgeringredient", {
		// 			method: "POST",
		// 			headers: {
		// 				"Content-Type": "application/json"
		// 			},
		// 			body: JSON.stringify(orderData)
		// 		});
		// 		const data = await response.json();
		// 		// Handle response data as needed, such as updating state or navigating to the cart page
		// 		console.log("Order created:", data);
		// 	} catch (error) {
		// 		console.log("Error creating order", error);
		// 	}
		// },

		// finalizeBurger: async (burgerId, selectedIngredients) => {
		// 	const ingredientIds = selectedIngredients.map(ing => ing.id);
		// 	const response = await fetch(`${process.env.BACKEND_URL}/api/burgers/${burgerId}`, {
		// 		method: "PUT",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 			// "Authorization": "Bearer " + getStore().token // If needed
		// 		},
		// 		body: JSON.stringify({ ingredients: ingredientIds })
		// 	});
		// 	if (response.ok) {
		// 		const updatedBurger = await response.json();
		// 		setStore(prevStore => {
		// 			const burgerIndex = prevStore.orders.findIndex(burger => burger.id === updatedBurger.id);
		// 			let newOrders = [...prevStore.orders];
		
		// 			if (burgerIndex !== -1) {
		// 				newOrders[burgerIndex] = updatedBurger;
		// 			} else {
		// 				newOrders.push(updatedBurger);
		// 			}
		
		// 			return {
		// 				...prevStore,
		// 				orders: newOrders,
		// 			};
		// 		});
		// 	} else {
		// 		console.log("Failed to finalize burger:", await response.text());
		// 	}
		// }
	} 
}; 
}; 

export default getState;

