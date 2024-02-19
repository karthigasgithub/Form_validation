document.getElementById('name').addEventListener('input', function () {
    var nameInput = this.value;
    var isValid = /^[A-Za-z\s]+$/.test(nameInput);
    const namesverify = document.querySelector('.namesverify');

    if (!isValid) {
        this.style.border = "6px solid red";
        namesverify.textContent = "Special characters and numbers are not allowed";
    } else {
        this.style.border = ""; 
        namesverify.textContent = "";
    }
});

document.getElementById('email').addEventListener('input',function() {
    var emailInput= this.value;
    var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
    const emailverify = document.querySelector('.emailverify');

    if (!isValid) {
        this.style.border = "6px solid red";
        emailverify.textContent = "Enter email in proper format";
    } else {
        this.style.border = "";
        emailverify.textContent = "";
    }
});

document.getElementById('contact').addEventListener('input',function() {
    var contactInput= this.value;
    var isValid =/^[6-9]\d{9}$/.test(contactInput);
    const contactverify = document.querySelector('.contactverify');

    if (!isValid) {
        this.style.border = "6px solid red";
        contactverify.textContent = "Enter contact number in proper format";
    } else {
        this.style.border = "";
        contactverify.textContent = "";
    }
});

document.getElementById('dob').addEventListener('input',function() {
    var dobInput= document.getElementById('dob').value;
    var dobDate = new Date(dobInput);
    var isValid= dobDate.getFullYear() >= 1950 && dobDate.getFullYear() <= 2010;
    const dobverify = document.querySelector('.dobverify');
    if (!isValid) {
        this.style.border = "6px solid red";
        dobverify.textContent = "Birth year must be between 1950 and 2010";
    } else {
        this.style.border = "";
        dobverify.textContent = "";
    }
});

const usernameInput2 = document.getElementById("username");
usernameInput2.addEventListener("blur", checkUsername);
function checkUsername() {
  const username = usernameInput2.value.trim();
  if (localStorage.getItem(username)) {
    alert("Username already exists! Please choose another one.");
    usernameInput2.value = "";
  }
}

var passwordInput = document.getElementById('password');
function togglePasswordVisibility() { 
    var showPasswordCheckbox = document.getElementById('showPassword');

    // Toggle password visibility
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
}

document.getElementById('password').addEventListener('input', function () {
    const passwordInput = this.value;
    const strongPasswordVerify = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(passwordInput);
    const passwordValid = document.querySelector('.password');

    if (!strongPasswordVerify) {
        this.style.border = "6px solid red";
        passwordValid.textContent = "Enter a strong password with at least one letter, one number, and one special character, and a minimum length of 8 characters";
    } else {
        this.style.border = "";
        passwordValid.textContent = "";
    }
});


document.getElementById('pan').addEventListener('input',function() {
    var panInput= this.value;
    var isValid =/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panInput);
    const panverify = document.querySelector('.panverify');

    if (!isValid) {
        this.style.border = "6px solid red";
        panverify.textContent = "Enter PAN number in proper format";
    } else {
        this.style.border = "";
        panverify.textContent = "";
    }
});

let binaryimage = null;
var fileInput = document.getElementById('profilephoto');
var fileSizeValid = document.querySelector('.profilephoto');

let imageData = null;
fileInput.addEventListener('change', function () {
    if (fileInput.files.length > 0) {
        var fileSizeInBytes = fileInput.files[0].size;
        var maxSizeInBytes = 2 * 1024 * 1024; // 2MB

        if (fileSizeInBytes > maxSizeInBytes) {
            fileSizeValid.textContent = 'File size exceeds 2MB. Please choose a smaller file.';
        } else {
            fileSizeValid.textContent = '';
            
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = function (event) {
              imageData={ 
                size:file.size,
                type:file.type,
                binaryimage: event.target.result
            };            
            };
        }
    }
});

function validateForm() {
                var form = document.getElementById('form');
                var fields = form.querySelectorAll('input[required], select[required], textarea[required]');
                var validationMessage = document.getElementById('validationMessage');
    
                var allFieldsFilled = true;
    
                fields.forEach(function (field) {
                    if (field.value.trim() === '') {
                        allFieldsFilled = false;
                    }
                });
    
                if (allFieldsFilled) {
                    validationMessage.textContent = '';
                    storeFormData();
                } else {
                    validationMessage.textContent = 'Please fill in all required fields.';
                }
            }
