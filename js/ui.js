// Звездочки рейтинга
let ratingStars = document.querySelectorAll('.userReview .rating_star');
ratingStars.forEach(item => {
    item.addEventListener('click', () => {
        item.parentNode.dataset.totalValue = item.dataset.itemValue;
        ratingValue = item.parentNode.dataset.totalValue;
    })
})

function formatPhoneNumber() {
    let phoneNumber = document.querySelector('.signup_phone').value;
    phoneNumber = phoneNumber.replace(/\D/g, ""); 
    phoneNumber = phoneNumber.slice(0, 10);
  
    const areaCode = phoneNumber.slice(0, 3);
    const firstPart = phoneNumber.slice(3, 6);
    const secondPart = phoneNumber.slice(6, 10);
  
    if(areaCode.length > 0 && firstPart > 0 && secondPart > 0) {
        phoneNumber = `${areaCode}-${firstPart}-${secondPart}`;
    } 
  
    document.querySelector('.signup_phone').value = phoneNumber;
  }

class DropdownMenu {
    constructor (menuName, targetObj, targetProp, sectionsArr) {
        this.menuName = menuName;
        this.targetObj = targetObj;
        this.targetProp = targetProp;
        this.sectionsArr = sectionsArr;
    }

    renderSection(section) {
        let sectionTemplate = `
        <div class="dropdown_item">${section}</div>
        `
        return sectionTemplate;
    }

    fillMenuWithSections(menuName, sectionsArr) {
        let dropdownSections = document.querySelector(`.${menuName} .dropdown_sections`);
        let emptyMenu = '';
        sectionsArr.forEach(section => {
            emptyMenu += this.renderSection(section);
            return emptyMenu;
        })
        dropdownSections.innerHTML = emptyMenu;
    }

    isMenuOpened (menuName) {
        let dropdownSections = document.querySelector(`.${menuName} .dropdown_sections`);
        let dropdownCaret = document.querySelector(`.${menuName} .dropdown-caret`);

        if (dropdownSections.classList.contains('disabled')) {
            dropdownSections.classList.remove('disabled');
            dropdownCaret.style.transform = 'rotate(180deg)';
        } else {
            dropdownSections.classList.add('disabled');
            dropdownCaret.style.transform = null;
        }
    }

    chooseSection(menuName) {
        let dropdownOpener = document.querySelector(`.${menuName} .dropdown_input`);
        let sectionsCollection = document.querySelectorAll(`.${menuName} .dropdown_item`);
        let dropdownValue = dropdownOpener.children[0];
        let choosenSection;

        if(this.targetProp != undefined && this.targetObj != undefined) {
            sectionsCollection.forEach(section => {
                section.addEventListener('click', () => {
                    dropdownValue.innerText = section.innerText;
                    dropdownValue.style.color = '#000';
                    choosenSection = dropdownValue.innerText;
                    this.targetObj[this.targetProp] = section.innerText;
                    this.isMenuOpened(menuName);
                })
            })

            return choosenSection;
        } else {
            sectionsCollection.forEach(section => {
                section.addEventListener('click', () => {
                    dropdownValue.innerText = section.innerText;
                    dropdownValue.style.color = '#000';
                    choosenSection = dropdownValue.innerText;
                    this.isMenuOpened(menuName);
                })
            })
        }
    }

    menuEventListeners(menuName) {
        let dropdownOpener = document.querySelector(`.${menuName} .dropdown_input`);
        dropdownOpener.addEventListener('click', () => this.isMenuOpened(menuName));
        // window.addEventListener('click', () => this.isMenuOpened(menuName));
        this.chooseSection(menuName);
        
    }

    refreshDropdownValue(menuName) {
        let dropdownOpener = document.querySelector(`.${menuName} .dropdown_input`),
        dropdownValue = dropdownOpener.children[0];

        if(this.targetProp != undefined && this.targetObj != undefined) {
            if (this.targetObj[this.targetProp] != '') {
                dropdownValue.innerHTML = this.targetObj[this.targetProp];
                dropdownValue.style.color = "#000";
            }
        }
    }

