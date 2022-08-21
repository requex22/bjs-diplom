'use strict';

const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = () => {
	ApiConnector.logout(response => {
		if (response.succes) {
			location.reload();
		}
	});
};

ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});

function getRates() {
    ApiConnector.getStocks(response => {
        if (response.success){
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data)
        }
    });
};

getRates();
setInterval(getRates, 60 * 1000);

moneyManager.addMoneyCallback = (data => {
	ApiConnector.addMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Пополнение средств произошло успешно');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});	
});

moneyManager.conversionMoneyCallback = (data => {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Конвертация валюты произошла успешно');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
});

moneyManager.sendMoneyCallback = (data => {
	ApiConnector.transferMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, 'Перевод средств пользователю произошёл успешно');
		} else {
			moneyManager.setMessage(false, response.error);
		}
	});
});

ApiConnector.getFavorites(response => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		MoneyManager.updateUsersList(response.data);
	}
})

favoritesWidget.addUserCallback = (id => {
	ApiConnector.addUserToFavorites(id, response => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Пользователь добавлен');
		} else {
			favoritesWidget.setMessage(false, response.error);
		}
	});
});

favoritesWidget.removeUserCallback = (id => {
	ApiConnector.removeUserFromFavorites(id, response => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(true, 'Пользователь удалён');
		} else {
			favoritesWidget.setMessage(false, response.error);
		}
	});
});
