// Звездочки рейтинга
let ratingStars = document.querySelectorAll('.rating_star');
ratingStars.forEach(item => {
    item.addEventListener('click', () => {
        let ratingValue 
        item.parentNode.dataset.totalValue = item.dataset.itemValue;
        ratingValue = item.parentNode.dataset.totalValue;
    })
})

// Дроп-меню
// function dropdownMenu(menuClassName) {
//     let dropdownMenu = document.querySelector(`${menuClassName}`);
//     if(dropdownMenu){
//         let dropdownOpener = document.querySelector(`${menuClassName} .dropdown_input`);
//         let dropdownSections = document.querySelector(`${menuClassName} .dropdown_sections`);
//         let dropdownCaret = document.getElementById(`${menuClassName} .dropdown-caret`);
//         let sectionsCollection = document.querySelectorAll(`${menuClassName} .dropdown_item`);
//         let dropdownValue = document.querySelector(`${dropdownOpener} span`);

//         function isDropdownOpened() {
//             if (dropdownMenu.dataset.dropdownOpened == 1) {
//                 dropdownSections.classList.remove('disabled');
//                 dropdownCaret.style.transform = 'rotate(180deg)'
//             } else {
//                 dropdownSections.classList.add('disabled');
//                 dropdownCaret.style.transform = null
//             }
//         }

//         dropdownOpener.addEventListener('click', () => {
//             if(dropdownMenu.dataset.dropdownOpened == 0) {
//                 dropdownMenu.dataset.dropdownOpened = 1;
//                 isDropdownOpened();
//                 console.log('открыли')
//             } else {
//                 dropdownMenu.dataset.dropdownOpened = 0;
//                 isDropdownOpened();
//                 console.log('закрыли')
//             }
//         })

//         sectionsCollection.forEach(section => {
//             section.addEventListener('click', () => {
//                 dropdownValue.innerText = section.innerText;
//             })
//         })
//     }
// }

// Слайдер

class DropdownMenu {
    constructor (menuName) {
        this.menuName = menuName;
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

        sectionsCollection.forEach(section => {
            section.addEventListener('click', () => {
                dropdownValue.innerText = section.innerText;
                dropdownValue.style.color = '#000';
                choosenSection = dropdownValue.innerText;
                this.isMenuOpened(menuName);
            })
        })

        return choosenSection;
    }

    menuEventListeners(menuName) {
        let dropdownOpener = document.querySelector(`.${menuName} .dropdown_input`);
        dropdownOpener.addEventListener('click', () => this.isMenuOpened(menuName));
        this.chooseSection(menuName);
        
    }

    init () {
        this.menuEventListeners(this.menuName);
    }
}

class Slider {
    constructor(parent, sliderWidth, sliderHeight, containerWidth) {
        this.sliderImgs = [
            { src: 'img/placeholder-image.jpg', alt: '5' },
            { src: 'img/placeholder-image.jpg', alt: '5' },
            { src: 'img/placeholder-image.jpg', alt: '5' },
            { src: 'img/placeholder-image.jpg', alt: '5' },
        ];

        this.parent = parent;
        this.sliderWidth = sliderWidth;
        this.sliderHeight = sliderHeight;
        this.containerWidth = containerWidth;
    };

    dotsHandler(i) {
        if (!i) {
            document.querySelector('.slider-dots').insertAdjacentHTML('beforeend', `<a id="${i}slider-dot" class="slider-dot dot-active"></a>`)
        } else {
            document.querySelector('.slider-dots').insertAdjacentHTML('beforeend', `<a id="${i}slider-dot" class="slider-dot"></a>`)
        }
    }

    countImgsContainerWidth() {
        let slide = document.querySelector('.slide');
        let slideWidth = parseInt(getComputedStyle(slide).getPropertyValue(this.sliderWidth));
        slideWidth *= this.sliderImgs.length;
        return slideWidth
    }

    scrollSlide() {
        let offset = 0;
        let sliderImgsArray = this.sliderImgs;
        const sliderLine = document.querySelector('.slider-imgs');
        let slide = document.querySelector('.slide');
        let dotActive = document.getElementsByClassName('dot-active')
        let dot = document.getElementsByClassName('slider-dot')
        let slideWidth = parseInt(getComputedStyle(slide).getPropertyValue(this.sliderWidth));
        const sliderLineWidth = parseInt(getComputedStyle(sliderLine).getPropertyValue(this.containerWidth)) - slideWidth;

        document.querySelector('.right').addEventListener('click', function () {
            if (offset <= -sliderLineWidth) {
                offset = 0
                sliderLine.style.left = '0'
            } else {
                offset += -slideWidth;
                sliderLine.style.left = offset + 'px'
                for (let i = 0; i < sliderImgsArray.length; i++) {
                    let dotId = document.getElementById(`${i}slider-dot`);
                    if (parseInt(sliderLine.style.left) == -slideWidth * parseInt(dotId.id)) {
                        dotActive[0].className = 'slider-dot'
                        dotId.className += ' dot-active'
                    }
                }
            }
            if (parseInt(sliderLine.style.left) == 0) {
                dotActive[0].className = 'slider-dot'
                document.getElementById('0slider-dot').className += ' dot-active';
            }
        })
        document.querySelector('.left').addEventListener('click', function () {
            console.log(`${dot.length - 1}slider-dot`)
            if (offset >= 0) {
                offset = -sliderLineWidth
                sliderLine.style.left = -sliderLineWidth + 'px'
            } else {
                offset += slideWidth;
                sliderLine.style.left = offset + 'px'
                for (let i = 0; i < sliderImgsArray.length; i++) {
                    let dotId = document.getElementById(`${i}slider-dot`);
                    if (parseInt(sliderLine.style.left) == -slideWidth * parseInt(dotId.id)) {
                        dotActive[0].className = 'slider-dot'
                        dotId.className += ' dot-active'
                    }
                }
            }
            if (parseInt(sliderLine.style.left) == -sliderLineWidth) {
                dotActive[0].className = 'slider-dot'
                document.getElementById(`${dot.length - 1}slider-dot`).className += ' dot-active';
            }
        })
        //dots scroller
        for (let i = 0; i < this.sliderImgs.length; i++) {
            let dotId = document.getElementById(`${i}slider-dot`);
            dotId.addEventListener('click', function () {
                if (parseInt(sliderLine.style.left) !== -slideWidth * parseInt(dotId.id)) {
                    offset = 0
                    offset += -slideWidth * parseInt(dotId.id)
                    sliderLine.style.left = offset + 'px'
                    dotActive[0].className = 'slider-dot'
                    dotId.className += ' dot-active'
                }
            })
        }
    }

