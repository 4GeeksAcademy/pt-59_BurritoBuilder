import React from 'react';
 

class AccountProfile extends React.Component {
    createNewOrder = () => {
        alert("Create New Order clicked!");
    }

    showFavorites = () => {
        alert("Favorites clicked!");
    }

    viewOrderHistory = () => {
        alert("Order History clicked!");
    }

    render() {
        return (
            <div>
                <div className="header">
                    <img src="user-icon.png" alt="User Icon" className="user-icon" />
                    <span className="username">Username</span>
                </div>

                <div className="button-container">
                    <button onClick={this.createNewOrder}>Create New Order</button>
                    <button onClick={this.showFavorites}>Favorites</button>
                    <button onClick={this.viewOrderHistory}>Order History</button>
                </div>
            </div>
        );
    }
}

export default AccountProfile;