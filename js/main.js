let preloader = document.getElementById('preloader');
function preloaderAppend() {
    preloader.remove()
}

let getUser = function(userId) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `php/getUser.php?userId=${userId}`, true);
        xhr.onload = function() {
            if(xhr.status === 200) {
                let user = JSON.parse(xhr.responseText);
                resolve(user);
            } else {
                reject(xhr.statusText)
            }
        }

        xhr.onerror = function() {
            console.log('Ошибка загрузки пользователя');
        }

        xhr.send();
    }) 
}

if(document.querySelector('.user_name')) {
    let currentUserID = document.querySelector('.user_name').dataset.userid;
    getUser(currentUserID)
    .then(user => {
        if(user.length == 0) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'exit.php', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    console.log('Выход выполнен успешно');
                    location.reload(true);
                } else {
                    console.log('Ошибка выполнения выхода');
                }
            };
            xhr.send();
            console.log('Юзера не существует')
        } else {
            console.log('Порядок, юзер существует')
        }
    })
    .catch(error => console.log(error));

    getUser(currentUserID)
    .then(user => {
        let userNameBlock = document.querySelector('.user_name');
        let userAvatarBlock = document.querySelector('.user_avatar img');
        
        userNameBlock.innerText = user.nickname;
        userAvatarBlock.src = `img/uploadedAvatars/${user.avatar}`
    })
}


let headerContent = document.querySelector('.header_main_content');
let headerOpener = document.querySelector('.header_opener');
let userAccountInfo = document.querySelector('.user');
let logo = document.querySelector('.logo');
let headerOpenerCaret = document.querySelector('.header_opener i');
headerOpener.addEventListener('click', () => {
    if(window.getComputedStyle(headerContent).height == '55px') {
        headerContent.style.height = 0;
        userAccountInfo.style.opacity = '0';
        logo.style.opacity = '0';
        setTimeout(() => {
            userAccountInfo.style.visibility = 'hidden';
            logo.style.visibility = 'hidden';
        }, 200)
        headerOpenerCaret.style.transform = 'rotate(180deg)'
    } else {
        headerContent.style.height = 55 + 'px';
        userAccountInfo.style.opacity = '1'
        userAccountInfo.style.visibility = 'visible';
        logo.style.opacity = 1;
        logo.style.visibility = 'visible';
        
        headerOpenerCaret.style.transform = 'rotate(0deg)'
    }
})

let userDropdown = document.querySelector('.user_dropdown');
let userName = document.querySelector('.user_name');
if (userName) {
    userAccountInfo.addEventListener('click', () => {
       if(userDropdown.style.display != 'flex') {
            userDropdown.style.display = 'flex';  
        } else {
            userDropdown.style.display = 'none';   
        } 
})
}

window.addEventListener('click', (e) => {
    if (userDropdown && e.target != userName && e.target != userAccountInfo) {
        userDropdown.style.display = 'none'
    }
})

class PopupMessage {
    constructor(textColor, backgroundColor, messageText) {
        this.textColor = textColor;
        this.backgroundColor = backgroundColor;
        this.messageText = messageText;
    }

    renderMessage() {
        let messageTemplate = `
        <div class="animatedMessage" style="color: ${this.textColor}; border: 1px solid ${this.textColor}; background: ${this.backgroundColor};">
            <div class="messageContent">
                <span><i class="fa-solid fa-circle-exclamation"></i></span>
                <p>${this.messageText}</p>
            </div>
            <div class="messageDurationStripe" style="background: ${this.textColor};"></div>
        </div>
        `
        return messageTemplate;
    }

    renderMessageOneSecond() {
        let messageTemplate = `
        <div class="animatedMessage" style="color: ${this.textColor}; border: 1px solid ${this.textColor}; background: ${this.backgroundColor};">
            <div class="messageContent">
                <span><i class="fa-solid fa-circle-exclamation"></i></span>
                <p>${this.messageText}</p>
            </div>
            <div class="messageDurationStripeOneSecond" style="background: ${this.textColor};"></div>
        </div>
        `
        return messageTemplate;
    }

    init() {
        document.body.insertAdjacentHTML('afterbegin', this.renderMessage());
        let messageEl = document.querySelector('.animatedMessage');
        setTimeout(() => { messageEl.remove() }, 6000);
    }

    initOneSecond() {
        document.body.insertAdjacentHTML('afterbegin', this.renderMessageOneSecond());
        let messageEl = document.querySelector('.animatedMessage');
        setTimeout(() => { messageEl.remove() }, 1000);
    }
}

class NewPostPage {
    constructor() {
        this.postCreatingContainer = document.querySelector('.post_creating-sections');
        this.postStructurePanel = document.querySelector('.post_creating-panel');

        this.categories = ['Поиск работы', 'Поиск сотрудника', 'Вещи, электроника и пр.'];
        this.spheres =  [
            "Информационные технологии",
            "Медицина и здравоохранение",
            "Финансы и бухгалтерия",
            "Производство и инженерия",
            "Образование",
            "Медиа и коммуникации",
            "Гостеприимство и туризм",
            "Искусство и развлечения",
            "Право и юриспруденция",
            "Сфера услуг"
        ];
        this.experience = [
            'Без опыта', 
            '1 год', 
            '3 года', 
            'Более 3-х лет'
        ];
        this.schedule = [
            'Не принципиально', 
            'Полная занятость',
            'Частичная занятость', 
            'Гибкий график', 
            'Полный день', 
            'Удалённая работа'
        ]
        this.cities = [
            "Москва",
            "Санкт-Петербург",
            "Новосибирск",
            "Екатеринбург",
            "Нижний Новгород",
            "Казань",
            "Челябинск",
            "Омск",
            "Самара",
            "Ростов-на-Дону"
        ]

        this.post = {
            userid: '',
            userName: '',
            userPhone: '',
            userNickname: '',
            userAvatar: '',
            userRating: '',
            category: '',
            title: '', 
            descr: '',
            category: '',
            experience: '',
            sphere: '',
            schedule: '',
            price: '', 
            date: '',
            time: '',
            image0: '',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            image5: '',
            image6: '',
            image7: '',
            image8: '',
            image9: '',
            clientSideImgs: [],
            views: 0,
            draft: true
        };

        this.postId;
    }

    renderMainInformation() {
        let imageContainer = document.querySelector('.imageLoad_container');
        if(imageContainer.style.display != 'none') imageContainer.style.display = 'none';
        let postCategory = this.post.category,
        infoMessageCategory = new PopupMessage('#f7b31c', '#f9ea82', 'Сначала выберите категорию объявления');
        if(postCategory == '') {
            if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
            infoMessageCategory.init();

        } else if (postCategory == 'Поиск работы' || postCategory == 'Поиск сотрудника') {
            this.postCreatingContainer.innerHTML = `
            <div class="post_creating-main">
                <div class="post_creating-box">
                    <p>Название</p>
                    <input class="input_default js-post-title" type="text" placeholder="Введите название" value="${this.post.title}">
                </div>
                <div class="post_creating-box js-postDescr-input">
                    <p>Описание</p>
                    <textarea class="input_default js-post-descr" maxlength="1000" name="post_description" cols="30" rows="10" placeholder="Расскажите подробнее, что Вы предлагаете в своём объявлении">${this.post.descr}</textarea>
                </div>
                <div class="post_creating-box">
                    <p>Сфера</p>
                    <div class="dropdown_menu js-post-workSphere">
                        <div class="input_default dropdown_input">
                            <span>Выберите категорию</span>
                            <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                        </div>
                        <div class="dropdown_sections disabled"></div>
                    </div>
                </div>
                <div class="post_creating-box">
                    <p>Опыт работы</p>
                    <div class="dropdown_menu js-post-workExperience">
                        <div class="input_default dropdown_input">
                            <span>Выберите категорию</span>
                            <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                        </div>
                        <div class="dropdown_sections disabled"></div>
                    </div>
                </div>
                <div class="post_creating-box">
                    <p>График</p>
                    <div class="dropdown_menu js-post-workSchedule">
                        <div class="input_default dropdown_input">
                            <span>Выберите категорию</span>
                            <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                        </div>
                        <div class="dropdown_sections disabled"></div>
                    </div>
                </div>
                <div class="post_creating-box">
                    <p class="price">Зарплата</p>
                    <div class="price_field input_default">
                        <input class="js-post-price" type="number" placeholder="Введите цену" value="${this.post.price}">
                        <span>₽</span>
                    </div>
                </div>
            </div>`

            let sphereMenu = new DropdownMenu('js-post-workSphere', postCreatingPage.post, "sphere", this.spheres);
            let experienceMenu = new DropdownMenu('js-post-workExperience', postCreatingPage.post, "experience", this.experience);
            let scheduleMenu = new DropdownMenu('js-post-workSchedule', postCreatingPage.post, "schedule", this.schedule);
            sphereMenu.init();
            experienceMenu.init();
            scheduleMenu.init();

        } else if (postCategory == 'Вещи, электроника и пр.') {
            this.postCreatingContainer.innerHTML = `
            <div class="post_creating-main">
            <div class="post_creating-box">
                <p>Название</p>
                <input class="input_default js-post-title" type="text" placeholder="Введите название" value="${this.post.title}">
            </div>
            <div class="post_creating-box js-postDescr-input">
                <p>Описание</p>
                <textarea class="input_default js-post-descr" maxlength="1000" name="post_description" cols="30" rows="10" placeholder="Расскажите подробнее, что Вы предлагаете в своём объявлении">${this.post.descr}</textarea>
            </div>
            <div class="post_creating-box">
                <p class="price">Цена</p>
                <div class="price_field input_default">
                    <input class="js-post-price" type="number" placeholder="Введите цену" value="${this.post.price}">
                    <span>₽</span>
                </div>
            </div>
        </div>`
        }
        const postDescrSymbolCounter = new SymbolCounter(document.querySelector('.js-postDescr-input'), document.querySelector('.js-post-descr'), 1000);
        postDescrSymbolCounter.init();
        this.newPostInit();
    }

