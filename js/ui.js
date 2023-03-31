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
let dropdownMenu = document.querySelector('.dropdown_menu');
if(dropdownMenu){
    let dropdownOpener = document.querySelector('.dropdown_input');
    let dropdownSections = document.querySelector('.dropdown_sections');
    let dropdownCaret = document.getElementById('dropdown-caret')

    function isDropdownOpened() {
        if (dropdownMenu.dataset.dropdownOpened == 1) {
            dropdownSections.classList.remove('disabled');
            dropdownCaret.style.transform = 'rotate(180deg)'
        } else {
            dropdownSections.classList.add('disabled');
            dropdownCaret.style.transform = null
        }
    }

    dropdownOpener.addEventListener('click', () => {
        if(dropdownMenu.dataset.dropdownOpened == 0) {
            dropdownMenu.dataset.dropdownOpened = 1;
            isDropdownOpened();
        } else {
            dropdownMenu.dataset.dropdownOpened = 0;
            isDropdownOpened();
        }
    })
}

// Слайдер

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

const announcementSlider = new Slider('sliders-announcement', '--slider-width', '--slider-height', '--container-width');
announcementSlider.init()