    init () {
        this.fillMenuWithSections(this.menuName, this.sectionsArr);
        this.refreshDropdownValue(this.menuName);
        this.menuEventListeners(this.menuName);
    }
}

// Cчётчик символов

class SymbolCounter {
    constructor(parent, countingInput, limit) {
        this.parent = parent;
        this.countingInput = countingInput;
        this.limit = limit;
    }

    render() {
        return `
        <div class="symbolCounter">
            <span class="symbolCounter_countedSymbols">${this.countingInput.value.length}</span>/<span>${this.limit}</span>
        </div>
        `
    }

    countSymbols() {
        let countedSymbolsBlock = document.querySelector('.symbolCounter_countedSymbols');
        this.countingInput.addEventListener('input', () => {
            
            if (this.countingInput.value.length <= this.limit) {
                if(this.countingInput.value.length == this.limit) {
                    countedSymbolsBlock.style.color = "red";
                } else {
                    countedSymbolsBlock.style.color = "#000";
                }
                countedSymbolsBlock.innerHTML = this.countingInput.value.length;
            }
        })
    }

    init() {
        if(this.parent) {
            this.parent.insertAdjacentHTML('beforeend', this.render());
            this.countSymbols();
        }  
    }
}

// Всплывающее окошко

const popupTemplates = {
    popupSignIn: `
    <div class="userSignWrapper">
        <form action="php/signin.php" method="post">
            <div class="signPart">
                <h1>Вход</h1>
                <div class="sign_main signinPartNoScroll">
                    <div class="sign_inputs">
                        <div class="signPopUpField"><input class="input_default signin_login" type="text" name="login" placeholder="Логин"></div>
                        <div class="signPopUpField">
                            <input class="input_default signin_password" type="password" name="pass" placeholder="Пароль">
                            <span class="showHidePassword js-passwordButton-signinPassword"><i class="fa-solid fa-eye"></i></span>
                        </div>
                    </div>
                    <div class="sign_additional" style="display: none;">
                        <div class="sign_additional-rememberme">
                            <div class="checkbox_default">
                                <input type="checkbox">
                                <div class="checkbox_background"></div>
                            </div>
                            <span>Запомнить меня</span>
                        </div>
                        <div class="sign_additional-forgotpass"><a>Забыли пароль?</a></div>
                    </div>
                    <button type="submit" class="button_default sign_button signInButton">Войти</button>
                </div>
                <div class="sign_or">
                    <div class="separator_line"></div>
                    <span>Или</span>
                    <div class="separator_line"></div>
                </div>
                <div class="sign_another">
                    <div id="popupSignUp-btn" class="button_default">Зарегистрироваться</div>
                </div>
            </div> 
        </form>
        <form action="php/signup.php" method="post">    
            <div class="signPart signUpPart">
                <h1>Регистрация</h1>
                <div class="sign_main">
                    <div class="sign_inputs">
                        <div class="signPopUpField"><input class="input_default signup_login" type="text" name="login" placeholder="Логин"><span class="necessaryStar">*</span></div>
                        <div class="signPopUpField">
                            <input class="input_default signup_password" type="password" name="pass" placeholder="Пароль">
                            <span class="showHidePassword js-passwordButton-signupPassword"><i class="fa-solid fa-eye"></i></span>
                            <span class="necessaryStar">*</span>
                        </div>
                        <div class="signPopUpField">
                            <input class="input_default signup_password-confirm" type="password" name="pass_confirm" placeholder="Подтверждение пароля">
                            <span class="showHidePassword js-passwordButton-signupPasswordConfirm"><i class="fa-solid fa-eye"></i></span>
                            <span class="necessaryStar">*</span>
                        </div>
                        <div class="signPopUpField"><input class="input_default signup_name" type="text" name="name" placeholder="Отображаемое имя"><span class="necessaryStar">*</span></div>
                        <div class="signPopUpField">
                            <div class="fakeInput input_default">
                                <span>+7</span>
                                <input class="signup_phone" type="tel" oninput="formatPhoneNumber()" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required name="phone" placeholder="123-456-7890">
                            </div>
                            <span class="necessaryStar">*</span></div>
                        <div class="signPopUpField"><input class="input_default signup_email" type="email" name="email" placeholder="Эл.почта"><span class="necessaryStar">*</span></div>
                    </div>
                    <div class="signPopUpField">
                        <div class="dropdown_menu js-signUp-city">
                            <div class="input_default dropdown_input">
                                <span class="signup_city">Выберите город</span>
                                <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                            </div>
                            <div class="dropdown_sections disabled"></div>
                        </div>
                        <span class="necessaryStar" style="margin: 0; margin-left: 1px; margin-right: 10px;">*</span>
                    </div>
                    <button type="submit" class="button_default sign_button registerButton">Зарегистрироваться</button>
                </div>
                <div class="sign_or">
                    <div class="separator_line"></div>
                    <span>Или</span>
                    <div class="separator_line"></div>
                </div>
                <div class="sign_another">
                    <div id="popupSignIn-btn" class="button_default">Войти</div>
                </div>
            </div>  
        </form>    
    </div> `,
    popupConfirmation: `
    <div class="confirmDeletion">
        <h1>Вы уверены?</h1>
        <div class="confirmationButtons">
            <a href="index.php" class="confirmationButton button_default popup_confirm">Да</a>
            <div class="confirmationButton button_default popup_cancel">Нет</div>
        </div>
    </div>
    `,
}