    render() {
        document.querySelector(`.${this.parent}`).innerHTML = ''
        document.querySelector(`.${this.parent}`).innerHTML = `<div class="slider">
        <a class="slide-arrow left"></a>

        <div class="slider-imgs"></div>
        <div class="slider-dots"></div>

        <a class="slide-arrow right"></a>
        </div>`;
        for (let i = 0; i < this.sliderImgs.length; i++) {
            document.querySelector('.slider-imgs').insertAdjacentHTML('beforeend', `<img class="slide" src="${this.sliderImgs[i].src}" alt="${this.sliderImgs[i].alt}">`);
            this.dotsHandler(i)
        }

        document.querySelector('.slider-imgs').style.setProperty(this.containerWidth, this.countImgsContainerWidth() + 'px');
    }

    init() {
        this.render()
        this.scrollSlide()
    }
}

const announcementSlider = new Slider('slider-announcement', '--slider-announcement-width', '--slider-announcement-height', '--container-width');
if(document.querySelector('.slider-announcement')) {
    announcementSlider.init()
}

// Всплывающее окошко

const popupTemplates = {
    popupSignIn: `
    <div class="userSignWrapper">
        <form action="php/signin.php" method="post">
            <div class="signPart">
                <h1>Вход</h1>
                <div class="sign_main">
                    <div class="sign_inputs">
                        <input class="input_default" type="text" name="login" placeholder="Логин">
                        <input class="input_default" type="password" name="pass" placeholder="Пароль">
                    </div>
                    <div class="sign_additional">
                        <div class="sign_additional-rememberme">
                            <div class="checkbox_default">
                                <input type="checkbox">
                                <div class="checkbox_background"></div>
                            </div>
                            <span>Запомнить меня</span>
                        </div>
                        <div class="sign_additional-forgotpass"><a>Забыли пароль?</a></div>
                    </div>
                    <button type="submit" class="button_default sign_button">Войти</button>
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
            <div class="signPart">
                <h1>Регистрация</h1>
                <div class="sign_main">
                    <div class="sign_inputs">
                        <input class="input_default" type="text" name="login" placeholder="Логин">
                        <input class="input_default" type="password" name="pass" placeholder="Пароль">
                        <input class="input_default" type="password" name="pass_confirm" placeholder="Подтверждение пароля">
                    </div>
                    <button type="submit" class="button_default sign_button">Зарегистрироваться</button>
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
    </div> `
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
        if(this.popupContent = popupTemplates.popupSignIn) {
            this.userSignPopupListeners(userPopupAttr)
        }
    }

    userSignPopupListeners(signType) {
        let userSignPopup = document.querySelector(`.${signType}`);
        if (userSignPopup) {
            let userSignWrapper = document.querySelector('.userSignWrapper');
            let registerButton = document.getElementById('popupSignUp-btn');
            let loginButton = document.getElementById('popupSignIn-btn');

            if (document.innerWidth <= 425) {
                console.log('мобилка')
                registerButton.addEventListener('click', () => {
                    userSignWrapper.style.left = -400 + 'px'
                })
                loginButton.addEventListener('click', () => {
                    userSignWrapper.style.left = 400 + 'px'
                })
            } else if (document.scrollWidth <= 325) {
                registerButton.addEventListener('click', () => {
                    userSignWrapper.style.left = -350 + 'px'
                })
                loginButton.addEventListener('click', () => {
                    userSignWrapper.style.left = 350 + 'px'
                })
            } else {
                registerButton.addEventListener('click', () => {
                    userSignWrapper.style.left = -350 + 'px'
                })
                loginButton.addEventListener('click', () => {
                    userSignWrapper.style.left = 350 + 'px'
                })
            }
        }
    }
}

const popupUserSignIn = new Popup(popupTemplates.popupSignIn);

const signInButton = document.getElementById('signin');
const signUpButton = document.getElementById('signup');

if (signInButton && signUpButton) {
    signInButton.addEventListener('click', () => popupUserSignIn.show('popupUserSignIn', 'userSignPopup'));
    signUpButton.addEventListener('click', () => popupUserSignIn.show('popupUserSignUp', 'userSignPopup'));
}