function storeFormData() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contact = document.getElementById('contact').value;
    var dob = document.getElementById('dob').value;
    var gender = document.getElementById('gender').value;
    var education = document.getElementById('education').value;
    var occupation = document.getElementById('occupation').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var pan = document.getElementById('pan').value;

    var userData = {
        name,
        email,
        contact,
        dob,
        gender,
        education,
        occupation,
        username,
        password,
        pan,
        imageData,
    };
    localStorage.setItem(username, JSON.stringify(userData));
    alert('Form data has been stored in local storage!');
    window.location.href = 'form.html';
}

function performSearch() {
    const searchValue = document.getElementById("search-input").value.trim();
    const matchingKeys = [];

    // Check if the search value is a valid size input
    const sizeRegex = /^(\d+(\.\d+)?)\s*(kb|mb|gb|bytes)$/i;
    const sizeMatch = searchValue.match(sizeRegex);

    // Check if the search value is a valid number of alive days with or without units
    const aliveDaysRegex = /^(\d+|\d+\s*days)$/i;
    const isAliveDays = aliveDaysRegex.test(searchValue);

    // Extract all values from localStorage
    const userDataArray = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));

    // Filter the userDataArray based on search criteria
    const filteredUserData = userDataArray.filter(userData => {
        // Define your search criteria and apply them
        const nameMatches = userData.name.toLowerCase().includes(searchValue.toLowerCase());
        const imageSizeMatches = userData.imageData && sizeMatch && isSizeWithinLimit(userData.imageData.size, sizeMatch[1], sizeMatch[3].toLowerCase());
        const aliveDaysMatches = isAliveDays && isAliveDaysWithinLimit(userData.dob, searchValue);

        // Return true if any of the criteria match
        return nameMatches || imageSizeMatches || aliveDaysMatches;
    });

    if (filteredUserData.length === 0) {
        alert("User not found");
    } else {
        displayUserDetails(filteredUserData);
    }
}


// Helper function to check if the number of alive days is within the specified limit
function isAliveDaysWithinLimit(dob, searchValue) {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    const millisecondsInDay = 24 * 60 * 60 * 1000;

    const aliveDays = Math.floor((currentDate - birthDate) / millisecondsInDay);

    // Extract the number part from the search value
    const numberRegex = /^(\d+|\d+\s*days)$/i;
    const numberMatch = searchValue.match(numberRegex);
    const searchNumber = numberMatch ? parseInt(numberMatch[1], 10) : null;

    return searchNumber !== null && aliveDays <= searchNumber;
}

// Helper function to check if image size is within the specified limit
function isSizeWithinLimit(actualSize, userSize, unit) {
    const sizeInBytes = convertSizeToBytes(userSize, unit);
    return actualSize <= sizeInBytes;
}

// Helper function to convert size to bytes
function convertSizeToBytes(size, unit) {
    switch (unit.toLowerCase()) {
        case 'kb':
            return size * 1024;
        case 'mb':
            return size * 1024 * 1024;
        case 'gb':
            return size * 1024 * 1024 * 1024;
        case 'bytes':
            return size;
        default:
            return size;
    }
}

function displayUserDetails(userDataArray) {
    var formElement = document.getElementById('form');
    formElement.style.display = 'none'; 
    
    const formDetailsContainer = document.getElementById("formDetails");
    formDetailsContainer.innerHTML = "";

    userDataArray.forEach((userData, index) => {
        const userContainer = document.createElement("div");
        userContainer.classList.add("user-container");

        const details = [
            `Name: ${userData.name}`,
            `Email: ${userData.email}`,
            `Contact Number: ${userData.contact}`,
            `DOB: ${userData.dob}`,
            `Gender: ${userData.gender}`,
            `Education: ${userData.education}`,
            `Occupation: ${userData.occupation}`,
            `Username: ${userData.username}`,
            `Password: ${userData.password}`,
            `PAN Number: ${userData.pan}`
        ];

        const imgElement = document.createElement("img");
        imgElement.src = userData.imageData.binaryimage;
        imgElement.alt = "Profile Photo";
        imgElement.width = 100;
        imgElement.height = 100;
        userContainer.appendChild(imgElement);

        details.forEach(detail => {
            const detailElement = document.createElement("p");
            detailElement.textContent = detail;
            userContainer.appendChild(detailElement);
        });

        if (index < userDataArray.length - 1) {
            userContainer.style.borderBottom = "1px solid #ccc";
        }

        formDetailsContainer.appendChild(userContainer);
    });
}