class Popup {
    constructor(popupContent) {
        this.popupContent = popupContent;
    };

    show(popupType, popupId) {
        this.render(popupType, popupId)
    }

    hide() {
        let popup = document.querySelector(`.popupBody`);
        popup.remove();
    }

    hideOnClick() {
        let popup = document.querySelector(`.popupBody`);
        let popupBackground = document.querySelector(`.popupBackground`);
        window.addEventListener('click', function (e) {
            if (e.target == popupBackground) {
                popup.remove();
            }
        })
    }

    hideOnEsc() {
        let popup = document.querySelector(`.popupBody`);
        window.addEventListener('keydown', function (e) {
            if (e.key == 27) {
                popup.remove()
            }
        })
    }

    render(popupType, popupId) {
        document.body.insertAdjacentHTML('afterbegin', `
        <div class="popupBody">
            <div class="popupBackground"></div>
            <div id="${popupId}" class="popupContent ${popupType}">
                <div class="popupHeader">
                    <button id="modal-btn-${popupId}" class="modal-btn"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="popupMain">
                    ${this.popupContent}
                </div>
            </div>
        </div>
        `);

        this.methodsForDifferentPopups(popupType)

        document.querySelector(`#modal-btn-${popupId}`).addEventListener('click', () => this.hide());
        this.hideOnClick()
        this.hideOnEsc()
    };

    methodsForDifferentPopups(userPopupAttr) {
        if(this.popupContent == popupTemplates.popupSignIn) {
            this.userSignPopupListeners(userPopupAttr)

            window.addEventListener('resize', () => {
                this.popupSignWidthRecalculation();
            })
            this.popupSignWidthRecalculation();
        }
        if(this.popupContent == popupTemplates.popupConfirmation) {
            this.removePostPopupConfirmation();
        }
    }

