// Main JavaScript file for SmartFarm website

document.addEventListener("DOMContentLoaded", () => {
    // Initialize all interactive elements
    initializeNavigation()
    initializeForms()
    initializeSpecialists()
    initializeEducation()
    setupDarkModeToggle()
    initializeMarketplace()
    initializeUserIcon()
})

// Mobile-friendly navigation
function initializeNavigation() {
    const header = document.querySelector("header")

    // Create mobile menu toggle button
    const mobileMenuBtn = document.createElement("button")
    mobileMenuBtn.className = "mobile-menu-toggle"
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
    mobileMenuBtn.setAttribute("aria-label", "Toggle navigation menu")

    // Insert the button at the beginning of the header
    if (header) {
        header.insertBefore(mobileMenuBtn, header.firstChild)

        // Add event listener to toggle navigation
        mobileMenuBtn.addEventListener("click", function () {
            const nav = document.querySelector("nav")
            if (nav) {
                nav.classList.toggle("active")
                this.innerHTML = nav.classList.contains("active")
                    ? '<i class="fas fa-times"></i>'
                    : '<i class="fas fa-bars"></i>'
            }
        })

        // Add active class to current page link
        const currentPage = window.location.pathname.split("/").pop()
        const navLinks = document.querySelectorAll("nav a")

        navLinks.forEach((link) => {
            const linkPage = link.getAttribute("href")
            if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
                link.classList.add("active")
            }

            // Add smooth scroll for same-page links
            link.addEventListener("click", function (e) {
                if (this.getAttribute("href").startsWith("#")) {
                    e.preventDefault()
                    const targetId = this.getAttribute("href")
                    const targetElement = document.querySelector(targetId)
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: "smooth" })
                    }
                }
            })
        })
    }
}

// Initialize user icon functionality
function initializeUserIcon() {
    const userIcon = document.querySelector(".user-icon")
    if (userIcon) {
        // Make sure dropdown closes when clicking outside
        document.addEventListener("click", function(event) {
            if (!userIcon.contains(event.target)) {
                const dropdown = userIcon.querySelector(".user-dropdown")
                if (dropdown) {
                    dropdown.style.display = "none"
                }
            }
        })

        // Toggle dropdown on icon click
        userIcon.addEventListener("click", function(event) {
            event.stopPropagation()
            const dropdown = this.querySelector(".user-dropdown")
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === "block" ? "none" : "block"
            }
        })
    }
}

