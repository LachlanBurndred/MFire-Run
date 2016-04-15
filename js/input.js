//dictionary of key codes
var keys = {};

keys['w'] = 87;
keys['a'] = 65;
keys['s'] = 83;
keys['d'] = 68;
keys['space'] = 32;
    //could add more keys here!!!

//dictionary of mouse buttons
var mouseButtons = {};
mouseButtons['left'] = 1;
mouseButtons['middle'] = 2;
mouseButtons['right'] = 3;

// Input obrkce that handles imput throughtout game

var Input = {
    _keysDown: [],
    _mousePosition: new Vector2(),
    _mouseButtonsDown: [],

    //returns thje mouse position
    GetMousePosition: function () {
        return this._mousePosition;
    },

    //Function that checks if a mouse button is down and returns true/false
    GetMouseButtonDown: function (buttonName) {
        //Try and obtain a list of 
        var findButtonCode = mouseButtons[buttonName];
        //check if the button exists in teh list
        if (findButtonCode != undefined) {
            //check if the button is in teh list of buttons down
            if (this._mouseButtonsDown.includes(findButtonCode)) {
                return true; //the button is down
            }
        }
        return false;
    },
    // function that checks if a key button is down
    GetKeyDown: function (keyName)
    {
        //Try and obtan the keycode from teh lsit of keys defined
        var findKeyCode = keys[keyName];
        //Check if the keycode exists in the list above
        if (findKeyCode != undefined)
        {
            if (this._keysDown.includes(findKeyCode))
            {
                // "includes" means, does this array include this???
                //The key is down if it is in the list
                return true;
            }
        }
        //The key is NOT down!
        return false;
    }

    //document evernts
}
// Add an event to teh docuemtn that gets teh mous buttons down
$(document).mousedown(function (event)
{
    //Push button into mouse button down list
    Input._mouseButtonsDown.push(event.which);
        // "push" means 'add to the list'
    //"which" is because there are 3 mouse buttons - 1, 2, 3
    //document has put the particular button in the list
});

$(document).mouseup(function (event) {
    //Remove the mouse button that is up from the list
    Input._mouseButtonsDown = Input._mouseButtonsDown.filter(function (button) {
        return button != event.which;
        //"filter" means remove it from the list
    });

});

/*
 * Document Events
 */

// not great code, but the canvas disappears ????
$(canvas).mousemove(function (event)
{
    // Obtain the offsets
    var offset = $(this).offset();

    // Set the mouse positions
    Input._mousePosition.x = event.pageX - offset.left;
    Input._mousePosition.y = event.pageY - offset.top;
});

//Add a keydown event to test to for the keys that are down
$(document).keydown(function (event) {
    //Push the key that is up from the list
    Input._keysDown.push(event.keyCode);
        // "push" means 'add to the list'
    // this time we can use Key Codes rather than "which"
});
//Add a keydup event to test to for the keys that are up
$(document).keyup(function (event) {
    //Remove Key from the list
    Input._keysDown = Input._keysDown.filter(function (keyCode) {
        return keyCode != event.keyCode;
        //"filter" means remove it from the list
        // If key is NOT = to the list, then remove it!
    });
});