    renderCategory() {
        let imageContainer = document.querySelector('.imageLoad_container');
        if(imageContainer.style.display != 'none') imageContainer.style.display = 'none';
        this.postCreatingContainer.innerHTML = `
        <div class="post_creating-category">
            <div class="post_creating-box">
                <p>Категория</p>
                <div class="dropdown_menu js-post-category">
                    <div class="input_default dropdown_input">
                        <span>Выберите категорию</span>
                        <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                    </div>
                    <div class="dropdown_sections disabled"></div>
                </div>
            </div>
        </div>
        `
    
        let categoryMenu = new DropdownMenu('js-post-category', postCreatingPage.post, 'category', this.categories);
        categoryMenu.init();
        this.newPostInit();
    }

    imageLoaderFunctionality() {
        let imageLoaders = document.querySelectorAll('.imageLoad_button');
        imageLoaders.forEach(loader => {
            let imageLoaderInput = loader.querySelector('input');
            loader.onchange = () => {
                let file = imageLoaderInput.files[0];
                let reader = new FileReader();
                let innerImage = loader.querySelector(`img`);
                
                let removeImageButton = loader.querySelector(`.js-removeImage-btn`);
                let imageTools = loader.querySelector(`.imageLoad_tools`);

                imageTools.style.display = 'flex';
                postCreatingPage.addLoadersIfTheRestIsFull();

                reader.onload = (e) => {
                    innerImage.src = e.target.result;
                    this.post.clientSideImgs.push({ src: `${e.target.result}`, alt: file.name });

                    removeImageButton.addEventListener('click', () => {
                        imageTools.style.display = "none";
                        imageLoaderInput.value = null;
                        innerImage.src = '../img/photo_placeholder2.png';

                        let removedImageIndex = this.post.clientSideImgs.findIndex(img => img.src === `${e.target.result}`);
                        this.post.clientSideImgs.splice(removedImageIndex, 1);

                        let imageLoadContainer = document.querySelector('.imageLoad_secondImagesRow');
                        let loaders = document.querySelectorAll('.imageLoad_button input');
                        let filledLoaders = [];
                        loaders.forEach(loader => {
                            if(loader.files.length != 0) {
                                filledLoaders.push(loader);
                            }
                        });
                        if (filledLoaders.length < 5) {
                            imageLoadContainer.style.display = "none";
                        } else {
                            imageLoadContainer.style.display = "flex";
                        }
                    });
                };
                
                reader.readAsDataURL(file);
            }
        })
    }