    userSignPopupListeners(signType) {
        let userSignPopup = document.querySelector(`.${signType}`);
        if (userSignPopup) {

            let signInPasswordShow = document.querySelector('.js-passwordButton-signinPassword');
            let signUpPasswordShow = document.querySelector('.js-passwordButton-signupPassword');
            let signInPasswordConfirmShow = document.querySelector('.js-passwordButton-signupPasswordConfirm');

            signInPasswordShow.addEventListener('click', () => {
                if(signInPasswordShow.previousElementSibling.type != 'text') {
                    signInPasswordShow.previousElementSibling.type = 'text';
                    signInPasswordShow.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
                } else {
                    signInPasswordShow.previousElementSibling.type = 'password';
                    signInPasswordShow.innerHTML = `<i class="fa-solid fa-eye"></i>`;
                }
            })
            signUpPasswordShow.addEventListener('click', () => {
                if(signUpPasswordShow.previousElementSibling.type != 'text') {
                    signUpPasswordShow.previousElementSibling.type = 'text';
                    signUpPasswordShow.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
                } else {
                    signUpPasswordShow.previousElementSibling.type = 'password';
                    signUpPasswordShow.innerHTML = '<i class="fa-solid fa-eye"></i>';
                }
            })
            signInPasswordConfirmShow.addEventListener('click', () => {
                if(signInPasswordConfirmShow.previousElementSibling.type != 'text') {
                    signInPasswordConfirmShow.previousElementSibling.type = 'text';
                    signInPasswordConfirmShow.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
                } else {
                    signInPasswordConfirmShow.previousElementSibling.type = 'password';
                    signInPasswordConfirmShow.innerHTML = '<i class="fa-solid fa-eye"></i>';
                }
            })

            let loginButton = document.querySelector('.signInButton');
            let registerButton = document.querySelector('.registerButton');

            let signUpLoginField = document.querySelector('.signup_login');
            let signUpPasswordField = document.querySelector('.signup_password');
            let signUpConfirmPasswordField = document.querySelector('.signup_password-confirm');
            let signUpNameField = document.querySelector('.signup_name');
            let signUpPhoneField = document.querySelector('.signup_phone');
            let signUpEmailField = document.querySelector('.signup_email');
            let signUpCityField = document.querySelector('.signup_city');

            let signInPassword = document.querySelector('.signin_password');
            let signInLogin = document.querySelector('.signin_login');


            let infoSignUpLogin = new PopupMessage('#f7b31c', '#f9ea82', 'Длина <b>логина</b> должна быть не менее 5 и не более 24 символов'),
            infoSignUpLoginNotAvalible = new PopupMessage('#f7b31c', '#f9ea82', '<b>Логин</b> может содержать цифры, <b>английские буквы</b> и символы, он также не должен содержать <b>пробелы и эмодзи</b>'),
            infoSignUpPassLength = new PopupMessage('#f7b31c', '#f9ea82', 'Длина <b>пароля</b> должна быть не менее 2 и не более 30 символов'),
            infoSignUpPassMismatch = new PopupMessage('#f7b31c', '#f9ea82', 'Пароли не совпадают'),
            infoWrongInput = new PopupMessage('#f7b31c', '#f9ea82', 'Неверный логин или пароль'),
            infoSignInPass = new PopupMessage('#f7b31c', '#f9ea82', 'Введите пароль'),
            infoSignInLogin = new PopupMessage('#f7b31c', '#f9ea82', 'Введите логин'),
            infoSignUpNameLength = new PopupMessage('#f7b31c', '#f9ea82', 'Длина <b>имени</b> должна быть не менее 2 и не более 30 символов'),
            infoSignUpPhoneLength = new PopupMessage('#f7b31c', '#f9ea82', 'Введите корректный номер телефона'),
            infoSignUpEmailLength = new PopupMessage('#f7b31c', '#f9ea82', 'Длина <b>E-mail</b> должна быть не менее 5 и не более 50 символов'),
            infoSignUpEmailUncorrect = new PopupMessage('#f7b31c', '#f9ea82', 'Введите корректный <b>E-mail адрес</b>'),
            infoSignUpCity = new PopupMessage('#f7b31c', '#f9ea82', 'Выберите город'),
            signExistingUser = new PopupMessage('#f7b31c', '#f9ea82', 'Пользователь с таким логином уже существует'),
            signExistingUserEmail = new PopupMessage('#f7b31c', '#f9ea82', 'Этот E-mail адрес уже занят'),
            signExistingUserPhone = new PopupMessage('#f7b31c', '#f9ea82', 'Этот номер телефона уже занят'),
            signRegistrationSuccesful = new PopupMessage('#25d404', '#bbf798', 'Регистрация прошла успешно'),
            signLoginSuccesful = new PopupMessage('#25d404', '#bbf798', 'Вы успешно вошли');

            let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let loginRegex = /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+$/;

            registerButton.addEventListener('click', (event) => {
                event.preventDefault();

                if(
                    signUpLoginField.value.length >= 5 &&
                    signUpLoginField.value.length <= 24 &&
                    signUpPasswordField.value.length >= 2 &&
                    signUpPasswordField.value.length <= 30 &&
                    signUpPasswordField.value == signUpConfirmPasswordField.value &&
                    signUpNameField.value.length >= 2 &&
                    signUpNameField.value.length <= 30 &&
                    signUpPhoneField.value.length === 12 &&
                    signUpEmailField.value.length >= 5 &&
                    signUpEmailField.value.length <= 50 &&
                    signUpCityField.innerText != 'Выберите город'
                    ) {
                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', 'php/signup.php', true);
                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                        xhr.onload = function() {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 200) {
                                    let response = JSON.parse(xhr.responseText);
                                    if(response.message === "existing_login") {
                                        if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                                        signExistingUser.init();
                                    } else if(response.message === "existing_email") {
                                        if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                                        signExistingUserEmail.init();
                                    } else if(response.message === "existing_phone") {
                                        if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                                        signExistingUserPhone.init();
                                    } else {
                                        if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                                        signRegistrationSuccesful.initOneSecond();
                                        setTimeout(() => window.location.href = 'index.php', 1000);
                                    }
                                }
                            }
                        };

                        xhr.onerror = function() {
                            console.log('Произошла ошибка при регистрации');
                        };

                        xhr.send('login=' + encodeURIComponent(signUpLoginField.value) 
                        + '&pass=' + encodeURIComponent(signUpPasswordField.value) 
                        + '&nickname=' + encodeURIComponent(signUpNameField.value)
                        + '&phone=' + encodeURIComponent(signUpPhoneField.value.replace(/-/g, ""))
                        + '&email=' + encodeURIComponent(signUpEmailField.value)
                        + '&city=' + encodeURIComponent(signUpCityField.innerText)
                        );
                    } else {
                        if (signUpLoginField.value.length < 5 || signUpLoginField.value.length > 24) {
                            if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                            infoSignUpLogin.init();
                        } else if(!loginRegex.test(signUpLoginField.value)) {
                            if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                            infoSignUpLoginNotAvalible.init();
                        } else if (signUpPasswordField.value.length < 2 || signUpPasswordField.value.length > 30) {
                            if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                            infoSignUpPassLength.init();
                        } else if (signUpPasswordField.value !== signUpConfirmPasswordField.value) {
                            if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                            infoSignUpPassMismatch.init();
                        } else if (signUpNameField.value.length < 2 || signUpNameField.value.length > 30) {
                            if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                            infoSignUpNameLength.init();
                        } else if (signUpPhoneField.value.length != 12) {
                            if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                            infoSignUpPhoneLength.init();
                        } else if (!emailRegex.test(signUpEmailField.value)) {
                            if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                            infoSignUpEmailUncorrect.init();
                        } else if (signUpEmailField.value.length < 5 || signUpEmailField.value.length > 50) {
                            if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                            infoSignUpEmailLength.init();
                        } else if (signUpCityField.innerText == 'Выберите город') {
                            if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                            infoSignUpCity.init();
                        }; 
                    };   
            });

