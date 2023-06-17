let preloader = document.getElementById('preloader')
window.onload = function preloaderAppend() {
    preloader.remove()
}

let headerContent = document.querySelector('.header_main_content');
let headerOpener = document.querySelector('.header_opener');
let userAccountInfo = document.querySelector('.user');
let headerOpenerCaret = document.querySelector('.header_opener i');
headerOpener.addEventListener('click', () => {
    if(window.getComputedStyle(headerContent).height == '55px') {
        headerContent.style.height = 0;
        userAccountInfo.style.opacity = '0';
        setTimeout(() => {
            userAccountInfo.style.visibility = 'hidden';
        }, 200)
        headerOpenerCaret.style.transform = 'rotate(180deg)'
    } else {
        headerContent.style.height = 55 + 'px';
        userAccountInfo.style.opacity = '1'
        userAccountInfo.style.visibility = 'visible';
        headerOpenerCaret.style.transform = 'rotate(0deg)'
    }
})

let userDropdown = document.querySelector('.user_dropdown');
let userName = document.querySelector('.user_name');
if (userName) {
    userAccountInfo.addEventListener('click', () => {
       if(userDropdown.style.display !=  'flex') {
            userDropdown.style.display = 'flex';  
        } else {
            userDropdown.style.display = 'none';   
        } 
})
}

window.addEventListener('click', (e) => {
    if (userDropdown && e.target != userName) {
        userDropdown.style.display = 'none'
    }
})

class NewPostPage {
    constructor() {
        this.postCreatingContainer = document.querySelector('.post_creating-sections');
        this.postStructurePanel = document.querySelector('.post_creating-panel');

        this.post = {
            userid: '',
            category: '',
            title: '', 
            descr: '',
            category: '',
            price: '', 
            draft: true
        };
    }

    renderMainInformation() {
        this.postCreatingContainer.innerHTML = `
        <div class="post_creating-main">
        <div class="post_creating-box">
            <p>Название</p>
            <input class="input_default js-post-title" type="text" placeholder="Введите название" value="${this.post.title}">
        </div>
        <div class="post_creating-box">
            <p>Описание</p>
            <textarea class="input_default js-post-descr" name="post_description" cols="30" rows="10" placeholder="Расскажите подробнее, что Вы предлагаете в своём объявлении">${this.post.descr}</textarea>
        </div>
        <div class="post_creating-box">
            <p>Цена</p>
            <div class="price_field input_default">
                <input class="js-post-price" type="number" placeholder="Введите цену" value="${this.post.price}">
                <span>₽</span>
            </div>
        </div>
    </div>`
    this.newPostInit();
    }

    renderCategory() {
        this.postCreatingContainer.innerHTML = `
        <div class="post_creating-category">
            <div class="post_creating-box">
                <p>Категория</p>
                <div class="dropdown_menu js-post-category">
                    <div class="input_default dropdown_input">
                        <span>Выберите категорию</span>
                        <span class="dropdown-caret"><i class="fa-solid fa-caret-down"></i></span>
                    </div>
                    <div class="dropdown_sections disabled">
                        <div class="dropdown_item">Поиск работы</div>
                        <div class="dropdown_item">Поиск сотрудника</div>
                        <div class="dropdown_item">Вещи, электроника и прочее</div>
                    </div>
                </div>
            </div>
        </div>
        `
        let dropdownOpener = document.querySelector(`.js-post-category .dropdown_input`);
        let dropdownValue = dropdownOpener.children[0];
        if(this.post.category != '') {
            dropdownValue.style.color = '#000';
            dropdownValue.innerText = this.post.category;
        }
        let categoryMenu = new DropdownMenu('js-post-category');
        categoryMenu.init();
        this.newPostInit();
    }

    renderImages() {
        this.postCreatingContainer.innerHTML = `
        <div class="post_creating-images">
            <div class="post_creating-images_load">
                <h3>Добавьте не более 10 изображений</h3>
                <div class="post_creating-images_wrapper">
                    <div class="post_creating-images_box">
                        <div class="post_image">
                            <input type="file" accept="image/gif,image/png,image/jpeg,image/pjpeg,image/heic">
                            <span>+</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="post_creating-box">
                <p>Видео с YouTube</p>
                <input class="input_default" type="text" placeholder="Введите ссылку на видео">
            </div>
        </div>
        `
        document.querySelector('.post_image input').addEventListener('change', () => this.imageLoader())
    }