// Form validation and interactivity
function initializeForms() {
    // Contact form handling
    const contactForm = document.querySelector("#contact-form")
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault()

            // Simple validation
            let isValid = true
            const requiredFields = this.querySelectorAll("[required]")

            requiredFields.forEach((field) => {
                if (!field.value.trim()) {
                    isValid = false
                    field.classList.add("error")

                    // Create or update error message
                    let errorMsg = field.nextElementSibling
                    if (!errorMsg || !errorMsg.classList.contains("error-message")) {
                        errorMsg = document.createElement("div")
                        errorMsg.className = "error-message"
                        field.parentNode.insertBefore(errorMsg, field.nextSibling)
                    }
                    errorMsg.textContent = "This field is required"
                } else {
                    field.classList.remove("error")
                    const errorMsg = field.nextElementSibling
                    if (errorMsg && errorMsg.classList.contains("error-message")) {
                        errorMsg.remove()
                    }
                }
            })

            // Email validation for email fields
            const emailField = this.querySelector('[type="email"]')
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailPattern.test(emailField.value)) {
                    isValid = false
                    emailField.classList.add("error")

                    let errorMsg = emailField.nextElementSibling
                    if (!errorMsg || !errorMsg.classList.contains("error-message")) {
                        errorMsg = document.createElement("div")
                        errorMsg.className = "error-message"
                        emailField.parentNode.insertBefore(errorMsg, emailField.nextSibling)
                    }
                    errorMsg.textContent = "Please enter a valid email address"
                }
            }

            // If form is valid, show success message
            if (isValid) {
                // Create success message
                const successMsg = document.createElement("div")
                successMsg.className = "success-message"
                successMsg.textContent = "Your message has been sent successfully!"

                // Clear form
                this.reset()

                // Add success message after form
                this.parentNode.insertBefore(successMsg, this.nextSibling)

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.remove()
                }, 5000)
            }
        })

        // Add input event listeners to remove error styling when user types
        const formInputs = contactForm.querySelectorAll("input, textarea")
        formInputs.forEach((input) => {
            input.addEventListener("input", function () {
                this.classList.remove("error")
                const errorMsg = this.nextElementSibling
                if (errorMsg && errorMsg.classList.contains("error-message")) {
                    errorMsg.remove()
                }
            })
        })
    }

    // Login form validation
    const loginForm = document.querySelector("#login-form")
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault()

            // Simple validation
            let isValid = true
            const username = this.querySelector("#username")
            const password = this.querySelector("#password")

            if (!username.value.trim()) {
                isValid = false
                showError(username, "Username is required")
            }

            if (!password.value.trim()) {
                isValid = false
                showError(password, "Password is required")
            }

            if (isValid) {
                // Simulate login success
                showSuccess(this, "Login successful! Redirecting...")

                // Simulate redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = "index.html"
                }, 2000)
            }
        })
    }

    // Signup form validation
    const signupForm = document.querySelector("#signup-form")
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault()

            // Simple validation
            let isValid = true
            const username = this.querySelector("#new-username")
            const email = this.querySelector("#email")
            const password = this.querySelector("#new-password")
            const confirmPassword = this.querySelector("#confirm-password")

            if (!username.value.trim()) {
                isValid = false
                showError(username, "Username is required")
            }

            if (!email.value.trim()) {
                isValid = false
                showError(email, "Email is required")
            } else {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailPattern.test(email.value)) {
                    isValid = false
                    showError(email, "Please enter a valid email address")
                }
            }

            if (!password.value.trim()) {
                isValid = false
                showError(password, "Password is required")
            }

            if (!confirmPassword.value.trim()) {
                isValid = false
                showError(confirmPassword, "Please confirm your password")
            } else if (password.value !== confirmPassword.value) {
                isValid = false
                showError(confirmPassword, "Passwords do not match")
            }

            if (isValid) {
                // Simulate signup success
                showSuccess(this, "Account created successfully! Redirecting...")

                // Simulate redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = "index.html"
                }, 2000)
            }
        })
    }

    // Helper functions for form validation
    function showError(input, message) {
        input.classList.add("error")

        let errorMsg = input.nextElementSibling
        if (!errorMsg || !errorMsg.classList.contains("error-message")) {
            errorMsg = document.createElement("div")
            errorMsg.className = "error-message"
            input.parentNode.insertBefore(errorMsg, input.nextSibling)
        }
        errorMsg.textContent = message
    }

    function showSuccess(form, message) {
        // Create success message
        const successMsg = document.createElement("div")
        successMsg.className = "success-message"
        successMsg.textContent = message

        // Clear form
        form.reset()

        // Add success message after form
        form.parentNode.insertBefore(successMsg, form.nextSibling)
    }

    // Add input event listeners to remove error styling when user types
    const allForms = document.querySelectorAll("form")
    allForms.forEach(form => {
        const inputs = form.querySelectorAll("input, textarea")
        inputs.forEach((input) => {
            input.addEventListener("input", function () {
                this.classList.remove("error")
                const errorMsg = this.nextElementSibling
                if (errorMsg && errorMsg.classList.contains("error-message")) {
                    errorMsg.remove()
                }
            })
        })
    })
}

// Specialists page interactivity
function initializeSpecialists() {
    const specialists = document.querySelectorAll(".specialist")

    if (specialists.length > 0) {
        // Add expand/collapse functionality to specialists
        specialists.forEach((specialist) => {
            // Add a "Read more" button
            const readMoreBtn = document.createElement("button")
            readMoreBtn.className = "read-more-btn"
            readMoreBtn.textContent = "Read more"

            // Get the specialist description
            const description = specialist.querySelector("p:last-child")
            if (description) {
                // Store the full text
                const fullText = description.textContent

                // Truncate the text if it's longer than 100 characters
                if (fullText.length > 100) {
                    const truncatedText = fullText.substring(0, 100) + "..."
                    description.textContent = truncatedText
                    description.dataset.fullText = fullText
                    description.dataset.truncatedText = truncatedText
                    description.dataset.expanded = "false"

                    // Add the button after the description
                    specialist.appendChild(readMoreBtn)

                    // Add click event to toggle text
                    readMoreBtn.addEventListener("click", function () {
                        const isExpanded = description.dataset.expanded === "true"

                        if (isExpanded) {
                            description.textContent = description.dataset.truncatedText
                            description.dataset.expanded = "false"
                            this.textContent = "Read more"
                        } else {
                            description.textContent = description.dataset.fullText
                            description.dataset.expanded = "true"
                            this.textContent = "Read less"
                        }
                    })
                }
            }

            // Add hover effect
            specialist.addEventListener("mouseenter", function () {
                this.classList.add("hover")
            })

            specialist.addEventListener("mouseleave", function () {
                this.classList.remove("hover")
            })
        })
    }
}

