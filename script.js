
        // ==========================
        // Retrieve HTML elements
        // Storing references to DOM elements so they can be reused
        // without querying the DOM repeatedly on every button click
        // ==========================
        const temperatureInput = document.getElementById("temperature-input");
        const conversionDirection = document.getElementById("conversion-direction");
        const convertButton = document.getElementById("convert-button");
        const resultDisplay = document.getElementById("result-display");
        const errorMessage = document.getElementById("error-message");

        // ==========================
        // Validation function
        // Runs before every conversion attempt
        // Returns true if the input is valid, false if not
        // Displays a specific error message on the page for each failure case
        // ==========================
        function validateInput() {
            const inputValue = temperatureInput.value;

            // Check 1: input must not be empty
            // Number inputs can return an empty string if the field is cleared
            if (inputValue.trim() === "") {
                showError("Please enter a temperature.");
                return false;
            }

            // Check 2: input must be a valid number
            // Number("abc") returns NaN, so this catches any non-numeric input
            if (Number.isNaN(Number(inputValue))) {
                showError("Please enter a valid number.");
                return false;
            }

            // All checks passed: clear any existing error and signal success
            clearError();
            return true;
        }

        // ==========================
        // Celsius to Fahrenheit conversion function
        // Formula: F = (C x 9/5) + 32
        // Accepts a numeric value, returns the converted result as a float
        // ==========================
        function celsiusToFahrenheit(celsius) {
            return celsius * 9 / 5 + 32;
        }

        // ==========================
        // Fahrenheit to Celsius conversion function
        // Formula: C = (F - 32) x 5/9
        // Accepts a numeric value, returns the converted result as a float
        // ==========================
        function fahrenheitToCelsius(fahrenheit) {
            return (fahrenheit - 32) * (5 / 9);
        }

        // ==========================
        // Main conversion function
        // Reads the dropdown selection and calls the correct conversion function
        // Returns a formatted result string for display
        // toFixed(2) rounds the result to 2 decimal places for clean output
        // ==========================
        function convertTemperature(inputValue) {
            const direction = conversionDirection.value;

            if (direction === "celsius-to-fahrenheit") {
                const result = celsiusToFahrenheit(Number(inputValue));
                return `${inputValue} °C is ${result.toFixed(2)} °F`;
            } else {
                const result = fahrenheitToCelsius(Number(inputValue));
                return `${inputValue} °F is ${result.toFixed(2)} °C`;
            }
        }

        // ==========================
        // Helper function: showError
        // Displays an error message on the page and hides the result area
        // Centralizing this logic avoids repeating the same classList calls
        // ==========================
        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.classList.remove("hidden");
            resultDisplay.classList.add("hidden");
        }

        // ==========================
        // Helper function: clearError
        // Hides the error message area when input becomes valid
        // ==========================
        function clearError() {
            errorMessage.textContent = "";
            errorMessage.classList.add("hidden");
        }

        // ==========================
        // Event listener on the Convert button
        // Runs validation first — if it fails, nothing else happens
        // If validation passes, calls the conversion function and displays the result
        // A regular function is used here instead of an arrow function
        // so that if needed, "this" correctly refers to the button element
        // ==========================
        convertButton.addEventListener("click", function() {
            if (!validateInput()) {
                return;
            }

            const inputValue = temperatureInput.value;
            resultDisplay.textContent = convertTemperature(inputValue);
            resultDisplay.classList.remove("hidden");
        });