    uploadImagesToTheServer() {
        let fileInputs = document.querySelectorAll('.imageLoad_button input');
          fileInputs.forEach(input => {
            if(input.files.length != 0) {
                let file = input.files[0],
                formData = new FormData();
    
                let modifiedFileName = `postImage_${Math.random() * 13}-${input.id.match(/\d+/g)}`; 
                modifiedFileName = modifiedFileName.split('.').join('');
                let lastIndex = file.name.lastIndexOf("."); 
                let extension = file.name.substring(lastIndex);
                let newFileName = modifiedFileName + extension;
                file = new File([file], newFileName, { type: file.type });
    
                let imageProperty = `image${parseInt(input.id.slice(-1))}`;
                this.post[imageProperty] = `img/uploadedPostImages/${file.name}`;
    
                formData.append('image', file);
                    
                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'php/uploadImage.php', true);
                xhr.onload = function () {
                    if(xhr.status === 200) {
                        console.log('Файл успешно загружен');
                    } else  {
                        console.log('При загрузке файла произошла ошибка')
                    }
                }
                xhr.send(formData);
            }
        })
    }

    addLoadersIfTheRestIsFull() {
        let imageLoadContainer = document.querySelector('.imageLoad_secondImagesRow');
        let loaders = document.querySelectorAll('.imageLoad_button input');
        let filledLoaders = [];
        loaders.forEach(loader => {
            if(loader.files.length != 0) {
                filledLoaders.push(loader);
            }
        });
        if (filledLoaders.length >= 5) {
            imageLoadContainer.style.display = "flex";
        }
        postCreatingPage.imageLoaderFunctionality();
    }
    
    renderImageLoader() {
        if (this.post.category != '') {
            this.postCreatingContainer.innerHTML = '';
            let imageContainer = document.querySelector('.imageLoad_container');
            imageContainer.style.display = 'flex';
        } else {
            let infoMessageCategory = new PopupMessage('#f7b31c', '#f9ea82', 'Сначала выберите категорию объявления');

            if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
            infoMessageCategory.init();
        }
    }

    renderPreview() {
        let imageContainer = document.querySelector('.imageLoad_container');
        if(imageContainer.style.display != 'none') imageContainer.style.display = 'none';
        if (this.post.category != '') {
            this.postCreatingContainer.innerHTML = `
                <div class="post_info">
                    <div class="post_main">
                        <div class="slider-announcement-preview"></div>
                        <div class="post_text">
                            <div class="post_additional_mob">
                                <div class="post_additional_mob-category">
                                    ${this.post.category}
                                </div>
                                <div class="post_additional_mob-date">
                                    ${this.post.date}
                                </div>
                            </div>
                            <div class="postPageLink">
                                <h2 class="post_header">${this.post.title}</h2>
                                <p>${this.post.descr}</p>
                            </div>
                        </div>
                    </div>
                    <div class="post_additional"> 
                        <div class="post_additional-info">
                            <div class="post_additional-user">
                                <a href="#">
                                    <img src="img/uploadedAvatars/${this.post.userAvatar}" alt="avatarka">
                                    <p class="post_username">${this.post.userName}</p>
                                </a>
                            </div>
                            <div class="post_additional-details">
                                <ul>
                                    <li class="js-post-category"><span>Категория:</span> ${this.post.category}</li>
                                    <li class="js-post-sphere"><span>Сфера:</span> ${this.post.sphere}</li>
                                    <li class="js-post-experience"><span>Опыт работы:</span> ${this.post.experience}</li>
                                    <li class="js-post-schedule"><span>График:</span> ${this.post.schedule}</li>
                                </ul>
                            </div>
                            <div class="post_additional-date">
                                <p><span>Размещено:</span> ${this.post.date}</p>
                            </div>
                        </div>
                        <div class="post_additional-contacts">
                            <div class="post_additional-price">
                                <p>${this.post.price}</p><span class="valuta" style="display: none;">₽</span>
                            </div>
                            <div class="post_additional-buttons">
                                <div class="post_additional-contactBtns">
                                    <div class="button_disabled" style="width: 100%; margin: 20px 0;">Открыть чат</div>
                                    <div class="button_default">Позвонить</div>
                                </div>
                            <div class="button_default-reversed">
                                <span class="symbol-left"><i class="fa-solid fa-heart"></i></span> Добавить в избранное
                            </div>
                        </div>
                    </div>
                </div>    
        `
            let postTitle = document.querySelector('.post_text h2'),
                postDescr = document.querySelector('.post_text p'),
                postCategory = document.querySelector('.js-post-category span'),
                postValute = document.querySelector('.valuta'),
                postWorkSphere = document.querySelector('.js-post-sphere'),
                postWorkExperience = document.querySelector('.js-post-experience'),
                postWorkSchedule = document.querySelector('.js-post-schedule'),
                postPreviewPrice = document.querySelector('.post_additional-price p'),
                sliderPrewiewBlock = document.querySelector('.slider-announcement-preview'),
                sliderPrewiew = new Slider(sliderPrewiewBlock, '--slider-createAnnouncement-width', '--slider-createAnnouncement-height', '--container-width', this.post.clientSideImgs);
                sliderPrewiew.init();

            if(this.post.title == '' && postTitle) {
                postTitle.innerHTML = 'Здесь будет заголовок Вашего объявления.';
            }
            if(this.post.descr == '' && postDescr) {
                postDescr.innerHTML = 'Здесь будет описание Вашего объявления.';
            }

            if(this.post.price != '' && postValute) {
                postValute.style.cssText = `
                display: block;
                margin-left: 5px;
                `;
            }

            if(this.post.category == '' && postCategory) postCategory.style.display = 'none';
            
            if(this.post.sphere == '' && postWorkSphere) postWorkSphere.style.display = 'none';

            if(this.post.experience == '' && postWorkExperience) postWorkExperience.style.display = 'none';
            
            if(this.post.schedule == '' && postWorkSchedule) postWorkSchedule.style.display = 'none';
                
            if (this.post.price == '0') {
                postPreviewPrice.innerHTML = 'Бесплатно';
                postValute.innerHTML = '';
            } else if (this.post.price == '') {
                postPreviewPrice.style.cssText = "font-size: 25px;"
                postPreviewPrice.innerHTML = 'Сумма не указана';
            }
        } 
        else {
            let infoMessageCategory = new PopupMessage('#f7b31c', '#f9ea82', 'Сначала выберите категорию объявления');

            if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
            infoMessageCategory.init();
        }
    }

    structurePanel() {
        let categoryButton = document.querySelector('.js-structure-category'),
        mainButton = document.querySelector('.js-structure-main'),
        imagesButton = document.querySelector('.js-structure-images'),
        previewButton = document.querySelector('.js-structure-preview');

        categoryButton.addEventListener('click', () => {
            this.renderCategory();
            this.panelActiveSectionHandler(categoryButton);
        });
        mainButton.addEventListener('click', () => {
            this.renderMainInformation();
            this.panelActiveSectionHandler(mainButton);
        });
        imagesButton.addEventListener('click', () => {
            this.renderImageLoader();
            this.panelActiveSectionHandler(imagesButton);
        });
        previewButton.addEventListener('click', () => {
            this.renderPreview();
            this.panelActiveSectionHandler(previewButton);
        })
    }

    panelActiveSectionHandler(section) {
        let activeSection = document.querySelector('.activePanelSection');
        if(this.post.category != 0) {
            if (activeSection) {
                activeSection.classList.remove('activePanelSection')
                section.classList.add('activePanelSection'); 
            } else {
                section.classList.add('activePanelSection');
            }
        }
        
    }

    postDateHandler() {
        let postDate,
        today = new Date(),
        postDay = today.getDate(),
        postMonth = today.getMonth() + 1,
        postYear = today.getFullYear();

        if(postMonth < 10) postMonth = '0' + `${postMonth}`;
        if(postDay < 10) postDay = '0' + `${postDay}`;

        postDate = `${postDay}.${postMonth}.${postYear}`
        return postDate;
    }

    postTimeHandler() {
        let postTime,
        today = new Date(),
        hours = today.getHours(),
        minutes = today.getMinutes();

        postTime = `${hours}:${minutes}`;
        return postTime;
    }

    newPostInit() {
        let post = this.post;

        let postTitleField = document.querySelector('.js-post-title'),
        postDescrField = document.querySelector('.js-post-descr'),
        postPriceField = document.querySelector('.js-post-price');

        let userid = document.querySelector('.user_name').getAttribute('data-userid');
        getUser(userid)
        .then(user => {
            post.userid = userid;
            post.userName = user.nickname;
            post.userAvatar = user.avatar;
            post.userPhone = user.phone;
            post.userRating = user.rating;
            post.date = this.postDateHandler();
            post.time = this.postTimeHandler();

            // console.log(post.userName)
        })

        if (postTitleField) {
            postTitleField.addEventListener('input', () => {
                post.title = postTitleField.value;
            })
        }
        if(postDescrField) {
            postDescrField.addEventListener('input', () => {
                post.descr = postDescrField.value;
            })
        }
        if(postPriceField) {
            postPriceField.addEventListener('input', () => {
                post.price = postPriceField.value;
            })
        }
    }

    sendPostPHP() {
        let postCreatingContainer = document.querySelector('.post_creating_container'),
        postCreatingPanel = document.querySelector('.post_creating-panel');

        let sendButtons = document.querySelectorAll('.send_button');
        sendButtons.forEach(button => button.remove());
        let postPublishedSuccesfulBlock = `
        <div class="postPublishedSuccesful">
            <div class="checkmark_wrapper">
                <span class="checkmark"></span>
            </div>
            <p>Ваше объявление успешно опубликовано!</p>
            <a href="index.php">Вернуться на главную</a>
        <div>
        ` 
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/sendPost.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                postCreatingPanel.remove();
                postCreatingContainer.innerHTML = postPublishedSuccesfulBlock;
            }
        }
        this.uploadImagesToTheServer();
        xhr.send(JSON.stringify(this.post))
    }

    sendButtonFunctionality(){
        let infoMessageCategory = new PopupMessage('#f7b31c', '#f9ea82', 'Сначала выберите категорию объявления'),
        infoMessageTitle = new PopupMessage('#f7b31c', '#f9ea82', 'Длина названия должна быть не меньше 15 символов'),
        infoMessageDescr = new PopupMessage('#f7b31c', '#f9ea82', 'Длина описания должна быть не меньше 75 символов'),
        infoMessagePrice = new PopupMessage('#f7b31c', '#f9ea82', 'Цена должна быть указана'),
        infoMessageImages = new PopupMessage('#f7b31c', '#f9ea82', 'Должно быть загружено не менее одного изображения');
        let sendButtons = document.querySelectorAll('.send_button');
        sendButtons.forEach(button => button.addEventListener('click', () => {
            if(this.post.category != "" && this.post.title.length > 7 && this.post.descr.length > 25 && this.post.price != '') {
                if (this.post.clientSideImgs.length > 0) {
                    this.sendPostPHP();
                } else {
                    if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                    infoMessageImages.init();
                }
            } else if(this.post.category == '') {
                if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                infoMessageCategory.init();
            } else if(this.post.title.length < 7 || this.post.title == '') {
                if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                infoMessageTitle.init();
            } else if(this.post.descr.length < 25 || this.post.descr == '') {
                if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                infoMessageDescr.init();
            } else if(this.post.price == '') {
                if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                infoMessagePrice.init();
            }
        }))

        setInterval(() => {
            if(this.post.category != "" && this.post.title.length > 7 && this.post.descr.length > 25 && this.post.price != '') {
                if (this.post.clientSideImgs.length > 0) {
                    sendButtons.forEach(button => button.classList.remove('button_disabled'));
                    sendButtons.forEach(button => button.classList.add('button_default'));
                } 
            } else {
                sendButtons.forEach(button => button.classList.remove('button_default'));
                sendButtons.forEach(button => button.classList.add('button_disabled'));
            }
        }, 100)
    }

    init() {
        this.structurePanel();
        this.imageLoaderFunctionality();
        this.sendButtonFunctionality();
    }
}

const postCreatingPage = new NewPostPage(),
postCreatingBlock = document.querySelector('.post_creating_container');

if(postCreatingBlock) {
    postCreatingPage.init()
}

