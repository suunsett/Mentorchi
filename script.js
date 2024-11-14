document.addEventListener('DOMContentLoaded', () => {
    const signupButton = document.querySelector('.btn-signup');
    if (signupButton) {
        signupButton.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    const loginButton = document.querySelector('.btn-login');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }
    const buttons = document.querySelectorAll('.nav .buttons .btn');//disable all buttns except quiz button 
    const quizButton = document.getElementById('quiz_button');
    buttons.forEach(button => {
        if (button != quizButton)
            button.disabled = true; 
    })
    if (quizButton) {
        quizButton.addEventListener('click', () => {
            window.location.href = 'quiz.html'; // Navigate to the quiz page
        });
    }
    let { setSection } = (() => {
        let selectedSection = 'roadmap';
    
        function setSection(section) {
            selectedSection = section;
            onSectionChanged();
        }
    
        function onSectionChanged() {
            document.querySelectorAll('.container2 > div').forEach(div => {
                div.classList.add('hide');
                div.classList.remove('show');
            });
    
            const selectedElement = document.querySelector(`#${selectedSection}`);
            selectedElement.classList.add('show');
            selectedElement.classList.remove('hide');
        }
    
        // Initialize with default section
        onSectionChanged();
    
        return { setSection};
    })();
    
    // Expose setSection to the global scope
    window.setSection = setSection;
    
    const loginButtonInLoginPage = document.querySelector('#login_button');
    if (loginButtonInLoginPage) {
        loginButtonInLoginPage.addEventListener('click', async (event) => {
            event.preventDefault();

            const email = document.querySelector('#email_login').value;
            const password = document.querySelector('#password_login').value;
            const url = "http://localhost:5505/api/users/login"; 

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Login successful:", data);
                    alert("Login successful!");
                    window.location.href = 'homepage.html';
                } else {
                    console.error("Login error:", data);
                    alert(data.message || "Invalid email or password.");
                }
            } catch (error) {
                console.error('Error:', error.message);
                alert("Failed to connect to the server.");
            }
        });
    }

    const signupButtonInSignupPage = document.querySelector('#signup_button');
    if (signupButtonInSignupPage) {
    signupButtonInSignupPage.addEventListener('click', async (event) => {
        event.preventDefault();
        
        const email = document.querySelector('#email_signup').value;
        const name = document.querySelector('#name_signup').value;
        const password = document.querySelector('#password_signup').value;

        if (!email || !name || !password) {
            alert("All fields are required!");
            return;
        }

        const url = "http://localhost:5505/api/users/register";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, name, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Signup successful:", data);
                alert("Account created successfully!");
                window.location.href = 'login.html';
            } else {
                console.error("Signup error:", data);
                alert(data.message || "An error occurred during signup.");
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert("Failed to connect to the server.");
        }
    });
}
});