            loginButton.addEventListener('click', (event) => {
                event.preventDefault();

                if(signInLogin.value.length != 0 && signInPassword.value.length != 0) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', '../php/signin.php', true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            let response = JSON.parse(xhr.responseText);
                           if (response.message === 'wrong_input') {
                                if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                                infoWrongInput.init();
                           } else if(response.message === 'login_succesful') {
                                if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                                signLoginSuccesful.initOneSecond();
                                setTimeout(() => window.location.href = 'index.php', 1000);
                           } else {
                            console.log(response);
                           }
                        } 
                    };

                    xhr.onerror = function() {
                        console.log('Произошла ошибка при входе в аккаунт');
                    };

                    xhr.send('login=' + encodeURIComponent(signInLogin.value) + '&pass=' + encodeURIComponent(signInPassword.value));
                } else {
                    if(signInLogin.value.length == 0) {
                        if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                        infoSignInLogin.init();
                    } else if(signInPassword.value.length == 0) {
                        if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                        infoSignInPass.init();
                    } 
                }
            });

            let userCityMenu = new DropdownMenu('js-signUp-city', undefined, undefined, postCreatingPage.cities);
            userCityMenu.init();
        }
    }

    popupSignWidthRecalculation() {
        let userSignWrapper = document.querySelector('.userSignWrapper');
        let registerButtonAnother = document.getElementById('popupSignUp-btn');
        let loginButtonAnother = document.getElementById('popupSignIn-btn');

            registerButtonAnother.addEventListener('click', () => {
                userSignWrapper.style.left = -350 + 'px'
            })
            loginButtonAnother.addEventListener('click', () => {
                userSignWrapper.style.left = 350 + 'px'
            })

            if (window.innerWidth <= 450) {
                registerButtonAnother.addEventListener('click', () => {
                    userSignWrapper.style.left = -400 + 'px'
                })
                loginButtonAnother.addEventListener('click', () => {
                    userSignWrapper.style.left = 400 + 'px'
                })
            } 
            
            if (window.innerWidth <= 330) {
                registerButtonAnother.addEventListener('click', () => {
                    userSignWrapper.style.left = -417 + 'px'
                })
                loginButtonAnother.addEventListener('click', () => {
                    userSignWrapper.style.left = 417 + 'px'
                })
            } 

            if (window.innerWidth <= 300) {
                registerButtonAnother.addEventListener('click', () => {
                    userSignWrapper.style.left = -290 + 'px'
                })
                loginButtonAnother.addEventListener('click', () => {
                    userSignWrapper.style.left = 290 + 'px'
                })
            }
    }

    removePostPopupConfirmation() {
        let confirmButton = document.querySelector('.popup_confirm');
        let cancelButton = document.querySelector('.popup_cancel');

        cancelButton.addEventListener('click', () => this.hide());
        confirmButton.addEventListener('click', () => removePost());
    }
}