// Education page interactivity
function initializeEducation() {
    const educationLinks = document.querySelectorAll(".content ul li a")

    if (educationLinks.length > 0) {
        // Create a container for resource previews
        const previewContainer = document.createElement("div")
        previewContainer.className = "resource-preview"
        previewContainer.innerHTML =
            '<h3>Resource Preview</h3><div class="preview-content">Click on a resource to see a preview</div>'

        // Add the container after the resource list
        const resourceList = educationLinks[0].closest("ul")
        if (resourceList) {
            resourceList.parentNode.insertBefore(previewContainer, resourceList.nextSibling)
        }

        // Add click event to show resource preview
        educationLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault()

                const resourceTitle = this.textContent
                const previewContent = previewContainer.querySelector(".preview-content")

                // Generate preview content based on resource title
                let previewHTML = `<h4>${resourceTitle}</h4>`

                switch (resourceTitle) {
                    case "Introduction to Smart Farming":
                        previewHTML += `
                            <p>This comprehensive guide introduces the concept of smart farming and how it's revolutionizing agriculture worldwide.</p>
                            <ul>
                                <li>History of agricultural technology</li>
                                <li>Key components of smart farming systems</li>
                                <li>Benefits and challenges</li>
                                <li>Getting started with smart farming</li>
                            </ul>
                        `
                        break
                    case "Sustainable Agricultural Practices":
                        previewHTML += `
                            <p>Learn how to implement sustainable practices that benefit both your farm and the environment.</p>
                            <ul>
                                <li>Soil conservation techniques</li>
                                <li>Water management strategies</li>
                                <li>Integrated pest management</li>
                                <li>Renewable energy in farming</li>
                            </ul>
                        `
                        break
                    case "Technology in Modern Farming":
                        previewHTML += `
                            <p>Explore the latest technological innovations transforming the agricultural industry.</p>
                            <ul>
                                <li>IoT sensors and monitoring systems</li>
                                <li>Drone technology for field mapping</li>
                                <li>AI and machine learning applications</li>
                                <li>Robotics and automation</li>
                            </ul>
                        `
                        break
                    case "Crop Management Techniques":
                        previewHTML += `
                            <p>Master advanced techniques for optimizing crop yields and quality.</p>
                            <ul>
                                <li>Precision planting methods</li>
                                <li>Nutrient management strategies</li>
                                <li>Disease prevention and control</li>
                                <li>Harvest optimization</li>
                            </ul>
                        `
                        break
                    default:
                        previewHTML += "<p>Preview not available for this resource.</p>"
                }

                // Add a button to access the full resource
                previewHTML += '<button class="access-resource-btn">Access Full Resource</button>'

                // Update the preview content
                previewContent.innerHTML = previewHTML

                // Add click event to the access button
                const accessBtn = previewContent.querySelector(".access-resource-btn")
                if (accessBtn) {
                    accessBtn.addEventListener("click", () => {
                        alert("This feature would redirect to the full resource in a real application.")
                    })
                }

                // Highlight the selected resource
                educationLinks.forEach((l) => l.classList.remove("selected"))
                this.classList.add("selected")
            })
        })
    }
}

// Marketplace page functionality
function initializeMarketplace() {
    const tabBtns = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove("active"))
                tabContents.forEach(c => c.classList.remove("active"))

                // Add active class to clicked button
                this.classList.add("active")

                // Show corresponding content
                const tabId = this.getAttribute("data-tab")
                document.getElementById(`${tabId}-content`).classList.add("active")
            })
        })
    }

    // Handle loan application buttons
    const applyBtns = document.querySelectorAll(".apply-btn")
    if (applyBtns.length > 0) {
        applyBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                const loanType = this.closest(".loan-card").querySelector("h4").textContent
                alert(`You are applying for: ${loanType}\nThis would open a loan application form in a real application.`)
            })
        })
    }

    // Handle contact seller buttons
    const contactBtns = document.querySelectorAll(".contact-btn")
    if (contactBtns.length > 0) {
        contactBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                const produceName = this.closest(".produce-card").querySelector("h4").textContent
                const farmerName = this.closest(".produce-card").querySelector(".farmer-name").textContent
                alert(`You are contacting ${farmerName} about: ${produceName}\nThis would open a contact form in a real application.`)
            })
        })
    }

    // Handle list produce button
    const listProduceBtn = document.querySelector(".list-produce-btn")
    if (listProduceBtn) {
        listProduceBtn.addEventListener("click", function() {
            alert("This would open a form to list your produce in a real application.")
        })
    }
}

