// Key dictionary.
var keys = {};
keys['w'] = 87;
keys['a'] = 65;
keys['s'] = 83;
keys['d'] = 68;
keys['space'] = 32;

// Mouse buttons.
var mouseButtons = {};
mouseButtons['left'] = 1;
mouseButtons['middle'] = 2;
mouseButtons['right'] = 3;

// Input object which handles all input while running.
var Input = {
    _keysDown: [],
    _mousePosition: new Vector2(),
    _mouseButtonsDown: [],

    // returns thje mouse position
    GetMousePosition: function ()
    {
        return this._mousePosition;
    },

    // Checks if a mouse button is pressed.
    GetMouseButtonDown: function (buttonName)
    {
        // Get mouse button pressed from list.
        var findButtonCode = mouseButtons[buttonName];
        // check if the button exists in the list
        if (findButtonCode != undefined)
        {
            // check if the button is in the list of buttons down
            if (this._mouseButtonsDown.includes(findButtonCode))
            {
                return true; // the button is down
            }
        }
        return false;
    },
    // Check if a key is pressed.
    GetKeyDown: function (keyName)
    {
        // Get the key pressed from the list.
        var findKeyCode = keys[keyName];
        // Check if the key pressed exists within the list.
        if (findKeyCode != undefined)
        {
            if (this._keysDown.includes(findKeyCode))
            {
                // Key is in the list
                return true;
            }
        }
        // Key is not in the list.
        return false;
    }
}

//  Mouse button down event (when a mouse button is clicked).
$(document).mousedown(function (event)
{
    // Push the mouse button pressed to the list.
    Input._mouseButtonsDown.push(event.which);
});

$(document).mouseup(function (event)
{
    // Remove mouse button pressed from the list.
    Input._mouseButtonsDown = Input._mouseButtonsDown.filter(function (button)
    {
        return button != event.which;
    });

});

/*
 * Document Events
 */

$(canvas).mousemove(function (event)
{
    //  Obtain the offsets
    var offset = $(this).offset();

    //  Get real mouse position
    Input._mousePosition.x = event.pageX - offset.left;
    Input._mousePosition.y = event.pageY - offset.top;
});

// Testing if a key is pressed.
$(document).keydown(function (event)
{
    // Push the key pressed to the list
    Input._keysDown.push(event.keyCode);
});

// Testing if key has stopped being pressed.
$(document).keyup(function (event)
{
    // Remove Key from the list
    Input._keysDown = Input._keysDown.filter(function (keyCode)
    {
        return keyCode != event.keyCode;
    });
});