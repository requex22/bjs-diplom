'use strict';

const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();

logoutButton.action = () => {
	ApiConnector.logout((response) => {
		if (response.succes) {
			location.reload();
		}
	})
};

ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});

const getRates = () => {
	ApiConnector.getStocks(response => {
		if (response.succes) {
			FavoritesWidget.clearTable();
			FavoritesWidget.fillTable(response.data);
		} 
	})
};

getRates();