// Dark mode toggle
function setupDarkModeToggle() {
    // Create dark mode toggle button
    const darkModeBtn = document.createElement("button")
    darkModeBtn.className = "dark-mode-toggle"
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>'
    darkModeBtn.setAttribute("aria-label", "Toggle dark mode")

    // Add the button to the footer
    const footer = document.querySelector("footer")
    if (footer) {
        footer.appendChild(darkModeBtn)

        // Check for saved preference
        const isDarkMode = localStorage.getItem("darkMode") === "true"
        if (isDarkMode) {
            document.body.classList.add("dark-mode")
            darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>'
        }

        // Add click event to toggle dark mode
        darkModeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode")
            const isDark = document.body.classList.contains("dark-mode")

            // Update button icon
            this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'

            // Save preference
            localStorage.setItem("darkMode", isDark)
        })
    }
}

// Add animation to feature items on scroll
window.addEventListener("scroll", () => {
    const featureItems = document.querySelectorAll(".feature-item")

    featureItems.forEach((item) => {
        const position = item.getBoundingClientRect()

        // If element is in viewport
        if (position.top >= 0 && position.bottom <= window.innerHeight) {
            item.classList.add("animate")
        }
    })
})

// Additional JavaScript for specialists and education pages

// Initialize specialists page functionality
function initializeSpecialistsPage() {
    const consultationBtn = document.querySelector('.consultation-btn');
    if (consultationBtn) {
        consultationBtn.addEventListener('click', function() {
            alert('This would open a consultation booking form in a real application.');
        });
    }
}

// Initialize education page functionality
function initializeEducationPage() {
    const resourceLinks = document.querySelectorAll('.resource-list a');
    const previewContent = document.querySelector('.preview-content');

    if (resourceLinks.length > 0 && previewContent) {
        resourceLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                // Remove selected class from all links
                resourceLinks.forEach(l => l.classList.remove('selected'));

                // Add selected class to clicked link
                this.classList.add('selected');

                // Get resource type from data attribute
                const resourceType = this.getAttribute('data-resource');
                const resourceTitle = this.textContent;

                // Generate preview content based on resource type
                let previewHTML = `<h4>${resourceTitle}</h4>`;

                switch(resourceType) {
                    case 'crop-rotation':
                        previewHTML += `
                            <p>Effective crop rotation is essential for maintaining soil health and preventing pest buildup.</p>
                            <ul>
                                <li>Benefits of crop rotation</li>
                                <li>Planning a 3-year rotation cycle</li>
                                <li>Companion planting strategies</li>
                                <li>Case studies of successful rotations</li>
                            </ul>
                        `;
                        break;
                    case 'pest-management':
                        previewHTML += `
                            <p>Learn how to manage pests effectively while minimizing chemical use.</p>
                            <ul>
                                <li>Identifying common crop pests</li>
                                <li>Biological control methods</li>
                                <li>Preventive measures</li>
                                <li>When to use chemical controls</li>
                            </ul>
                        `;
                        break;
                    case 'precision-farming':
                        previewHTML += `
                            <p>Precision farming uses technology to optimize inputs and maximize yields.</p>
                            <ul>
                                <li>GPS-guided equipment</li>
                                <li>Variable rate application</li>
                                <li>Soil mapping techniques</li>
                                <li>Cost-benefit analysis</li>
                            </ul>
                        `;
                        break;
                    case 'business-planning':
                        previewHTML += `
                            <p>A solid business plan is the foundation of a successful farm operation.</p>
                            <ul>
                                <li>Creating a farm business plan</li>
                                <li>Setting realistic goals</li>
                                <li>Financial projections</li>
                                <li>Securing financing</li>
                            </ul>
                        `;
                        break;
                    default:
                        previewHTML += `
                            <p>This resource covers important information about ${resourceTitle.toLowerCase()}.</p>
                            <p>Click the button below to access the full content.</p>
                        `;
                }

                // Add access button
                previewHTML += '<button class="access-resource-btn">Access Full Resource</button>';

                // Update preview content
                previewContent.innerHTML = previewHTML;

                // Add click event to access button
                const accessBtn = previewContent.querySelector('.access-resource-btn');
                if (accessBtn) {
                    accessBtn.addEventListener('click', function() {
                        alert(`This would provide access to the full ${resourceTitle} resource in a real application.`);
                    });
                }
            });
        });
    }

    // Handle registration buttons
    const registerBtns = document.querySelectorAll('.register-btn');
    if (registerBtns.length > 0) {
        registerBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const programTitle = this.closest('.program-card').querySelector('h4').textContent;
                alert(`You are registering for: ${programTitle}\nThis would open a registration form in a real application.`);
            });
        });
    }
}

// Add these functions to the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
    // Existing initializations
    initializeNavigation();
    initializeForms();
    initializeSpecialists();
    initializeEducation();
    setupDarkModeToggle();
    initializeMarketplace();
    initializeUserIcon();

    // New initializations
    initializeSpecialistsPage();
    initializeEducationPage();
});