let postsRenderContainer = document.querySelector('.renderedPosts'),
noPostsPlaceholder = document.querySelector('.no_posts');

let mobilePostCategoriesOpener = document.querySelector('.categories_opener');
let mobilePostFiltersOpener = document.querySelector('.filter_opener');

if(mobilePostCategoriesOpener && mobilePostFiltersOpener) {
    let filtersBlock = document.querySelector('.filters');
    let categoriesBlock = document.querySelector('.categories_mob-container');

    mobilePostCategoriesOpener.addEventListener('click', () => {
        if(filtersBlock.classList.contains('filters_visible')) filtersBlock.classList.toggle('filters_visible');
        categoriesBlock.classList.toggle('categories_mob-visible');
    })
    mobilePostFiltersOpener.addEventListener('click', () => {
        if(categoriesBlock.classList.contains('categories_mob-visible')) categoriesBlock.classList.toggle('categories_mob-visible');
        filtersBlock.classList.toggle('filters_visible');
    })
}

class PostsStorage {
    constructor() {
        this.posts = []
        this.drafts = []
    }

    postTemplate(post) {
        let postTemplate = `
                    <div class="post_info">
                        <div class="post_main">
                            <div class="slider-announcement slid-ann-${post.id}"></div>
                            <div class="post_text">
                                <div class="post_additional_mob">
                                    <div class="post_additional_mob-category">
                                        ${post.category}
                                    </div>
                                    <div class="post_additional_mob-date">
                                        ${post.date}
                                    </div>
                                </div>
                                <a class="postPageLink" href="post-page.php?id=${post.id}">
                                    <h2 class="post_header">${post.title}</h2>
                                    <p>${post.descr}</p>
                                </a>
                            </div>
                        </div>
                        <div class="post_additional"> 
                            <div class="post_additional-info">
                                <div class="post_additional-user">
                                    <a href="account-page.php?id=${post.user_id}">
                                        <img src="img/uploadedAvatars/${post.user_avatar}" alt="avatarka">
                                        <p class="post_username">${post.user_name}</p>
                                    </a>
                                </div>
                                <div class="post_additional-details">
                                    <ul>
                                        <li class="js-post-additional-category"><span>Категория:</span> ${post.category}</li>
                                        <li class="js-post-additional-sphere"><span>Сфера:</span> ${post.sphere}</li>
                                        <li class="js-post-additional-experience"><span>Опыт работы:</span> ${post.experience}</li>
                                        <li class="js-post-additional-schedule"><span>График:</span> ${post.schedule}</li>
                                    </ul>
                                </div>
                                <div class="post_additional-date">
                                    <p><span>Размещено:</span class="js-post-date"> ${post.date}</p>
                                </div>
                            </div>
                            <div class="post_additional-contacts">
                                <div class="post_additional-price">
                                    <span class="js-post-price">${post.price}</span><span class="valuta">₽</span>
                                </div>
                                <div class="post_additional-buttons">
                                    <div class="post_additional-contactBtns">
                                        <div class="button_disabled" style="width: 100%; margin: 20px 0;">Открыть чат</div>
                                        <a href="tel:+7${post.user_phone}" class="button_default">Позвонить</a>
                                    </div>
                            </div>
                        </div>
                    </div>   
    `
        return postTemplate;
    }

    getPostsPHP() {
        return new Promise((resolve, reject) => {

            let preloaderContainer = document.querySelector('.postsPreloader_container');
            preloaderContainer.innerHTML = `
                <div id="preloader" class="postsLoader_wrapper">
                    <div class="loader"></div>
                </div>
            `;

            let xhr = new XMLHttpRequest();
            xhr.open('GET', `php/getPosts.php`, true);
        
            xhr.onload = function() {
                if (xhr.status === 200) {
                    let posts = JSON.parse(xhr.responseText);
                    resolve(posts);
                } else {
                    reject(xhr.statusText);
                }
            }

            xhr.onerror = function() {
                console.log('Ошибка загрузки постов')
            }

            xhr.send();
        })
    }