const popupUserSignIn = new Popup(popupTemplates.popupSignIn);
const popupConfirmation = new Popup(popupTemplates.popupConfirmation);

const signInButton = document.getElementById('signin');
const signUpButton = document.getElementById('signup');

if (signInButton && signUpButton) {
    signInButton.addEventListener('click', () => popupUserSignIn.show('popupUserSignIn', 'userSignPopup'));
    signUpButton.addEventListener('click', () => popupUserSignIn.show('popupUserSignUp', 'userSignPopup'));
}

let removePostButton = document.querySelector('.removePost');
if(removePostButton) {
    removePostButton.addEventListener('click', () => popupConfirmation.show('popupConfirmation', 'popupConfirmRemoving'));
}

class Slider {
    constructor(parent, sliderWidth, sliderHeight, containerWidth, sliderImgs, postId) {
        this.sliderImgs = sliderImgs;

        this.parent = parent;
        this.sliderWidth = sliderWidth;
        this.sliderHeight = sliderHeight;
        this.containerWidth = containerWidth;
        this.postId = postId;
    };

    dotsHandler(i) {
        if (!i) {
            this.parent.querySelector('.slider-dots').insertAdjacentHTML('beforeend', `<a id="slider-dot${i}" class="slider-dot dot-active"></a>`)
        } else {
            this.parent.querySelector('.slider-dots').insertAdjacentHTML('beforeend', `<a id="slider-dot${i}" class="slider-dot"></a>`)
        }
    }

    countImgsContainerWidth(imgArray) {
        let slide = this.parent.querySelector('.slide');
        let slideWidth = parseInt(getComputedStyle(slide).getPropertyValue(this.sliderWidth));
        slideWidth *= imgArray.length;
        return slideWidth
    }

