class AyobaStub {
    constructor() {
        this.finish = this.finish;
        this.getMsisdn = this.getMsisdn;
        this.getCanSendMessage = this.getCanSendMessage;
        this.getLanguage = this.getLanguage;
        this.getSelfJid = this.getSelfJid;
        this.getContacts = this.getContacts;
        this.getCountry = this.getCountry;
        this.sendMessage = this.sendMessage;
        this.composeMessage = this.composeMessage;
        this.sendMedia = this.sendMedia;
        this.sendLocation = this.sendLocation;
        this.triggerLocationChanged = this.triggerLocationChanged;
        this.triggerProfileChanged = this.triggerProfileChanged;
        this.triggerPresenceChanged = this.triggerPresenceChanged;
        this.triggerMediaSentResponse = this.triggerMediaSentResponse;
        this.triggerLocationSentResponse = this.triggerLocationSentResponse;
        this.triggerNicknameChanged = this.triggerNicknameChanged;
    }

    finish() {
        return "This api call will close the ayoba microApp";
    }

    sendMessage() {
        return "message has been send..!";
    }

    composeMessage() {
        return "This Api will open the chat";
    }

    sendMedia() {
        return "https://i.ytimg.com/vi/d5PP4vIX7P8/maxresdefault.jpg , image/jpg";
    }

    sendLocation() {
        return `Latitude: -26.185357775567436 Longitude: 28.019023561909993`;
    }

    getCountry() {
        var country = "ZA";
        return country;
    }

    getContacts() {
        var jsonContacts = [{name: 'jack', phoneNumber: '0946576342'}, {name: 'suzzy', phoneNumber: '0356475834'}];
        return JSON.stringify(jsonContacts)
    }
    getAllContacts() {
        var jsonContacts = [{name: 'jack', phoneNumber: '0946576342'}, {name: 'suzzy', phoneNumber: '0356475834'}, {name: 'peter', phoneNumber: '0553479574'}];
        return JSON.stringify(jsonContacts)
    }

    getMsisdn() {
        var msisdn = "27833241313";
        return msisdn;
    }

    getCanSendMessage() {
        var canSendMessage = "1";
        return canSendMessage;
    }

    getLanguage() {
        var language = "en";
        return language;
    }
    sendGenericEvent(eventNumber, description) {
        console.log('eventNumber', eventNumber);
        console.log('description', description);
    }

    getSelfJid() {
        var selfJid = "65c3kdflfc5c7c3hb30lc7615beda57031p2d2df@dev.ayoba.me";
        return selfJid;
    }

    triggerLocationChanged() {
        onLocationChanged(-26.185357775567436, 28.019023561909993);
    }

    triggerProfileChanged() {
        onProfileChanged(
            "test name",
            "https://i.ytimg.com/vi/d5PP4vIX7P8/maxresdefault.jpg"
        );
    }

    triggerNicknameChanged() {
        onNicknameChanged("test nickname");
    }
    startPayment(method, amount, currency, description) {
        console.log(method, amount, currency, description);
        this.triggerOnPaymentStatusChanged()
    }
    // Payment status changed
    triggerOnPaymentStatusChanged() {
        onPaymentStatusChanged(1, "success", "no error");
    }
}