    renderPreview() {
        this.postCreatingContainer.innerHTML = `
        <div class="post_creating-preview">
        <div class="post_info">
            <div class="post_main">
                <div class="slider-announcement"></div>
                <div class="post_text">
                    <div class="post_additional_mob">
                        <div class="post_additional_mob-category">
                            Поиск работы
                        </div>
                        <div class="post_additional_mob-date">
                            Сегодня 17:25
                        </div>
                    </div>
                    <a>
                        <h2>${this.post.title}</h2>
                        <p>${this.post.descr}</p>
                    </a>
                </div>
            </div>
            <div class="post_additional"> 
                <div class="post_additional-user">
                    <a>
                        <img src="img/placeholder_avatar.png" alt="avatarka">
                        <p class="post_username"><?=$_COOKIE['user'];?></p>
                    </a>
                </div>
            <div class="post_additional-details">
                <ul>
                    <li><span>Категория:</span> ${this.post.category}</li>
                </ul>
            </div>
            <div class="post_additional-date">
                <p><span>Размещено:</span> Сегодня 17:22</p> 
                <p><span>Просмотров:</span> 2</p> 
            </div>
        
        </div>
        </div>
        <div class="post_contact">
            <div class="post_price">
                <p>Сумма не указана</p><span class="valuta"></span>
            </div>
            <div class="post_buttons">
                <div class="button_default">Чат</div>
               <div class="button_default">Позвоните мне</div>
            </div>
        </div>
        </div>
        `

        console.log(document.cookie.user);
    }

    imageLoader() {
        let wrapper = document.querySelector('.post_creating-images_box');
        let loader = document.querySelector('.post_image input');
        let image = loader.files[0];
        let reader = new FileReader();
        if (image) {
            reader.readAsDataURL(image);
        }
        
        reader.onload = function () {
            let newImage = document.createElement('img');
            wrapper.appendChild(newImage);
            newImage.src = reader.result;
        }
    }

    structurePanel() {
        let categoryButton = document.querySelector('.js-structure-category');
        let mainButton = document.querySelector('.js-structure-main');
        let imagesButton = document.querySelector('.js-structure-images');
        let previewButton = document.querySelector('.js-structure-preview');

        categoryButton.addEventListener('click', () => {
            this.renderCategory();
            this.panelActiveSectionHandler(categoryButton);
        });
        mainButton.addEventListener('click', () => {
            this.renderMainInformation();
            this.panelActiveSectionHandler(mainButton);
        });
        imagesButton.addEventListener('click', () => {
            this.renderImages();
            this.panelActiveSectionHandler(imagesButton);
        });
        previewButton.addEventListener('click', () => {
            this.renderPreview();
            this.panelActiveSectionHandler(previewButton);
        })
    }

    panelActiveSectionHandler(section) {
        let activeSection = document.querySelector('.activePanelSection');
        if (activeSection) {
            activeSection.classList.remove('activePanelSection')
            section.classList.add('activePanelSection'); 
        } else {
            section.classList.add('activePanelSection');
        }
    }

    newPostInit() {
        let post = this.post;

        let postCategorySelector = document.querySelector('.js-post-category');
        let postTitleField = document.querySelector('.js-post-title');
        let postDescrField = document.querySelector('.js-post-descr');
        let postPriceField = document.querySelector('.js-post-price');
        let userid = document.querySelector('.user_name').getAttribute('data-userid');

        post.userid = userid;
        
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
        if (postCategorySelector) {
            let sectionsCollection = document.querySelectorAll(`.js-post-category .dropdown_item`);
            sectionsCollection.forEach(section => {
                section.addEventListener('click', () => {
                    post.category = section.innerText;
                })
            })
        }
    }

    init() {
        this.structurePanel()
    }
}

const postCreatingPage = new NewPostPage()
const postCreatingBlock = document.querySelector('.post_creating_container');
if(postCreatingBlock) {
    postCreatingPage.init()
}

class PostsStorage {
    constructor() {
        this.posts = []
        this.drafts = []
    }

    
}

const postsStorage = new PostsStorage();