    scrollSlide(imgArray) {
        let offset = 0;
        const sliderLine = this.parent.querySelector('.slider-imgs');
        let slide = this.parent.querySelector('.slide');
        let dotActive = this.parent.getElementsByClassName('dot-active')
        let dot = this.parent.getElementsByClassName('slider-dot')
        let slideWidth = parseInt(getComputedStyle(slide).getPropertyValue(this.sliderWidth));
        const sliderLineWidth = parseInt(getComputedStyle(sliderLine).getPropertyValue(this.containerWidth)) - slideWidth;

        this.parent.querySelector('.right').addEventListener('click', () => {
            if (offset <= -sliderLineWidth) {
                offset = 0
                sliderLine.style.left = '0'
            } else {
                offset += -slideWidth;
                sliderLine.style.left = offset + 'px'
                for (let i = 0; i < imgArray.length; i++) {
                    let dotId = this.parent.querySelector(`#slider-dot${i}`);
                    if (parseInt(sliderLine.style.left) == -slideWidth * parseInt(dotId.id.slice(-1))) {
                        dotActive[0].className = 'slider-dot'
                        dotId.className += ' dot-active'
                    }
                }
            }
            if (parseInt(sliderLine.style.left) == 0) {
                dotActive[0].className = 'slider-dot'
                this.parent.querySelector('#slider-dot0').className += ' dot-active';
            }
        })
        this.parent.querySelector('.left').addEventListener('click', () => {
            if (offset >= 0) {
                offset = -sliderLineWidth
                sliderLine.style.left = -sliderLineWidth + 'px'
            } else {
                offset += slideWidth;
                sliderLine.style.left = offset + 'px'
                for (let i = 0; i < imgArray.length; i++) {
                    let dotId = this.parent.querySelector(`#slider-dot${i}`);
                    if (parseInt(sliderLine.style.left) == -slideWidth * parseInt(dotId.id.slice(-1))) {
                        dotActive[0].className = 'slider-dot'
                        dotId.className += ' dot-active'
                    }
                }
            }
            if (parseInt(sliderLine.style.left) == -sliderLineWidth) {
                dotActive[0].className = 'slider-dot'
                this.parent.querySelector(`#slider-dot${dot.length - 1}`).className += ' dot-active';
            }
        })
        //dots scroller
        for (let i = 0; i < imgArray.length; i++) {
            let dotId = this.parent.querySelector(`#slider-dot${i}`);
            dotId.addEventListener('click', () => {
                if (parseInt(sliderLine.style.left) !== -slideWidth * parseInt(dotId.id.slice(-1))) {
                    offset = 0
                    offset += -slideWidth * parseInt(dotId.id.slice(-1))
                    sliderLine.style.left = offset + 'px'
                    dotActive[0].className = 'slider-dot'
                    dotId.className += ' dot-active'
                }
            })
        }
    }

