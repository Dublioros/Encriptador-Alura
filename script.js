// Secure cookies
document.cookie = "encryptor_shown=1; Max-Age=2600000; Secure";

// Convert text to lowerCase
function toLowerCase(str) {
    return str.toLowerCase();
}

// Receive only letters and spaces
function verifyLetter(event) {
    if (event.key.match(/[a-z\s]/i) == null) {
        event.preventDefault();
    }
}

// Transform text (encrypt or decrypt)
function transformText(text, codifications) {
    let textTransformed = toLowerCase(text);
    for (const [origin, final] of codifications) {
        textTransformed = textTransformed.replace(new RegExp(origin, 'gi'), final);
    }
    return textTransformed;
}

// Show text result
function showResult(message, text) {
    document.getElementById("area-final").value = text;
    Swal.fire(({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
        background: '#15415F',
        color: 'white'
    }));
}

// Handle encryption or decryption
function handleTransformation(type) {
    const isEncrypt = type === 'encrypt';
    const textArea = document.getElementById(isEncrypt ? "area-origin" : "area-final");
    const text = textArea.value.toLowerCase();
    const loaderElement = document.querySelector('.loader');

    if (/^[a-z\s]*$/.test(text) && text.length > 0) {
        const codifications = isEncrypt ?
            [['e', 'enter'], ['i', 'imes'], ['a', 'ai'], ['o', 'ober'], ['u', 'ufar']] :
            [['enter', 'e'], ['imes', 'i'], ['ai', 'a'], ['ober', 'o'], ['ufar', 'u']];
        const transformedText = transformText(text, codifications);
        
        if (isEncrypt) {
            if (loaderElement) {
                loaderElement.classList.add('ready');
            }
            showResult("Encryption Successful", transformedText);
        } else {
            showResult("Decryption Successful", transformedText);
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            footer: 'Only letters from a to z and spaces are accepted',
            background: '#15415F',
            color: 'white'
        });
        if (loaderElement) {
            loaderElement.classList.remove('ready');
        }
    }    
}

// Function to encrypt text
function encrypt() {
    handleTransformation('encrypt');
}

// Function to decrypt text
function decrypt() {
    handleTransformation('decrypt');
}

// Function to copy text from the final area to the clipboard
function copyText() {
    const text = document.getElementById("area-final").value;

    if (text.length > 0) {
        navigator.clipboard.writeText(text).then(() => {
            Swal.fire({
                icon: "success",
                title: "Text copied to clipboard",
                showConfirmButton: false,
                timer: 1500,
                background: '#15415F',
                color: 'white'
            });
            document.querySelector('.loader').classList.add('ready');
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                footer: `Could not copy text: ${err}`
            });
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            footer: "No text to copy",
            background: '#15415F',
            color: 'white'
        });
    }
}

// Function to clear the text areas
function clearText() {
    document.getElementById("area-origin").value = "";
    document.getElementById("area-final").value = "";

    const loaderElement = document.querySelector('.loader');
    if (loaderElement) {
        loaderElement.classList.add('loader');
        loaderElement.classList.remove('ready');
    }
    Swal.fire({
        icon: "warning",
        title: "All has been cleared",
        showConfirmButton: false,
        timer: 1500,
        background: '#15415F',
        color: 'white'
    });
}

// Transition Function
document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("fade-in");
});

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const href = this.href;
        document.body.classList.add("fade-out");

        setTimeout(function () {
            window.location.href = href;
        }, 500);
    });
});
