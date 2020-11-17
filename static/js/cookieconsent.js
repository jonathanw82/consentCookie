/*
This code creates a cookie consent to run a modal that askes the user if they consent to cookies;
*/

const cookieStorage = {
    // get an item from a cookie 
    getItem: (key) =>{
        // get a list of cookies and place them in a object with the cookie 
        // key being the key and value being the value assigned to each key.
        const cookies = document.cookie
            // Split the string that comes back by a semicolon as thats the delimiter
            // that all the cookies are broken up in the cookie string with.
            .split(';')
            // Map all the cookies in to an array so split them again, in to key value pairs
            // and user the '=' because thata how they appear in the actual cookie string itself.
            .map(cookie => cookie.split('='))
            // Reduce the array so that every item that comes back in the subarray will be representative 
            // of the key and value. Then recreate an object to spread back into the accumulator at each
            // iteration, then for each key trim any whitespace off of it, the value is the value.
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
        return cookies[key]
    },
    // Set a cookie in the browser with key value pairs as parameters.
    setItem: (key, value) =>{
        var d = new Date();
        d.setTime(d.getTime() + (100 * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = key + "=" + value + ";" + expires + ";path=/";
    },
};

// Setting the localstorage holds the consent of the user so it only shows once.
const storageType = cookieStorage;
const consentPropertyName = 'gdpr_consent';

// When we reference the local storage, if the key name is present or a value is associated with that key name
// then this will return false, so do not show any popups. If it returns a false value and there is no value
// associated with with it then return true and show the popup.
const shouldShowPopup = () => !storageType.getItem(consentPropertyName);

// If the user gives consent then this will set the consentPropertyName to True so the shouldshowPopup
// will give us the result we need.
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () =>{
    const consentPopup = document.getElementById('consent-popup');
    const acceptBtn = document.getElementById('accept');

    const acceptfn = event => {
        saveToStorage(storageType);
        consentPopup.classList.add('hidden');
    };

    acceptBtn.addEventListener('click', acceptfn);

    if (shouldShowPopup()) {
        setTimeout(() => {
           consentPopup.classList.remove('hidden'); 
        }, 800);
    }
};


/*

This code demonstarights how to save things in to local or session storage.
*/

// // Setting the localstorage holds the consent of the user so it only shows once.
// const storageType = sessionStorage;
// const consentPropertyName = 'gdpr_consent';

// // When we reference the local storage, if the key name is present or a value is associated with that key name
// // then this will return false, so do not show any popups. If it returns a false value and there is no value
// // associated with with it then return true and show the popup.
// const shouldShowPopup = () => !storageType.getItem(consentPropertyName);

// // If the user gives consent then this will set the consentPropertyName to True so the shouldshowPopup
// // will give us the result we need.
// const saveToStorage = () => storageType.setItem(consentPropertyName, true);

// window.onload = () =>{
//     if (shouldShowPopup()) {
//         const consent = confirm('Agree to the trems and conditions of the site?');
//         if(consent){
//             saveToStorage();
//         }
//     }
// };