    swipeSlide(imgArray) {
        let offset = 0;
        const sliderLine = this.parent.querySelector('.slider-imgs');
        let slide = this.parent.querySelector('.slide');
        let dotActive = this.parent.getElementsByClassName('dot-active')
        let dot = this.parent.getElementsByClassName('slider-dot')
        let slideWidth = parseInt(getComputedStyle(slide).getPropertyValue(this.sliderWidth));
        const sliderLineWidth = parseInt(getComputedStyle(sliderLine).getPropertyValue(this.containerWidth)) - slideWidth;

        let initialX = null;
        let initialY = null;

        this.parent.addEventListener('touchstart', (e) => {
            initialX = e.touches[0].clientX;
            initialY = e.touches[0].clientY;
        });
        this.parent.addEventListener('touchmove', (e) => {
            if (initialX === null || initialY === null) {
                return;
              }
            
              var currentX = e.touches[0].clientX;
              var currentY = e.touches[0].clientY;
            
              var diffX = initialX - currentX;
              var diffY = initialY - currentY;
            
              if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0) {
                    if (offset <= -sliderLineWidth) {
                        offset = 0
                        sliderLine.style.left = '0'
                    } else {
                        offset += -slideWidth;
                        sliderLine.style.left = offset + 'px'
                        for (let i = 0; i < imgArray.length; i++) {
                            let dotId = this.parent.querySelector(`#slider-dot${i}`);
                            if (parseInt(sliderLine.style.left) == -slideWidth * parseInt(dotId.id.slice(-1))) {
                                dotActive[0].className = 'slider-dot'
                                dotId.className += ' dot-active'
                            }
                        }
                    }
                    if (parseInt(sliderLine.style.left) == 0) {
                        dotActive[0].className = 'slider-dot'
                        this.parent.querySelector('#slider-dot0').className += ' dot-active';
                    }
                } else {
                    if (offset >= 0) {
                        offset = -sliderLineWidth
                        sliderLine.style.left = -sliderLineWidth + 'px'
                    } else {
                        offset += slideWidth;
                        sliderLine.style.left = offset + 'px'
                        for (let i = 0; i < imgArray.length; i++) {
                            let dotId = this.parent.querySelector(`#slider-dot${i}`);
                            if (parseInt(sliderLine.style.left) == -slideWidth * parseInt(dotId.id.slice(-1))) {
                                dotActive[0].className = 'slider-dot'
                                dotId.className += ' dot-active'
                            }
                        }
                    }
                    if (parseInt(sliderLine.style.left) == -sliderLineWidth) {
                        dotActive[0].className = 'slider-dot'
                        this.parent.querySelector(`#slider-dot${dot.length - 1}`).className += ' dot-active';
                    }
                }
            }

            for (let i = 0; i < imgArray.length; i++) {
                let dotId = this.parent.querySelector(`#slider-dot${i}`);
                dotId.addEventListener('click', () => {
                    if (parseInt(sliderLine.style.left) !== -slideWidth * parseInt(dotId.id.slice(-1))) {
                        offset = 0
                        offset += -slideWidth * parseInt(dotId.id.slice(-1))
                        sliderLine.style.left = offset + 'px'
                        dotActive[0].className = 'slider-dot'
                        dotId.className += ' dot-active'
                    }
                })
            }
            
            initialX = null;
            initialY = null;
        })
    }

    getImages() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `php/getSliderImages.php?postId=${this.postId}`, true);
            xhr.onreadystatechange = () => {
                if(xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        let loadedImages  = JSON.parse(xhr.responseText);
                        resolve(loadedImages);
                    } else {
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.onerror = function() {
                console.log('Ошибка загрузки изображений');
            }
            
            xhr.send();
        })
    }

    render(imgArray) {
        this.parent.innerHTML = ''
        if (imgArray.length == 0) {
            this.parent.innerHTML = `
            <div class="slider">
                <div class="slider-imgs"></div>
            </div>`;

            this.parent.querySelector('.slider-imgs').insertAdjacentHTML('beforeend', `<img class="slide slide-0" src="../img/service/noImages.jpg" alt="noimages">`);
        } else if (imgArray.length == 1) {
            this.parent.innerHTML = `
            <div class="slider">
                <div class="slider-imgs"></div>
            </div>`;

            this.parent.querySelector('.slider-imgs').insertAdjacentHTML('beforeend', `<img class="slide slide-${imgArray.indexOf(imgArray[0])}" src="${imgArray[0].src}" alt="${imgArray[0].alt}">`);
        } else {
            this.parent.innerHTML = `
            <div class="slider">
                <a class="slide-arrow left"></a>

                <div class="slider-imgs"></div>
                <div class="slider-dots"></div>

                <a class="slide-arrow right"></a>
            </div>`;
            
            for (let i = 0; i < imgArray.length; i++) {
                this.parent.querySelector('.slider-imgs').insertAdjacentHTML('beforeend', `<img class="slide slide-${imgArray.indexOf(imgArray[i])}" src="${imgArray[i].src}" alt="${imgArray[i].alt}">`);
                this.dotsHandler(i);
            }
        }
        this.parent.querySelector('.slider-imgs').style.setProperty(this.containerWidth, this.countImgsContainerWidth(imgArray) + 'px');
        if(imgArray.length != 0 && imgArray.length != 1) {
            this.scrollSlide(imgArray);
            this.swipeSlide(imgArray);
        }

        let slideElements = this.parent.querySelectorAll('.slide');
        slideElements.forEach(slide => {
            slide.addEventListener('click', () => {
                let imageIndex = Number(slide.className.match(/\d+/g).join(''));
                let popupSliderImage = `
                <img class="popupImage" src="${imgArray[imageIndex].src}" alt="avatar">  
                `

                let imagePopup = new Popup(popupSliderImage);
                imagePopup.show(`popupSliderImage`, 'popupSiderImage');
            })
        })
    }

    start() {
        if (this.parent.className != 'slider-announcement-preview') {
            this.getImages()
            .then(loadedImages => this.render(loadedImages));
        } else {
            this.render(this.sliderImgs);
        }
    }

    init() {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            window.addEventListener('resize', () => {
                this.start();
           })
        } else {
            window.addEventListener('orientationchange', () => {
                this.start();
           })
        }

       this.start();
    }
}