    renderPosts() {
        postsStorage.getPostsPHP()
        .then(posts => {
            let preloaderContainer = document.querySelector('.postsPreloader_container');
            setTimeout(() => preloaderContainer.innerHTML = '', 500);

            let urlParams = new URLSearchParams(window.location.search),
            postedSetting = urlParams.has('postedBy'),
            postedSettingValue = urlParams.get('postedBy'),
            categorySetting = urlParams.has('category'),
            categorySettingValue = urlParams.get('category'); 

            let postFilterPriceMin = urlParams.has('priceMin');
            let postFilterPriceMax = urlParams.has('priceMax');
            let postFilterPriceMinValue = urlParams.get('priceMin');
            let postFilterPriceMaxValue = urlParams.get('priceMax');

            let postSearch = urlParams.has('searchPost');
            let postSearchValue = urlParams.get('searchPost');

            let filteredPosts = [];
            let currentDateFormated = postCreatingPage.postDateHandler();
            if (postedSetting && postedSettingValue == 'postsToday') {
                filteredPosts = posts.filter(post => post.date == currentDateFormated);
                posts = filteredPosts;
            }
            if (postedSetting && postedSettingValue == 'postsWeek') {
                let currentDate = new Date();
                let weekAgoDate = new Date();

                weekAgoDate.setDate(currentDate.getDate() - 7);

                filteredPosts = posts.filter(post => {
                    let formatedPostDate = new Date(post.date.split('.').reverse().join('-'));
                    return formatedPostDate >= weekAgoDate && formatedPostDate <= currentDate;
                });
                posts = filteredPosts;
            }

            if(postFilterPriceMin  && !postFilterPriceMax) {
                posts = posts.filter(post => Number(post.price) >= Number(postFilterPriceMinValue));
            } else if(postFilterPriceMax  && !postFilterPriceMin) {
                posts = posts.filter(post => Number(post.price) <= Number(postFilterPriceMaxValue));
            } else if (postFilterPriceMax  && postFilterPriceMin) {
                posts = posts.filter(post => Number(postFilterPriceMinValue) <= Number(post.price) && Number(post.price) <= Number(postFilterPriceMaxValue));
            }

            if (categorySetting) {
                if(categorySettingValue == 'findJob') {
                    posts = posts.filter(post => post.category == 'Поиск работы');
                } else if (categorySettingValue == 'findEmployer') {
                    posts = posts.filter(post => post.category == 'Поиск сотрудника');
                } else if (categorySettingValue == 'etc') {
                    posts = posts.filter(post => post.category == 'Вещи, электроника и пр.');
                }
            }

            if(postSearch) {
                posts = posts.filter(post => post.title.toLowerCase().includes(postSearchValue.toLowerCase()));
            }

            // posts = posts.sort((a, b) => {
            //     let dateA = new Date(a.date.split('.').reverse().join('-'));
            //     let dateB = new Date(b.date.split('.').reverse().join('-'));
            //     return dateB - dateA;
            // })

            posts = posts.sort((a, b) => {
                let dateA = a.date.split('.').reverse().join('');
                let timeA = a.time.split(':').join('');
                let dateB = b.date.split('.').reverse().join('');
                let timeB = b.time.split(':').join('');

                if (dateA === dateB) {
                    return timeA.localeCompare(timeB);
                } else {
                    return dateA.localeCompare(dateB);
                }
            }).reverse();

            if (posts.length > 0) {

                postsRenderContainer.innerHTML = '';

                posts.forEach(post => {
                    let postBlock = document.createElement('div');
                    postBlock.innerHTML = postsStorage.postTemplate(post);
                    postsRenderContainer.appendChild(postBlock);
                    postBlock.className = `post post-id${post.id}`;
        
                    let postSphere = document.querySelector(`.post-id${post.id} .js-post-additional-sphere`),
                    postExperience = document.querySelector(`.post-id${post.id} .js-post-additional-experience`),
                    postSchedule = document.querySelector(`.post-id${post.id} .js-post-additional-schedule`),
                    postPrice = document.querySelector(`.post-id${post.id} .js-post-price p`),
                    postDate = document.querySelector('.js-post-date');
        
                    let today = new Date(),
                    todayString = `${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`,
                    yesterdayString = `${today.getDate() - 1}.${today.getMonth()}.${today.getFullYear()}`;
        
                    if(post.date == todayString) postDate.innerHTML = "Сегодня";
                    if(post.date == yesterdayString) postDate.innerHTML = "Вчера"
                    
                    if(post.sphere == '') postSphere.style.display = 'none'; 
                    if(post.experience == '') postExperience.style.display = 'none'; 
                    if(post.schedule == '') postSchedule.style.display = 'none'; 
                    if(postPrice && post.price == 0) postPrice.innerHTML = 'Бесплатно'; 
                    
                    let sliderBlock = document.querySelector(`.slid-ann-${post.id}`)
                    const sliderAnnouncement = new Slider(sliderBlock, '--slider-announcement-width', '--slider-announcement-height', '--container-width', undefined, post.id);
                    sliderAnnouncement.init()
                })
            } else {
                postsRenderContainer.innerHTML = `
                <div class="no_posts">
                    <div>
                        <span>Здесь ещё нет публикаций</span>
                    </div>
                </div>
                `
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}

const postsStorage = new PostsStorage();

class editPostPage {
    constructor() {
        this.post = postCreatingPage.post;
    }

    saveEditedPost() {
        let postEditingContainer = document.querySelector('.editPost_container'),
        postPublishedSuccesfulBlock = `
        <div class="postPublishedSuccesful">
            <div class="checkmark_wrapper">
                <span class="checkmark"></span>
            </div>
            <p>Изменения успешно внесены!</p>
            <a href="index.php">Вернуться на главную</a>
            <a style="margin-top: 15px;" href="post-page.php?id=${this.post.id}">Вернуться к объявлению</a>
        <div>
        ` 
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/saveEditedPost.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                postEditingContainer.innerHTML = postPublishedSuccesfulBlock;
            }
        }
        this.uploadUpdatedImagesToTheServer();
        xhr.send(JSON.stringify(this.post));

        console.log(this.post)
    }

    imageReloadFunctionality() {
        let imageLoaders = document.querySelectorAll('.imageLoad_button');
        imageLoaders.forEach(loader => {
            let imageLoaderInput = loader.querySelector('input');

            let imageTools = loader.querySelector(`.imageLoad_tools`);
            let innerImage = loader.querySelector(`img`);
            let imageProperty = `image${parseInt(imageLoaderInput.id.slice(-1))}`;

            let removeImageButton = loader.querySelector(`.js-removeImage-btn`);
                removeImageButton.addEventListener('click', () => {
                    imageTools.style.display = "none";
                    imageLoaderInput.value = null;
                    innerImage.src = '../img/photo_placeholder2.png';
                    this.post[imageProperty] = '';
                });

            loader.onchange = () => {
                let file = imageLoaderInput.files[0];
                let reader = new FileReader();

                imageTools.style.display = 'flex';

                reader.onload = (e) => {
                    innerImage.src = e.target.result;
                };
                
                console.log(this.post[imageProperty]);
                reader.readAsDataURL(file);
            }
        })
    }

    uploadUpdatedImagesToTheServer() {
        let imageLoaders = document.querySelectorAll('.imageLoad_button input');
        imageLoaders.forEach(loader => {
            if(loader.files.length != 0) {
                let file = loader.files[0],
                formData = new FormData();

                let imageProperty = `image${parseInt(loader.id.slice(-1))}`;

                let modifiedFileName = `postImage_${Math.random() * 13}-${loader.id.match(/\d+/g)}`; 
                modifiedFileName = modifiedFileName.split('.').join('');
                let lastIndex = file.name.lastIndexOf("."); 
                let extension = file.name.substring(lastIndex);
                let newFileName = modifiedFileName + extension;
                file = new File([file], newFileName, { type: file.type });

                this.post[imageProperty] = `img/uploadedPostImages/${file.name}`;

                formData.append('image', file);

                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'php/uploadImage.php', true);
                xhr.onload = function () {
                    if(xhr.status === 200) {
                        console.log('Фотка успешно загружена' + file.name);
                    } else  {
                        console.log('При загрузке фото4ки произошла ошибка')
                    }
                }
                xhr.send(formData);
            }
        })
    }

    replaceEmptyLoaders() {
        let imageLoaders = document.querySelectorAll('.imageLoad_button');
        let fifthImageLoader = document.querySelector('.js-imageLoader5 img');
        let secondImagesRow = document.querySelector('.imageLoad_secondImagesRow');

        imageLoaders.forEach(loader => {
            let loaderInnerImage = loader.querySelector('img');
            let loaderImageTools = loader.querySelector('.imageLoad_tools');
            let removeImageButton = loader.querySelector(`.js-removeImage-btn`);
            
            if(loaderInnerImage.src.includes('/edit-post')) {
                loaderInnerImage.src = '../img/service/photo_placeholder2.png';
            } else {
                loaderImageTools.style.display = 'flex';
                removeImageButton.addEventListener('click', () => {
                    loaderImageTools.style.display = "none";
                    loader.value = null;
                    loaderInnerImage.src = '../img/photo_placeholder2.png';
                });
            }
        })
        if(fifthImageLoader.src != '../img/service/photo_placeholder2.png') {
            secondImagesRow.style.display = "flex";
        }
    }

    fillClientSidePost() {
        this.post = JSON.parse(document.querySelector('.js-JSONPost').getAttribute('data-post'));

        let categoryMenu = document.querySelector('.js-editPost-category');
        let sphereMenu = document.querySelector('.js-editPost-sphere');
        let experienceMenu = document.querySelector('.js-editPost-experience');
        let scheduleMenu = document.querySelector('.js-editPost-schedule');

        if (this.post.category != '') {
            categoryMenu.querySelector('span').innerText = this.post.category;
            categoryMenu.querySelector('span').style.color = '#000'
        }
        if (this.post.sphere != '') {
            sphereMenu.querySelector('span').innerText = this.post.sphere;
            sphereMenu.querySelector('span').style.color = '#000'
        }
        if (this.post.experience != '') {
            experienceMenu.querySelector('span').innerText = this.post.experience;
            experienceMenu.querySelector('span').style.color = '#000'
        }
        if (this.post.schedule != '') {
            scheduleMenu.querySelector('span').innerText = this.post.schedule;
            scheduleMenu.querySelector('span').style.color = '#000'
        }
    }

    fieldsRenderHandler() {
        let sphereMenuEl = document.querySelector('.js-postEditDropdown_sphere');
        let experienceMenuEl = document.querySelector('.js-postEditDropdown_experience');
        let scheduleMenuEl = document.querySelector('.js-postEditDropdown_schedule');

        if(this.post.category == 'Вещи, электроника и пр.') {
            sphereMenuEl.style.display = 'none'
            experienceMenuEl.style.display = 'none'
            scheduleMenuEl.style.display = 'none'
        }
    }

    saveButtonFunctionality() {
        let infoMessageCategory = new PopupMessage('#f7b31c', '#f9ea82', 'Сначала выберите категорию объявления'),
        infoMessageTitle = new PopupMessage('#f7b31c', '#f9ea82', 'Длина названия должна быть не меньше 15 символов'),
        infoMessageDescr = new PopupMessage('#f7b31c', '#f9ea82', 'Длина описания должна быть не меньше 75 символов'),
        infoMessagePrice = new PopupMessage('#f7b31c', '#f9ea82', 'Цена должна быть указана'),
        infoMessageImages = new PopupMessage('#f7b31c', '#f9ea82', 'Должно быть загружено не менее одного изображения');
        let sendButton = document.querySelector('.savePostChanges');
        sendButton.addEventListener('click', () => {
            if(this.post.category != "" && this.post.title.length > 7 && this.post.descr.length > 25 && this.post.price != '') {
                if (this.post.image0 !== "" || this.post.image1 !== "" || this.post.image2 !== "" || this.post.image3 !== "" || this.post.image4 !== "" || this.post.image5 !== "" || this.post.image6 !== "" || this.post.image7 !== "" || this.post.image8 !== "" || this.post.image9 !== "") {
                    this.saveEditedPost();
                } else {
                    if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                    infoMessageImages.init();
                }
            } else if(this.post.category == '') {
                if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                infoMessageCategory.init();
            } else if(this.post.title.length < 7 || this.post.title == '') {
                if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                infoMessageTitle.init();
            } else if(this.post.descr.length < 25 || this.post.descr == '') {
                if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                infoMessageDescr.init();
            } else if(this.post.price == '') {
                if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                infoMessagePrice.init();
            }
        });
    }

    initEditFields() {
        let titleEditField = document.querySelector('.editPost_title');
        let descrEditField = document.querySelector('.editPost_descr');
        let priceEditField = document.querySelector('.editPost_price');

        titleEditField.addEventListener('input', () => {
            this.post.title = titleEditField.value;
        })
        descrEditField.addEventListener('input', () => {
            this.post.descr = descrEditField.value;
        })
        priceEditField.addEventListener('input', () => {
            this.post.price = priceEditField.value;
        })

        let categoryMenu = new DropdownMenu('js-editPost-category', this.post, 'category', postCreatingPage.categories);
        let sphereMenu = new DropdownMenu('js-editPost-sphere', this.post, 'sphere', postCreatingPage.spheres);
        let experienceMenu = new DropdownMenu('js-editPost-experience', this.post, 'experience', postCreatingPage.experience);
        let scheduleMenu = new DropdownMenu('js-editPost-schedule', this.post, 'schedule', postCreatingPage.schedule);
        categoryMenu.init();
        sphereMenu.init();
        experienceMenu.init();
        scheduleMenu.init();

        let categoryMenuEl = document.querySelector('.js-postEditDropdown_category');

        let categoryMenuSections = categoryMenuEl.querySelectorAll('.dropdown_item');
        categoryMenuSections.forEach(section => {
            section.addEventListener('click', () => {
                this.fieldsRenderHandler();
            })
        })
    }

    init() {
        this.fillClientSidePost();
        this.initEditFields();
        this.replaceEmptyLoaders();
        this.imageReloadFunctionality();
        this.fieldsRenderHandler();
        this.saveButtonFunctionality();

        console.log(this.post)
    }
}

const editPost = new editPostPage();

let postEditContainer = document.querySelector('.editPost_container');
if(postEditContainer) {
    editPost.init();
}

let todayPostsCheckbox = document.querySelector('.js-checkbox-todayPosts');
let weekPostsCheckbox = document.querySelector('.js-checkbox-weekPosts');
let allTimePostsCheckbox = document.querySelector('.js-checkbox-allTimePosts');


if (todayPostsCheckbox && weekPostsCheckbox && allTimePostsCheckbox) {

    if (localStorage.length == 0)  allTimePostsCheckbox.checked = true;

    if (localStorage.getItem('todayPostsChecked') === 'true') {
            todayPostsCheckbox.checked = true;
    } else if (localStorage.getItem('weekPostsChecked') === 'true') {
            weekPostsCheckbox.checked = true;
    }
    
    todayPostsCheckbox.addEventListener('change', () => {
        if(todayPostsCheckbox.checked) {
            let searchParams = new URLSearchParams(location.search);
            searchParams.set('postedBy', 'postsToday');
            window.history.replaceState(null, null, '?' + searchParams.toString());
            localStorage.setItem('todayPostsChecked', 'true');

            weekPostsCheckbox.checked = false;
            allTimePostsCheckbox.checked = false;
            localStorage.removeItem('weekPostsChecked');
        } else {
            let searchParams = new URLSearchParams(location.search);
            searchParams.delete('postedBy');
            todayPostsCheckbox.checked = true;
        }
        postsStorage.renderPosts();
    })

    weekPostsCheckbox.addEventListener('change', () => {
        if(weekPostsCheckbox.checked) {
            let searchParams = new URLSearchParams(location.search);
            searchParams.set('postedBy', 'postsWeek');
            window.history.replaceState(null, null, '?' + searchParams.toString());
            localStorage.setItem('weekPostsChecked', 'true');

            todayPostsCheckbox.checked = false;
            allTimePostsCheckbox.checked = false;
            localStorage.removeItem('todayPostsChecked');
        } else {
            let searchParams = new URLSearchParams(location.search);
            searchParams.delete('postedBy');
            weekPostsCheckbox.checked = true;
        }
        postsStorage.renderPosts();
    })

    allTimePostsCheckbox.addEventListener('change', () => {
        if(allTimePostsCheckbox.checked) {
            let searchParams = new URLSearchParams(location.search);
            searchParams.delete('postedBy');
            window.history.replaceState(null, null, '?' + searchParams.toString());
            
            weekPostsCheckbox.checked = false;
            todayPostsCheckbox.checked = false;
            localStorage.removeItem('weekPostsChecked');
            localStorage.removeItem('todayPostsChecked');
        } else {
            allTimePostsCheckbox.checked = true;
        }
        postsStorage.renderPosts();
    })
}

let minPrice = document.querySelector('.price_min input');
let maxPrice = document.querySelector('.price_max input');

if(minPrice && maxPrice) {
    let urlParams = new URLSearchParams(location.search);
    if (urlParams.get('priceMin')) minPrice.value = urlParams.get('priceMin');
    if (urlParams.get('priceMax')) maxPrice.value = urlParams.get('priceMax');

    minPrice.addEventListener('input', () => {
        if (minPrice.value.length != 0) {
            let searchParams = new URLSearchParams(location.search);
            searchParams.set('priceMin', minPrice.value);
            if (maxPrice.value.length != 0) {
                searchParams.set('priceMax', maxPrice.value);
            } else  {
                searchParams.delete('priceMax');
            }
            window.history.replaceState(null, null, '?' + searchParams.toString());
        } else {
            let searchParams = new URLSearchParams(location.search);
            searchParams.delete('priceMin');
            window.history.replaceState(null, null, '?' + searchParams.toString());
        }
        postsStorage.renderPosts();
    })

    maxPrice.addEventListener('input', () => {
        if (maxPrice.value.length != 0) {
            let searchParams = new URLSearchParams(location.search);
            searchParams.set('priceMax', maxPrice.value);
            if (minPrice.value.length != 0) {
                searchParams.set('priceMin', minPrice.value);
            } else  {
                searchParams.delete('priceMin');
            }
            window.history.replaceState(null, null, '?' + searchParams.toString());
        } else {
            let searchParams = new URLSearchParams(location.search);
            searchParams.delete('priceMax');
            window.history.replaceState(null, null, '?' + searchParams.toString());
        }
        postsStorage.renderPosts();
    })
}

if(document.querySelector('.categories') && window.innerWidth <= 768) {
    document.querySelector('.categories').remove();
}

let allCategoriesButton = document.querySelector('.js-allCategoriesBtn');
let findJobButton = document.querySelector('.js-findJobBtn');
let findEmployerButton = document.querySelector('.js-findEmployerBtn');
let etcButton = document.querySelector('.js-etcBtn');

if(allCategoriesButton && findJobButton && findEmployerButton && etcButton) {

    allCategoriesButton.addEventListener('click', () => {
        let searchParams = new URLSearchParams(location.search);
        searchParams.delete('category');
        window.history.replaceState(null, null, '?' + searchParams.toString());

        document.querySelector('.button_underlined-active').classList.remove('button_underlined-active');
        allCategoriesButton.classList.add('button_underlined-active');

        postsStorage.renderPosts();
    });
    
    findJobButton.addEventListener('click', () => {
        let searchParams = new URLSearchParams(location.search);
        searchParams.set('category', 'findJob');
        window.history.replaceState(null, null, '?' + searchParams.toString());

        document.querySelector('.button_underlined-active').classList.remove('button_underlined-active');
        findJobButton.classList.add('button_underlined-active');

        postsStorage.renderPosts();
    });

    findEmployerButton.addEventListener('click', () => {
        let searchParams = new URLSearchParams(location.search);
        searchParams.set('category', 'findEmployer');
        window.history.replaceState(null, null, '?' + searchParams.toString());

        document.querySelector('.button_underlined-active').classList.remove('button_underlined-active');
        findEmployerButton.classList.add('button_underlined-active');

        postsStorage.renderPosts();
    });

    etcButton.addEventListener('click', () => {
        let searchParams = new URLSearchParams(location.search);
        searchParams.set('category', 'etc');
        window.history.replaceState(null, null, '?' + searchParams.toString());

        document.querySelector('.button_underlined-active').classList.remove('button_underlined-active');
        etcButton.classList.add('button_underlined-active');

        postsStorage.renderPosts();
    });
}

let urlParams = new URLSearchParams(location.search),
categorySetting = urlParams.has('category'),
categorySettingValue = urlParams.get('category'); 

if (categorySetting) {
    if(categorySettingValue == 'findJob') {
        document.querySelector('.button_underlined-active').classList.remove('button_underlined-active');
        findJobButton.classList.add('button_underlined-active');
    } else if (categorySettingValue == 'findEmployer') {
        document.querySelector('.button_underlined-active').classList.remove('button_underlined-active');
        findEmployerButton.classList.add('button_underlined-active');
    } else if (categorySettingValue == 'etc') {
        document.querySelector('.button_underlined-active').classList.remove('button_underlined-active');
        etcButton.classList.add('button_underlined-active');
    }
}

class Account {
    constructor(userId) {
        this.userId = userId;
        this.review = {
            userId: '',
            authorId: '',
            authorName: '',
            authorAvatar: '',
            grade: '',
            date: '',
            title: '',
            text: ''
        }
    }

