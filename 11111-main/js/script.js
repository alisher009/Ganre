import {
    movies
} from "../modules/db.js";

let ul = document.querySelector('.promo__interactive-list')
let promo__bg = document.querySelector('.promo__bg')
let promo__genre = document.querySelector(".promo__genre");
let promo__title = document.querySelector(".promo__title");
let imdb = document.querySelector(".imdb");
let reserch = document.querySelector(".reserch");
let inp = document.querySelector('#search')
let adverts = document.querySelector('.promo__adv')
let links = document.querySelectorAll('.promo__menu-item')
let promo__descr = document.querySelector('.promo__descr')
let ganr = document.querySelector('.Ganr')
let genres_arr = ['All']
let moviesArr = movies

adverts.childNodes.forEach((item, index) => {
    if (index % 2 !== 0) {
        item.style.display = "none"
    }
})



inp.onkeyup = () => {
    moviesArr = movies.filter(item => item.Title.toLowerCase().includes(inp.value.toLowerCase()))

    changeFilm(moviesArr[0])

    reload(moviesArr)
}


links.forEach(l => {
    l.onclick = () => {
        let link = document.querySelector('.promo__menu-item_active')
        link.classList.remove('promo__menu-item_active')
        l.classList.add('promo__menu-item_active')
    }
})



function reload(arr) {
    ul.innerHTML = ""
    changeFilm(arr[0])
    arr.forEach((movie, index) => {
        genres_arr.push(movie.Genre)
        let li = document.createElement('li')
        let del = document.createElement('div')

        li.innerHTML = `${index + 1}. ${movie.Title}`
        li.classList.add('promo__interactive-item')
        del.classList.add('delete')

        li.append(del)
        ul.append(li)

        li.onclick = () => {
            changeFilm(movie)
        }

        del.onclick = () => {
            moviesArr = moviesArr.filter(film => film.ID !== movie.ID)

            reload(moviesArr)
        }
        li.onclick = () => {
            changeFilm(movie)
        }
    });
}
reload(movies)




function changeFilm(props) {
    promo__bg.style.backgroundImage = `url("${props.Poster}")`
    promo__genre.innerHTML = `${props.Genre};`
    promo__title.innerHTML = `${props.Title};`
    imdb.innerHTML = `IMDb: ${props.imdbRating}`
    reserch.innerHTML = `Кинопоиск: ${props.Metascore}`
    promo__descr.innerHTML = `${props.Plot}`
}




genres_arr = [...new Set(genres_arr)]

generateGenres(genres_arr)
function generateGenres(arr) {
    ganr.innerHTML = ""

    for (let item of arr) {
        let li = document.createElement('li')
        let a = document.createElement('a')

        if (arr.indexOf(item) === 0) {
            a.classList.add('promo__menu-item_active')
        }

        a.classList.add('promo__menu-item')
        a.href = "#"
        a.innerHTML = item


        li.append(a)
        ganr.append(li)

        li.onclick = () => {
            ganr.childNodes.forEach(elem => elem.firstChild.classList.remove('promo__menu-item_active'))

            li.firstChild.classList.add('promo__menu-item_active')

            let filtered = movies.filter(elem => {
                let genre = elem.Genre.toLowerCase()
                if (item.toLowerCase() === genre) {
                    return elem
                } else if (item.toLowerCase() === 'all') {
                    reload(movies)
                }
            })

            if (filtered.length > 0) reload(filtered)
        }

    }
}