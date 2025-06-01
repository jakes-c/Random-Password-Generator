// Character sets for password generation
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// DOM elements
const lengthInput = document.getElementById('length');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const passwordField = document.getElementById('passwordField');
const copyBtn = document.getElementById('copyBtn');
const strengthLevel = document.getElementById('strengthLevel');

// Generate password function
function generatePassword() {
    const length = parseInt(lengthInput.value);
    let charset = '';
    let password = '';
    
    // Build character set based on selected options
    if (uppercaseCheck.checked) charset += charSets.uppercase;
    if (lowercaseCheck.checked) charset += charSets.lowercase;
    if (numbersCheck.checked) charset += charSets.numbers;
    if (symbolsCheck.checked) charset += charSets.symbols;
    
    // Check if at least one character type is selected
    if (charset === '') {
        alert('Please select at least one character type!');
        return;
    }
    
    // Generate password
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    // Display password and update strength
    passwordField.value = password;
    updatePasswordStrength(password);
}

// Calculate password strength
function updatePasswordStrength(password) {
    let score = 0;
    let strengthText = '';
    let strengthClass = '';
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Character variety check
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 2;
    
    // Determine strength level
    if (score <= 3) {
        strengthText = 'Weak';
        strengthClass = 'strength-weak';
    } else if (score <= 6) {
        strengthText = 'Medium';
        strengthClass = 'strength-medium';
    } else {
        strengthText = 'Strong';
        strengthClass = 'strength-strong';
    }
    
    // Update UI
    strengthLevel.textContent = strengthText;
    strengthLevel.className = strengthClass;
}

// Copy password to clipboard
async function copyPassword() {
    if (passwordField.value === '') {
        alert('Please generate a password first!');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(passwordField.value);
        
        // Visual feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('copied');
        }, 1500);
        
    } catch (err) {
        // Fallback for older browsers
        passwordField.select();
        document.execCommand('copy');
        
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.classList.remove('copied');
        }, 1500);
    }
}

// Validate length input
function validateLength() {
    if (lengthInput.value < 4) {
        lengthInput.value = 4;
    } else if (lengthInput.value > 50) {
        lengthInput.value = 50;
    }
}

// Event listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);
lengthInput.addEventListener('input', validateLength);

// Generate initial password on page load
window.addEventListener('load', generatePassword);

// Allow Enter key to generate password
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        generatePassword();
    }
});