    getUserPosts() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `php/getUserPosts.php?userId=${this.userId}`, true);
            xhr.onload = function() {
                if(xhr.status === 200) {
                    let userPosts = JSON.parse(xhr.responseText);
                    resolve(userPosts);
                } else {
                    reject(xhr.statusText);
                }
            }

            xhr.onerror = function() {
                console.log(`Ошибка загрузки постов пользователя с id=${this.userId}`);
            }

            xhr.send();
        })
    }

    renderUserPosts() {
        this.getUserPosts()
        .then(userPosts => {
            let userPostsContainer = document.querySelector('.userPosts_container');
            if(userPosts.length != 0) {
                userPosts.forEach(post => {
                    let postBlock = document.createElement('div');
                    postBlock.classList.add('accountPagePost');
                    postBlock.innerHTML = `
                    <div class="slider-userPost-${post.id}"></div>
                    <div class="post_additional_mob-category">${post.category}</div>
                    <a href="post-page.php?id=${post.id}">
                        <div class="accountPagePost_title">${post.title}</div>
                        <div class="accountPagePost_descr">${post.descr}</div>
                    </a>
                    `;
                    userPostsContainer.appendChild(postBlock);

                    let sliderUserPostBlock = document.querySelector(`.slider-userPost-${post.id}`);
                    const sliderUserPost = new Slider(sliderUserPostBlock, '--slider-accountPage-width', '--slider-accountPage-height', '--container-width', undefined, post.id);
                    sliderUserPost.init();
                })
            } else {
                userPostsContainer.innerHTML = `
                <div class="no_posts">
                    <span>Этот пользователь ещё ничего не опубликовал</span>
                </div>
                `
            }
        })    
    }

    phoneFormat() {
        let phoneNumberBlock = document.querySelector('.js-phone-number');
        let phoneNumber = phoneNumberBlock.innerText;
        phoneNumberBlock.innerHTML = `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,8)}-${phoneNumber.slice(8)}`;
    }

    ratingStyle() {
       let ratingValue = document.querySelector('.accountPageRating').dataset.totalValue;
        let ratingNumber = document.querySelector('.ratingGrade span');

        if(ratingValue > 0) {
            ratingNumber.style.color = 'var(--feature-color)'
        } else {
            ratingNumber.style.color = 'var(--light-grey)'
        }
    }

    uploadAvatar() {
        let yourUser = document.querySelector('.user_name');

        if (yourUser) {
            let yourId = yourUser.dataset.userid;

            if (yourId == this.userId) {
                let fileInput = document.querySelector('.avatarLoader_button input');     
                let previewImage = document.querySelector('.avatarLoader_button img');
    
                fileInput.onchange = () => {
                    let file = fileInput.files[0];
                    let reader = new FileReader();
                    
                    reader.onload = (e) => {
                        previewImage.src = e.target.result;
    
                        if(fileInput.files.length != 0) {
                            let file = fileInput.files[0],
                            formData = new FormData();
                            formData.append('image', file);
    
                            let modifiedFileName = `avatar${Math.floor(Math.random() * 100000)}`; 
                            modifiedFileName = modifiedFileName.split('.').join('');
                            let lastIndex = file.name.lastIndexOf("."); 
                            let extension = file.name.substring(lastIndex);
                            let newFileName = modifiedFileName + extension;
                            file = new File([file], newFileName, { type: file.type });
    
                            formData.append('image', file);
                    
                            let xhr = new XMLHttpRequest();
                            xhr.open('POST', `php/uploadAvatar.php?id=${this.userId}`, true);
                            xhr.onload = function () {
                                if(xhr.status === 200) {
                                    console.log('Файл успешно загружен');
                                    location.reload(true);
                                } else  {
                                    console.log('При загрузке файла произошла ошибка')
                                }
                            }
                            formData.append('id', this.userId);
                            xhr.send(formData);
                        }
                    }    
                        
                    reader.readAsDataURL(file);
                }
            }
        }
    }

    getReviews() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `php/getReviews.php?userId=${this.userId}`, true);
            xhr.onload = function() {
                if (xhr.status == 200) {
                    let reviews = JSON.parse(xhr.responseText);
                    resolve(reviews);
                } else {
                    reject(xhr.responseText);
                }
            }
            xhr.onerror = function() {
                console.log('Ошибка при загрузке отзывов');
            }

            xhr.send();
        })
    }

    renderReviews() {
        this.getReviews()
        .then(reviews => {
            let reviewsContainer = document.querySelector('.userReviews_container');
            if(reviews.length > 0) {
                reviews.forEach(review => {
                    let reviewBlock = document.createElement('div');
                    reviewBlock.classList.add('reviewByAnotherUser');
                    reviewBlock.classList.add(`review${review.id}`);
                    reviewBlock.innerHTML = `
                        <a class="reviewUserLink" href="account-page.php?id=${review.author_id}">
                            <div class="reviewByAnotherUser_authorInfo">
                                <img src="img/uploadedAvatars/${review.author_avatar}" alt="avatar${review.author_id}">
                                <p class="reviewByAnotherUser_username">${review.author_name}</p>
                            </div>
                        </a>    
                        <div class="reviewByAnotherUser_textContent">
                            <div class="reviewByAnotherUser_textContent-top">
                                <p class="reviewByAnotherUser_title">${review.review_title}</p>
                                <div class="reviewByAnotherUser_ratingGrade js-gradeByAnotherUser">
                                    <span class="ratingGradeNumber">${review.grade}</span>
                                    <div class="rating_stars" data-total-value="${review.grade}">
                                        <div class="rating_star" data-item-value="5">
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                        <div class="rating_star" data-item-value="4">
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                        <div class="rating_star" data-item-value="3">
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                        <div class="rating_star" data-item-value="2">
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                        <div class="rating_star" data-item-value="1">
                                            <i class="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <pre class="reviewByAnotherUser_text">${review.review_text}</pre>
                            <p class="userReview_showFull js-showFullButton-${review.id}">Развернуть</p>
                            <p class="reviewDate">${review.date}</p>
                        </div>
                    `;
                    reviewsContainer.appendChild(reviewBlock);
                    
                    let reviewOpener = document.querySelector(`.js-showFullButton-${review.id}`);

                    let reviewText = document.querySelector(`.review${review.id} pre`);
                    let reviewLineHeight = parseInt(window.getComputedStyle(reviewText).lineHeight);
                    let reviewLinesCount = Math.ceil(reviewText.scrollHeight / reviewLineHeight);

                    if (reviewLinesCount <= 4) {
                        reviewOpener.remove();
                    }
                    reviewOpener.addEventListener('click', () => {
                        document.querySelector(`.review${review.id}`).classList.toggle('reviewByAnotherUser_opened');
                        document.querySelector(`.review${review.id} .reviewByAnotherUser_text`).classList.toggle('reviewByAnotherUser_text_opened');

                        if(reviewOpener.innerText == 'Развернуть') {
                            reviewOpener.innerText = 'Свернуть';
                        } else {
                            reviewOpener.innerText = 'Развернуть'
                        }
                    })
                });
            } else {
                reviewsContainer.innerHTML = `
                <div class="no_posts">
                    <div>
                        <span>У этого пользователя ещё нет отзывов</span>
                    </div>
                </div>
                `
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    sendReview() {
        let yourUser = document.querySelector('.user_name');
        if (yourUser) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `php/sendReview.php`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function() {
                if(XMLHttpRequest.DONE && xhr.status == 200) { 
                    location.reload(true);
                }
            }
            xhr.send(JSON.stringify(this.review));
        } else  {
            console.log('Пользователь не авторизован')
        }
    }

    initReviewFields() {
        let yourUser = document.querySelector('.user_name');
        if (yourUser) {
            let yourId = yourUser.dataset.userid;
            if (yourId != this.userId) {
                let reviewTitleField = document.querySelector('.reviewTitleInput');
                let reviewTextField = document.querySelector('.userAccountReviewTextarea');
                let ratingStars = document.querySelector('.userReview .rating_stars');
                let leaveFeedbackButton = document.querySelector('.leaveFeedbackButton');
                let sendReviewButton = document.querySelector('.sendReviewButton');
                let closeReviewForm = document.querySelector('.js-close-reviewForm');

                reviewTitleField.addEventListener('input', () => {
                    this.review.title = reviewTitleField.value;
                });
                reviewTextField.addEventListener('input', () => {
                    this.review.text = reviewTextField.value;
                });
                ratingStars.addEventListener('click', () => {
                    this.review.grade = ratingStars.dataset.totalValue;
                });

                leaveFeedbackButton.addEventListener('click', () => {
                    document.querySelector('.userReview').classList.toggle('userReview_visible');
                })

                closeReviewForm.addEventListener('click', () => {
                    document.querySelector('.userReview').classList.toggle('userReview_visible');
                });
                
                let review = this.review;
                getUser(yourId)
                .then(currentUser => {
                    review.authorId = currentUser.id;
                    review.authorAvatar = currentUser.avatar;
                    review.authorName = currentUser.nickname;
                    review.userId = this.userId;
                    review.date = postCreatingPage.postDateHandler();
                })

                sendReviewButton.addEventListener('click', () => {
                    let infoMessageTitle = new PopupMessage('#f7b31c', '#f9ea82', 'Длина заголовка должна быть от 3 до 75 символов');
                    let infoMessageText = new PopupMessage('#f7b31c', '#f9ea82', 'Длина отзыва должна быть от 10 до 500 символов');
                    let infoMessageGrade = new PopupMessage('#f7b31c', '#f9ea82', 'Нужно поставить от одной до пяти звездочек рейтинга');
                    let messageEl = document.querySelector('.animatedMessage');
                    if (this.review.title.length <= 100 && this.review.title.length >= 3 && this.review.text.length <= 500 && this.review.text.length >= 10 && this.review.grade != '') {
                        this.sendReview();
                    } else if(this.review.title.length >= 100 || this.review.title.length <= 3) {
                        if(messageEl) messageEl.remove();
                        infoMessageTitle.init();
                    } else if(this.review.text.length >= 500 || this.review.text.length <= 10) {
                        if(messageEl) messageEl.remove();
                        infoMessageText.init();
                    } else if(this.review.grade == '') {
                        if(messageEl) messageEl.remove();
                        infoMessageGrade.init();
                    }
                })
            }
        }    
    }

    init() {
        this.renderUserPosts();
        this.phoneFormat();
        this.initReviewFields();
        this.uploadAvatar();
        this.renderReviews();
        this.ratingStyle();
    }
}

let userAccountContainer = document.querySelector('.accountPage_container');
if (userAccountContainer) {
    let userId = document.querySelector('.userMain').dataset.pageUserid;
    const userAccount = new Account(userId);
    userAccount.init();
}

class AccountEditPage {
    constructor() {
        this.user = JSON.parse(document.querySelector('.profileEdit_container').dataset.userObj);
    }

    saveEditedProfile() {
        let signExistingUser = new PopupMessage('#f7b31c', '#f9ea82', 'Отображаемое имя занят другим пользователем');
        let signExistingUserEmail = new PopupMessage('#f7b31c', '#f9ea82', 'Этот E-mail адрес уже занят');
        
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'php/saveEditedProfile.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);

                if(response.message === "existing_nickname") {
                    if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                    signExistingUser.init();
                } else if(response.message === "existing_email") {
                    if(document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                    signExistingUserEmail.init();
                } else {
                    window.location.href = `account-page.php?id=${this.user.id}`;
                }
            }
        }
        xhr.send(JSON.stringify(this.user));
    }

    initEditFields() {
        let user = this.user;
        let cityDropdown = new DropdownMenu('js-editUser-city', user, 'city', postCreatingPage.cities);
        
        let userNameEditField = document.querySelector('.js-userNameEditField');
        let userPhoneEditField = document.querySelector('.signup_phone');
        let userEmailEditField = document.querySelector('.js-userEmailEditField');
        let userBioEditField = document.querySelector('.js-userBioEditField');

        userNameEditField.addEventListener('input', () => {
            user.nickname = userNameEditField.value;
        });
        userPhoneEditField.addEventListener('input', () => {
            user.phone = userPhoneEditField.value.replace(/-/g, "");
        });
        userEmailEditField.addEventListener('input', () => {
            user.email = userEmailEditField.value;
        });
        userBioEditField.addEventListener('input', () => {
            user.about = userBioEditField.value;
        });

        let infoSignUpLogin = new PopupMessage('#f7b31c', '#f9ea82', 'Длина <b>логина</b> должна быть не менее 5 и не более 24 символов'),
        infoSignUpPhoneLength = new PopupMessage('#f7b31c', '#f9ea82', 'Введите корректный номер телефона'),
        infoSignUpEmailLength = new PopupMessage('#f7b31c', '#f9ea82', 'Длина <b>E-mail</b> должна быть не менее 5 и не более 50 символов'),
        infoSignUpCity = new PopupMessage('#f7b31c', '#f9ea82', 'Выберите город');

        let saveButton = document.querySelector('.saveProfileChanges');
        saveButton.addEventListener('click', () => {
            if(user.login.length >= 5 && user.login.length <= 24 && user.phone.length === 10 && user.email.length >= 5 && user.email.length <= 50 && user.city != 'Выберите город') {
                this.saveEditedProfile();
            } else {
                if (user.login.length < 5 || user.login.length > 24) {
                    if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                    infoSignUpLogin.init();
                } else if (user.phone.length !== 10) {
                    if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                    infoSignUpPhoneLength.init();
                    console.log(user.phone.length)
                } else if (user.email.length < 5 || user.email.length > 50) {
                    if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                    infoSignUpEmailLength.init();
                } else if (user.city == 'Выберите город') {
                    if (document.querySelector('.animatedMessage')) document.querySelector('.animatedMessage').remove();
                    infoSignUpCity.init();
                } 
            }
        });

        cityDropdown.init();
    }
}

let searchPostsInput = document.querySelector('.searchPostsInput input');
let searchButton = document.querySelector('.searchPosts_button');
let removeSearchFilterButton = document.querySelector('.js-removeSearchFilterButton');

if(searchPostsInput) {
    let searchParams = new URLSearchParams(location.search);

    if(searchParams.has('searchPost')) {
        removeSearchFilterButton.style.display = 'inline';
        searchPostsInput.value = searchParams.get('searchPost');
    } else {
        removeSearchFilterButton.style.display = 'none';
        searchPostsInput.value = '';
    }

    searchPostsInput.addEventListener('input', () => {
        if(searchPostsInput.value.length != 0) {
            searchParams.set('searchPost', searchPostsInput.value);
        }
    });

    searchButton.addEventListener('click', () => {
        if(searchPostsInput.value.length != 0) {
            window.history.replaceState(null, null, '?' + searchParams.toString());
        } else {
            searchParams.delete('searchPost');
            window.history.replaceState(null, null, '?' + searchParams.toString());
        }

        if(searchParams.has('searchPost')) {
            removeSearchFilterButton.style.display = 'inline';
        } else {
            removeSearchFilterButton.style.display = 'none';
        }

        postsStorage.renderPosts();
    });

    removeSearchFilterButton.addEventListener('click', () => {
        searchPostsInput.value = '';
        searchParams.delete('searchPost');
        window.history.replaceState(null, null, '?' + searchParams.toString());

        if(searchParams.has('searchPost')) {
            removeSearchFilterButton.style.display = 'inline';
        } else {
            removeSearchFilterButton.style.display = 'none';
        }

        postsStorage.renderPosts();
    })
}

window.onload = function() {
    preloaderAppend();

    if (postsRenderContainer) {
        postsStorage.renderPosts();
    }
};

