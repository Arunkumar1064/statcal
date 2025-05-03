/**
 * Agricultural Calculator - Common JavaScript functions
 * 
 * This file contains shared utilities and functions used across different calculator pages
 */

// Currency handling system
const CurrencyHandler = {
    symbols: {
        'USD': '$',
        'INR': '₹',
        'EUR': '€'
    },
    
    // Update all currency symbols on the page
    updateSymbols: function(currencyType) {
        const symbol = this.symbols[currencyType] || '$';
        document.querySelectorAll('.currency-symbol').forEach(el => {
            el.textContent = symbol;
        });
    },
    
    // Initialize currency handling
    init: function() {
        // Check if the currency selector exists on this page
        const currencySelector = document.getElementById('currencyType');
        if (currencySelector) {
            // Initial currency update
            this.updateSymbols(currencySelector.value);
            
            // Update when currency changes
            currencySelector.addEventListener('change', function() {
                CurrencyHandler.updateSymbols(this.value);
            });
        }
    }
};

// Unit conversion utilities
const UnitConverter = {
    // Area conversions
    areaConversions: {
        'm2': 1, // base unit (square meters)
        'ha': 10000,
        'acre': 4046.86,
        'ft2': 0.092903
    },
    
    // Volume conversions
    volumeConversions: {
        'm3': 1, // base unit (cubic meters)
        'l': 0.001,
        'ft3': 0.0283168,
        'gal': 0.00378541
    },
    
    // Weight conversions
    weightConversions: {
        'kg': 1, // base unit (kilograms)
        'g': 0.001,
        'lb': 0.453592,
        't': 1000 // metric ton
    },
    
    // Length conversions
    lengthConversions: {
        'm': 1, // base unit (meters)
        'cm': 0.01,
        'mm': 0.001,
        'ft': 0.3048,
        'in': 0.0254
    },
    
    // Convert area between units
    convertArea: function(value, fromUnit, toUnit) {
        // Convert to base unit (m²) first
        const valueInBaseUnit = value * this.areaConversions[fromUnit];
        // Then convert to target unit
        return valueInBaseUnit / this.areaConversions[toUnit];
    },
    
    // Convert volume between units
    convertVolume: function(value, fromUnit, toUnit) {
        // Convert to base unit (m³) first
        const valueInBaseUnit = value * this.volumeConversions[fromUnit];
        // Then convert to target unit
        return valueInBaseUnit / this.volumeConversions[toUnit];
    },
    
    // Convert weight between units
    convertWeight: function(value, fromUnit, toUnit) {
        // Convert to base unit (kg) first
        const valueInBaseUnit = value * this.weightConversions[fromUnit];
        // Then convert to target unit
        return valueInBaseUnit / this.weightConversions[toUnit];
    },
    
    // Convert length between units
    convertLength: function(value, fromUnit, toUnit) {
        // Convert to base unit (m) first
        const valueInBaseUnit = value * this.lengthConversions[fromUnit];
        // Then convert to target unit
        return valueInBaseUnit / this.lengthConversions[toUnit];
    }
};

// Form validation utilities
const FormValidator = {
    // Check if a number input is valid
    isValidNumber: function(value, min = null, max = null) {
        const num = parseFloat(value);
        
        // Check if it's a number
        if (isNaN(num)) {
            return false;
        }
        
        // Check min constraint if provided
        if (min !== null && num < min) {
            return false;
        }
        
        // Check max constraint if provided
        if (max !== null && num > max) {
            return false;
        }
        
        return true;
    },
    
    // Validate and get a number from an input element
    getNumberInput: function(elementId, min = null, max = null) {
        const element = document.getElementById(elementId);
        const value = element.value;
        
        if (!this.isValidNumber(value, min, max)) {
            // Add invalid class to highlight error
            element.classList.add('is-invalid');
            return null;
        }
        
        // Clear any previous validation styling
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
        
        return parseFloat(value);
    },
    
    // Display error message
    showError: function(message) {
        alert(message);
        return false;
    }
};

// Math and calculation utilities
const AgriMath = {
    // Calculate area of a rectangle
    rectangleArea: function(length, width) {
        return length * width;
    },
    
    // Calculate area of a triangle
    triangleArea: function(base, height) {
        return (base * height) / 2;
    },
    
    // Calculate area of a circle
    circleArea: function(radius) {
        return Math.PI * Math.pow(radius, 2);
    },
    
    // Calculate area of an irregular polygon using Shoelace formula
    polygonArea: function(xCoords, yCoords) {
        let area = 0;
        const numPoints = xCoords.length;
        
        for (let i = 0; i < numPoints; i++) {
            const j = (i + 1) % numPoints;
            area += xCoords[i] * yCoords[j];
            area -= yCoords[i] * xCoords[j];
        }
        
        return Math.abs(area) / 2;
    },
    
    // Calculate volume of a rectangular container
    rectangularVolume: function(length, width, height) {
        return length * width * height;
    },
    
    // Calculate volume of a circular container
    circularVolume: function(diameter, height) {
        const radius = diameter / 2;
        return Math.PI * Math.pow(radius, 2) * height;
    },
    
    // Calculate slope percentage from rise and run
    calculateSlope: function(rise, run) {
        return (rise / run) * 100;
    },
    
    // Convert between slope percentage and angle in degrees
    slopePercentToDegrees: function(slopePercent) {
        return Math.atan(slopePercent / 100) * (180 / Math.PI);
    },
    
    slopeDegreesToPercent: function(degrees) {
        return Math.tan(degrees * Math.PI / 180) * 100;
    }
};

// Utility for handling UI toggling
function toggleElementVisibility(elementId, shouldShow) {
    const element = document.getElementById(elementId);
    if (shouldShow) {
        element.classList.remove('d-none');
    } else {
        element.classList.add('d-none');
    }
}

// Format number with thousand separators and fixed decimal places
function formatNumber(number, decimals = 2) {
    return number.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

// Set up calculation result display
function displayCalculationResult(resultContainerId, shouldShow = true) {
    toggleElementVisibility(resultContainerId, shouldShow);
    if (shouldShow) {
        // Scroll to result
        document.getElementById(resultContainerId).scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
}

// Reset form validation styling
function resetFormValidation(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('.form-control, .form-select');
    
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
    });
}

// Initialize tooltips and features
document.addEventListener('DOMContentLoaded', function() {
    // Enable Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize currency handler
    CurrencyHandler.init();
});
