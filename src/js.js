const container = document.getElementById("container")
const onboarding = container.querySelector("#onboarding")

const btnOnBoardingNext = onboarding.querySelector("#btn-onboarding-next")
const boardMap = onboarding.querySelector("#board-map")
const boards = onboarding.querySelectorAll(".board")
const boardMapsPoint = boardMap.querySelectorAll('div')

const authorization = container.querySelector('#authorization')
const authorizationForms = authorization.querySelectorAll('form')
const refsForm = authorization.querySelectorAll('#refs-form a')
const authorizationNavbarContent = authorization.querySelector('#navbar-authorization>span')
const formLogin = authorization.querySelector('#form-login')

//Cabinet
const cabinet = container.querySelector('#cabinet');
const cabinetNavbarContent = cabinet.querySelector('#navbar-cabinet span')
const friendsBlock = cabinet.querySelector('#friends')
const cabinetPanels = cabinet.querySelectorAll('.panel')
const itemsMenuBottom = cabinet.querySelectorAll('#menu-bottom li')
const modal = cabinet.querySelector('#modal')
const navbarBtn = cabinet.querySelector('#navbar-btn')
const btnLogout = cabinet.querySelector('#btn-logout')
const friendsList = cabinet.querySelector('#friends-list')
const formFriend = cabinet.querySelector("#form-friend");


function friendTemplate(friend) {
    return `
    <li class="friends-item">
    <img src="${friend.avatar}" alt="${friend.name}">
    <div class="friends-info">
        <h3>${friend.name}</h3>
        <span class="${friend.status}">${friend.status}</span>
        <div>

        </div>
    </div>
</li>
    `
}

function renderFriends(friends) {
    friendsList.innerHTML = ""

    for (let i = 0; i < friends.length; i++) {
        friendsList.innerHTML += friendTemplate(friends[i])
    }
}

// user data
const user = {
    // login: 'Mike'
};
cabinetNavbarContent.innerText = user.login;

// inital state authorization
let indexActiveForm = 0;

authorization.style.display = "none"
onboarding.style.display = "none";
authorizationForms[1].style.display = "none"
authorizationForms[2].style.display = "none"
refsForm[0].style.display = 'none'

// inital state onboarding
let indexActiveBoard = 0
boards[1].style.display = 'none'
boards[2].style.display = 'none'

//initial state cabinet
cabinet.style.display = 'block';
cabinetPanels[1].style.display = 'none'
cabinetPanels[2].style.display = 'none'

let activIndexPanel = 0


let skipedOnBoarding = false

function activateBoard(activeIndex) {

    for(let i = 0; i < boards.length; i++) {
        if( i === activeIndex) {
            boards[i].style.display = 'block'
            boardMapsPoint[i].classList.add('active')
        }
        else {
            boards[i].style.display = 'none'
            boardMapsPoint[i].classList.remove('active')
        }
    }
}


function setAuthorizationNavbarContent(index) {

    switch (index) {
        case 0:
            authorizationNavbarContent.innerText = 'Вход'
            break;
        case 1:
            authorizationNavbarContent.innerText = 'Регистрация'
            break;
        case 2:
            authorizationNavbarContent.innerText = 'Восстановление пароля'

        default:
            break;
    }
}

function activateAuthorizationForm(activeIndex) {

    for(let i = 0; i < authorizationForms.length; i++) {
        if(i === activeIndex) {
            authorizationForms[i].style.display = 'block'
            refsForm[i].style.display = 'none'
        }
        else {
            authorizationForms[i].style.display = 'none'
            refsForm[i].style.display = 'inline'
        }
    }
}

function bindingRefsForms(params) {
    for(let i = 0; i < refsForm.length; i++) {
        refsForm[i].addEventListener('click', (event) => {
            event.preventDefault()

            activateAuthorizationForm(i)
            setAuthorizationNavbarContent(i)
        })
    }
}

function swithCabinetPanel(activeIndex) {
    for( let i = 0; i < cabinetPanels.length; i++) {
        if( i === activeIndex) {
            cabinetPanels[i].style.display = 'block'
            itemsMenuBottom[i].classList.add('active')
        }
        else {
            cabinetPanels[i].style.display = 'none'
            itemsMenuBottom[i].classList.remove('active')
        }
    }
}


function bindItemsMenuBottom() {
    for (let i = 0; i < itemsMenuBottom.length; i++) {
        itemsMenuBottom[i].addEventListener("click", () => {
            swithCabinetPanel(i)
        })
        
    }
}

btnOnBoardingNext.addEventListener('click', () => {
    if(!skipedOnBoarding) {
        if(indexActiveBoard < boards.length -1) {
            indexActiveBoard++
            activateBoard(indexActiveBoard)

        }

        if(indexActiveBoard === boards.length - 1) {
            btnOnBoardingNext.innerText = "Начать"
            skipedOnBoarding = true
        }
    }
    else {
        onboarding.style.display = "none";
        authorization.style.display = 'block'
    }
})

formLogin.addEventListener("submit", (event) => {
    event.preventDefault()

    if(formLogin['login'].value.length > 0 && formLogin['password'].value.length > 0) {
        user.login = formLogin['login'].value
        cabinet.style.display = 'block'
        authorization.style.display = 'none'
        cabinetNavbarContent.innerText = user.login
    }

});

navbarBtn.addEventListener('click', () => {
    modal.style.display = 'flex'
})

modal.addEventListener('click', () => {
    modal.style.display = 'none'
})

btnLogout.addEventListener('click', (event) => {
    event.stopPropagation()
    authorization.style.display = "block"
    cabinet.style.display = 'none';
})


formFriend.addEventListener('submit', (event) => {
    event.preventDefault()
})

bindingRefsForms();
bindItemsMenuBottom()
renderFriends(friends)
