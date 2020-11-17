/*
This code creates a cookie consent to run a modal that askes the user if they consent to cookies;
*/

// Setting the localstorage holds the consent of the user so it only shows once.
const storageType = sessionStorage;
const consentPropertyName = 'gdpr_consent';

// When we reference the local storage, if the key name is present or a value is associated with that key name
// then this will return false, so do not show any popups. If it returns a false value and there is no value
// associated with with it then return true and show the popup.
const shouldShowPopup = () => !storageType.getItem(consentPropertyName);

// If the user gives consent then this will set the consentPropertyName to True so the shouldshowPopup
// will give us the result we need.
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () =>{
    if (shouldShowPopup()) {
        const consent = confirm('Agree to the trems and conditions of the site?');
        if(consent){
            saveToStorage();
        }
    }
};