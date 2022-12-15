let sliders = document.querySelectorAll("._swiper");
if (sliders) {
    for (let e = 0; e < sliders.length; e++) {
        let t = sliders[e];
        if (!t.classList.contains("swiper-bild")) {
            let e = t.children;
            if (e)
                for (let t = 0; t < e.length; t++) {
                    e[t].classList.add("swiper-slide")
                }
            let o = t.innerHTML,
                l = document.createElement("div");
            if (l.classList.add("swiper-wrapper"), l.innerHTML = o, t.innerHTML = "", t.appendChild(l), t.classList.add("swiper-bild"), t.classList.contains("_swiper_scroll")) {
                let e = document.createElement("div");
            }
        }
        t.classList.contains("_gallery")
    }
    sliders_bild_callback()
}

function sliders_bild_callback(e) {}
const sliderTeam = document.querySelector(".slider-team");
sliderTeam && new Swiper(sliderTeam, {
    observer: !0,
    observeParents: !0,
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: !0,
    speed: 800,
    pagination: {
        el: ".slider-team__pagging",
        clickable: !0
    },
    keyboard: {
        eneble: !0,
        onlyInViewport: !0
    },
    navigation: {
        nextEl: ".about__more .more__item_next",
        prevEl: ".about__more .more__item_prev"
    },
    on: {
        lazyImageReady: function() {
            ibg()
        }
    }
});
const sliderTestimonials = document.querySelector(".testimonials__slider");
sliderTestimonials && new Swiper(sliderTestimonials, {
    observer: !0,
    observeParents: !0,
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: !0,
    speed: 800,
    loop: !0,
    pagination: {
        el: ".testimonials__pagging",
        clickable: !0
    },
    keyboard: {
        eneble: !0,
        onlyInViewport: !0
    },
    on: {
        lazyImageReady: function() {
            ibg()
        }
    }
});
const sliderNews = document.querySelector(".news__slider");
sliderNews && new Swiper(sliderNews, {
    observer: !0,
    observeParents: !0,
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: !0,
    speed: 800,
    direction: "vertical",
    loop: !0,
    pagination: {
        el: ".news__pagging",
        clickable: !0
    },
    keyboard: {
        eneble: !0,
        onlyInViewport: !0
    },
    on: {
        lazyImageReady: function() {
            ibg()
        }
    }
});
const progress = document.querySelector(".progress");

function progressBar(e) {
    let t = (document.body.scrollTop || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    progress.style.width = t + "%", progress.classList.add("_scroll")
}
window.addEventListener("scroll", progressBar);
let moreText = document.querySelector(".this__more"),
    moreTextButton = document.querySelector(".this__btn");
var bar;
moreTextButton && moreTextButton.addEventListener("click", (function(e) {
    return moreTextButton.classList.toggle("_active"), moreText.classList.toggle("_active"), e.preventDefault(), !1
}), !1), (bar = new ProgressBar.Circle("#container", {
    color: "#19bd9a",
    easing: "easeOut",
    strokeWidth: "3",
    trailColor: "#047378",
    trailWidth: "1",
    text: {
        value: "0",
        className: "progress-text",
        style: {
            color: "#81868e"
        },
        autoStyleContainer: !1
    },
    from: {
        color: "#19bd9a",
        width: 1
    },
    to: {
        color: "#19bd9a",
        width: 3
    },
    step: (e, t) => {
        t.path.setAttribute("stroke", e.color), t.path.setAttribute("stroke-width", e.width), t.setText(Math.round(100 * t.value()))
    }
})).animate(.8, {
    duration: 2e3
}), (bar = new ProgressBar.Circle("#container-2", {
    color: "#19bd9a",
    easing: "easeOut",
    strokeWidth: "3",
    trailColor: "#047378",
    trailWidth: "1",
    from: {
        color: "#19bd9a",
        width: 1
    },
    to: {
        color: "#19bd9a",
        width: 3
    },
    text: {
        value: "0",
        className: "progress-text",
        style: {
            color: "#81868e"
        },
        autoStyleContainer: !1
    },
    step: (e, t) => {
        t.path.setAttribute("stroke", e.color), t.path.setAttribute("stroke-width", e.width), t.setText(Math.round(100 * t.value()))
    }
})).animate(.75, {
    duration: 2e3
}), (bar = new ProgressBar.Circle("#container-3", {
    color: "#19bd9a",
    easing: "easeOut",
    strokeWidth: "3",
    trailColor: "#047378",
    trailWidth: "1",
    text: {
        value: "0",
        className: "progress-text",
        style: {
            color: "#81868e"
        }
    },
    from: {
        color: "#19bd9a",
        width: 1
    },
    to: {
        color: "#19bd9a",
        width: 3
    },
    step: (e, t) => {
        t.path.setAttribute("stroke", e.color), t.path.setAttribute("stroke-width", e.width), t.setText(Math.round(100 * t.value()))
    }
})).animate(.6, {
    duration: 2e3
}), (bar = new ProgressBar.Line("#container-4", {
    color: "#19bd9a",
    easing: "easeOut",
    strokeWidth: "1",
    trailColor: "#e1e4e9",
    trailWidth: "1",
    svgStyle: {
        width: "100%",
        height: "100%"
    },
    from: {
        color: "#19bd9a",
        width: 1
    },
    to: {
        color: "#19bd9a",
        width: 1
    },
    text: {
        value: "0%",
        className: "progress-text",
        style: {
            color: "#81868e"
        }
    },
    step: (e, t) => {
        t.path.setAttribute("stroke", e.color), t.path.setAttribute("stroke-width", e.width), t.setText(Math.round(100 * t.value()) + " %")
    }
})).animate(.8, {
    duration: 2e3
}), (bar = new ProgressBar.Line("#container-5", {
    color: "#19bd9a",
    easing: "easeOut",
    strokeWidth: "1",
    trailColor: "#e1e4e9",
    trailWidth: "1",
    svgStyle: {
        width: "100%",
        height: "100%"
    },
    from: {
        color: "#19bd9a",
        width: 1
    },
    to: {
        color: "#19bd9a",
        width: 1
    },
    text: {
        value: "0%",
        className: "progress-text",
        style: {
            color: "#81868e"
        }
    },
    step: (e, t) => {
        t.path.setAttribute("stroke", e.color), t.path.setAttribute("stroke-width", e.width), t.setText(Math.round(100 * t.value()) + " %")
    }
})).animate(.65, {
    duration: 2e3
}), (bar = new ProgressBar.Line("#container-6", {
    color: "#19bd9a",
    easing: "easeOut",
    strokeWidth: "1",
    trailColor: "#e1e4e9",
    trailWidth: "1",
    svgStyle: {
        width: "100%",
        height: "100%"
    },
    from: {
        color: "#19bd9a",
        width: 1
    },
    to: {
        color: "#19bd9a",
        width: 1
    },
    text: {
        value: "0%",
        className: "progress-text",
        style: {
            color: "#81868e"
        }
    },
    step: (e, t) => {
        t.path.setAttribute("stroke", e.color), t.path.setAttribute("stroke-width", e.width), t.setText(Math.round(100 * t.value()) + " %")
    }
})).animate(.75, {
    duration: 2e3
}), (bar = new ProgressBar.Line("#container-7", {
    color: "#19bd9a",
    easing: "easeOut",
    strokeWidth: "1",
    trailColor: "#e1e4e9",
    trailWidth: "1",
    svgStyle: {
        width: "100%",
        height: "100%"
    },
    from: {
        color: "#19bd9a",
        width: 1
    },
    to: {
        color: "#19bd9a",
        width: 1
    },
    text: {
        value: "0%",
        className: "progress-text",
        style: {
            color: "#81868e"
        }
    },
    step: (e, t) => {
        t.path.setAttribute("stroke", e.color), t.path.setAttribute("stroke-width", e.width), t.setText(Math.round(100 * t.value()) + " %")
    }
})).animate(.8, {
    duration: 2e3
}), (bar = new ProgressBar.Line("#container-8", {
    color: "#19bd9a",
    easing: "easeOut",
    strokeWidth: "1",
    trailColor: "#e1e4e9",
    trailWidth: "1",
    svgStyle: {
        width: "100%",
        height: "100%"
    },
    from: {
        color: "#19bd9a",
        width: 1
    },
    to: {
        color: "#19bd9a",
        width: 1
    },
    text: {
        value: "0%",
        className: "progress-text",
        style: {
            color: "#81868e"
        }
    },
    step: (e, t) => {
        t.path.setAttribute("stroke", e.color), t.path.setAttribute("stroke-width", e.width), t.setText(Math.round(100 * t.value()) + " %")
    }
})).animate(.65, {
    duration: 2e3
}), (bar = new ProgressBar.Line("#container-9", {
    color: "#19bd9a",
    easing: "easeOut",
    strokeWidth: "1",
    trailColor: "#e1e4e9",
    trailWidth: "1",
    svgStyle: {
        width: "100%",
        height: "100%"
    },
    from: {
        color: "#19bd9a",
        width: 1
    },
    to: {
        color: "#19bd9a",
        width: 1
    },
    text: {
        value: "0%",
        className: "progress-text",
        style: {
            color: "#81868e"
        }
    },
    step: (e, t) => {
        t.path.setAttribute("stroke", e.color), t.path.setAttribute("stroke-width", e.width), t.setText(Math.round(100 * t.value()) + " %")
    }
})).animate(.75, {
    duration: 2e3
}), (bar = new ProgressBar.Line("#container-10", {
    color: "#19bd9a",
    easing: "easeOut",
    strokeWidth: "1",
    trailColor: "#e1e4e9",
    trailWidth: "1",
    svgStyle: {
        width: "100%",
        height: "100%"
    },
    from: {
        color: "#19bd9a",
        width: 1
    },
    to: {
        color: "#19bd9a",
        width: 1
    },
    text: {
        value: "0%",
        className: "progress-text",
        style: {
            color: "#81868e"
        }
    },
    step: (e, t) => {
        t.path.setAttribute("stroke", e.color), t.path.setAttribute("stroke-width", e.width), t.setText(Math.round(100 * t.value()) + " %")
    }
})).animate(.8, {
    duration: 2e3
}), (bar = new ProgressBar.Line("#container-11", {
    color: "#19bd9a",
    easing: "easeOut",
    strokeWidth: "1",
    trailColor: "#e1e4e9",
    trailWidth: "1",
    svgStyle: {
        width: "100%",
        height: "100%"
    },
    from: {
        color: "#19bd9a",
        width: 1
    },
    to: {
        color: "#19bd9a",
        width: 1
    },
    text: {
        value: "0%",
        className: "progress-text",
        style: {
            color: "#81868e"
        }
    },
    step: (e, t) => {
        t.path.setAttribute("stroke", e.color), t.path.setAttribute("stroke-width", e.width), t.setText(Math.round(100 * t.value()) + " %")
    }
})).animate(.65, {
    duration: 2e3
}), (bar = new ProgressBar.Line("#container-12", {
    color: "#19bd9a",
    easing: "easeOut",
    strokeWidth: "1",
    trailColor: "#e1e4e9",
    trailWidth: "1",
    svgStyle: {
        width: "100%",
        height: "100%"
    },
    from: {
        color: "#19bd9a",
        width: 1
    },
    to: {
        color: "#19bd9a",
        width: 1
    },
    text: {
        value: "0%",
        className: "progress-text",
        style: {
            color: "#81868e"
        }
    },
    step: (e, t) => {
        t.path.setAttribute("stroke", e.color), t.path.setAttribute("stroke-width", e.width), t.setText(Math.round(100 * t.value()) + " %")
    }
})).animate(.75, {
    duration: 2e3
});
const elem = document.querySelector(".portfolio__grid"),
    iso = new Isotope(elem, {
        itemSelector: ".grid-portfolio__item",
        layoutMode: "masonry",
        persentPosition: !0,
        masonry: {
            columnWidth: ".grid-portfolio__item",
            horizontalOrder: !0
        }
    });
document.querySelectorAll(".nav-portfolio__link").forEach(e => {
    e.addEventListener("click", e => {
        e.preventDefault();
        let t = e.currentTarget.dataset.filter;
        iso.arrange({
            filter: "" + t
        })
    })
});
for (var btnContainer = document.getElementById("myDIV"), btns = btnContainer.getElementsByClassName("nav-portfolio__link"), i = 0; i < btns.length; i++) btns[i].addEventListener("click", (function() {
    var e = document.getElementsByClassName("active");
    e.length > 0 && (e[0].className = e[0].className.replace(" active", "")), this.className += " active"
}));
let angleMap = document.querySelector(".map__label");
if (angleMap) {
    let e = document.querySelector(".map__angle");
    angleMap.addEventListener("click", (function(e) {
        angleMap.classList.add("_activ")
    })), e.addEventListener("click", (function(e) {
        angleMap.classList.add("_activ")
    }))
}
var ua = window.navigator.userAgent,
    msie = ua.indexOf("MSIE "),
    isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
        }
    };

function isIE() {
    return (ua = navigator.userAgent).indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1
}

function ibg() {
    if (isIE()) {
        let t = document.querySelectorAll("._ibg");
        for (var e = 0; e < t.length; e++) t[e].querySelector("img") && null != t[e].querySelector("img").getAttribute("src") && (t[e].style.backgroundImage = "url(" + t[e].querySelector("img").getAttribute("src") + ")")
    }
}
isIE() && document.querySelector("html").classList.add("ie"), isMobile.any() && document.querySelector("html").classList.add("_touch"), ibg(), window.addEventListener("load", (function() {
    document.querySelector(".wrapper") && setTimeout((function() {
        document.querySelector(".wrapper").classList.add("_loaded")
    }), 0)
}));
let unlock = !0;
if (location.hash) {
    const e = location.hash.replace("#", "");
    document.querySelector(".popup_" + e) ? popup_open(e) : document.querySelector("div." + e) && _goto(document.querySelector("." + e), 500, "")
}
let iconMenu = document.querySelector(".icon-menu"),
    menu = document.querySelector(".menu");
if (null != iconMenu) {
    let e = 500;
    iconMenu.addEventListener("click", (function(t) {
        unlock && (body_lock(e), iconMenu.classList.toggle("_active"), menu.classList.toggle("_active"))
    }))
}
const menuLinks = document.querySelectorAll(".menu__link[data-goto], .header__link[data-goto]");
if (menuLinks.length > 0) {
    function onMenuLinkClick(e) {
        const t = e.target;
        if (t.dataset.goto && document.querySelector(t.dataset.goto)) {
            const o = document.querySelector(t.dataset.goto);
            if (isMobile.any()) {
                iconMenu.classList.contains("_active") && (iconMenu.classList.remove("_active"), menu.classList.remove("_active"), body.classList.remove("_lock"));
                const e = o.getBoundingClientRect().top + pageYOffset - document.querySelector(".header__header").offsetHeight;
                window.scrollTo({
                    top: e,
                    behavior: "smooth"
                })
            } else {
                const e = o.getBoundingClientRect().top + pageYOffset;
                window.scrollTo({
                    top: e,
                    behavior: "smooth"
                })
            }
            e.preventDefault()
        }
    }
    menuLinks.forEach(e => {
        e.addEventListener("click", onMenuLinkClick)
    })
}
let body = document.querySelector("body");

function body_lock(e) {
    body.classList.contains("_lock") ? body_lock_remove(e) : body_lock_add(e)
}

function body_lock_remove(e) {
    let t = document.querySelector("body");
    if (unlock) {
        let o = document.querySelectorAll("._lp");
        setTimeout(() => {
            for (let e = 0; e < o.length; e++) {
                o[e].style.paddingRight = "0px"
            }
            t.style.paddingRight = "0px", t.classList.remove("_lock")
        }, e), unlock = !1, setTimeout((function() {
            unlock = !0
        }), e)
    }
}

function body_lock_add(e) {
    let t = document.querySelector("body");
    if (unlock) {
        let o = document.querySelectorAll("._lp");
        for (let e = 0; e < o.length; e++) {
            o[e].style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px"
        }
        t.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px", t.classList.add("_lock"), unlock = !1, setTimeout((function() {
            unlock = !0
        }), e)
    }
}
let tabs = document.querySelectorAll("._tabs");
for (let e = 0; e < tabs.length; e++) {
    let t = tabs[e],
        o = t.querySelectorAll("._tabs-item"),
        l = t.querySelectorAll("._tabs-block");
    for (let e = 0; e < o.length; e++) {
        let t = o[e];
        t.addEventListener("click", (function(r) {
            for (let e = 0; e < o.length; e++) {
                o[e].classList.remove("_active"), l[e].classList.remove("_active")
            }
            t.classList.add("_active"), l[e].classList.add("_active"), r.preventDefault()
        }))
    }
}

function digi(e) {
    return e.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ")
}

function digi_animate(e) {
    if (e.length > 0)
        for (let t = 0; t < e.length; t++) {
            const o = e[t],
                l = parseInt(o.innerHTML.replace(" ", ""));
            o.classList.contains("_done") || digi_animate_value(o, 0, l, 1500)
        }
}

function digi_animate_value(e, t, o, l) {
    var r = e,
        s = o - t,
        n = Math.abs(Math.floor(l / s));
    n = Math.max(n, 50);
    var i, a = (new Date).getTime() + l;

    function c() {
        var e = (new Date).getTime(),
            t = Math.max((a - e) / l, 0),
            n = Math.round(o - t * s);
        r.innerHTML = digi(n), n == o && clearInterval(i)
    }
    i = setInterval(c, n), c(), e.classList.add("_done")
}
let popup_link = document.querySelectorAll("._popup-link"),
    popups = document.querySelectorAll(".popup");
for (let e = 0; e < popup_link.length; e++) {
    const t = popup_link[e];
    t.addEventListener("click", (function(e) {
        if (unlock) {
            popup_open(t.getAttribute("href").replace("#", ""), t.getAttribute("data-video"))
        }
        e.preventDefault()
    }))
}
for (let e = 0; e < popups.length; e++) {
    popups[e].addEventListener("click", (function(e) {
        e.target.closest(".popup__body") || popup_close(e.target.closest(".popup"))
    }))
}

function popup_open(e, t = "") {
    document.querySelectorAll(".popup._active").length > 0 && popup_close("", !1);
    let o = document.querySelector(".popup_" + e);
    if (o && unlock) {
        if ("" != t && null != t) {
            document.querySelector(".popup_video").querySelector(".popup__video").innerHTML = '<iframe src="https://www.youtube.com/embed/' + t + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>'
        }
        document.querySelector(".menu__body._active") || body_lock_add(500), o.classList.add("_active"), history.pushState("", "", "#" + e)
    }
}

function popup_close(e, t = !0) {
    if (unlock) {
        if (e) {
            let t = e.querySelector(".popup__video");
            t && (t.innerHTML = ""), e.classList.remove("_active")
        } else
            for (let e = 0; e < popups.length; e++) {
                const t = popups[e];
                let o = t.querySelector(".popup__video");
                o && (o.innerHTML = ""), t.classList.remove("_active")
            }!document.querySelector(".menu__body._active") && t && body_lock_remove(500), history.pushState("", "", window.location.href.split("#")[0])
    }
}
let popup_close_icon = document.querySelectorAll(".popup__close,._popup-close");
if (popup_close_icon)
    for (let e = 0; e < popup_close_icon.length; e++) {
        const t = popup_close_icon[e];
        t.addEventListener("click", (function() {
            popup_close(t.closest(".popup"))
        }))
    }
document.addEventListener("keydown", (function(e) {
    "Escape" === e.code && popup_close()
}));
let forms = document.querySelectorAll("form");
if (forms.length > 0)
    for (let e = 0; e < forms.length; e++) {
        forms[e].addEventListener("submit", form_submit)
    }
async function form_submit(e) {
    let t = e.target.closest("form");
    if (0 == form_validate(t)) {
        let o = t.getAttribute("action") ? t.getAttribute("action").trim() : "#",
            l = t.getAttribute("method") ? t.getAttribute("method").trim() : "GET";
        const r = t.getAttribute("data-message"),
            s = t.getAttribute("data-ajax"),
            n = t.getAttribute("data-test");
        if (s) {
            e.preventDefault();
            let s = new FormData(t);
            t.classList.add("_sending");
            let n = await fetch(o, {
                method: l,
                body: s
            });
            if (n.ok) {
                await n.json();
                t.classList.remove("_sending"), r && popup_open(r + "-message"), form_clean(t)
            } else alert("Ошибка"), t.classList.remove("_sending")
        }
        n && (e.preventDefault(), popup_open(r + "-message"), form_clean(t))
    } else {
        let o = t.querySelectorAll("._error");
        o && t.classList.contains("_goto-error") && _goto(o[0], 1e3, 50), e.preventDefault()
    }
}

function form_validate(e) {
    let t = 0,
        o = e.querySelectorAll("._req");
    if (o.length > 0)
        for (let e = 0; e < o.length; e++) {
            const l = o[e];
            _is_hidden(l) || (t += form_validate_input(l))
        }
    return t
}

function form_validate_input(e) {
    let t = 0,
        o = e.getAttribute("data-value");
    if ("email" == e.getAttribute("name") || e.classList.contains("_email")) {
        if (e.value != o) {
            let t = e.value.replace(" ", "");
            e.value = t
        }
        email_test(e) || e.value == o ? (form_add_error(e), t++) : form_remove_error(e)
    } else "checkbox" == e.getAttribute("type") && 0 == e.checked || "" == e.value || e.value == o ? (form_add_error(e), t++) : form_remove_error(e);
    return t
}

function form_add_error(e) {
    e.classList.add("_error"), e.parentElement.classList.add("_error");
    let t = e.parentElement.querySelector(".form__error");
    t && e.parentElement.removeChild(t);
    let o = e.getAttribute("data-error");
    o && "" != o && e.parentElement.insertAdjacentHTML("beforeend", '<div class="form__error">' + o + "</div>")
}

function form_remove_error(e) {
    e.classList.remove("_error"), e.parentElement.classList.remove("_error");
    let t = e.parentElement.querySelector(".form__error");
    t && e.parentElement.removeChild(t)
}

function form_clean(e) {
    let t = e.querySelectorAll("input,textarea");
    for (let e = 0; e < t.length; e++) {
        const o = t[e];
        o.parentElement.classList.remove("_focus"), o.classList.remove("_focus"), o.value = o.getAttribute("data-value")
    }
    let o = e.querySelectorAll(".checkbox__input");
    if (o.length > 0)
        for (let e = 0; e < o.length; e++) {
            o[e].checked = !1
        }
    let l = e.querySelectorAll("select");
    if (l.length > 0)
        for (let e = 0; e < l.length; e++) {
            const t = l[e],
                o = t.getAttribute("data-default");
            t.value = o, select_item(t)
        }
}
let viewPass = document.querySelectorAll(".form__viewpass");
for (let e = 0; e < viewPass.length; e++) {
    const t = viewPass[e];
    t.addEventListener("click", (function(e) {
        t.classList.contains("_active") ? t.parentElement.querySelector("input").setAttribute("type", "password") : t.parentElement.querySelector("input").setAttribute("type", "text"), t.classList.toggle("_active")
    }))
}
let selects = document.getElementsByTagName("select");

function selects_init() {
    for (let e = 0; e < selects.length; e++) {
        select_init(selects[e])
    }
    document.addEventListener("click", (function(e) {
        selects_close(e)
    })), document.addEventListener("keydown", (function(e) {
        "Escape" === e.code && selects_close(e)
    }))
}

function selects_close(e) {
    const t = document.querySelectorAll(".select");
    if (!e.target.closest(".select") && !e.target.classList.contains("_option"))
        for (let e = 0; e < t.length; e++) {
            const o = t[e],
                l = o.querySelector(".select__options");
            o.classList.remove("_active"), _slideUp(l, 100)
        }
}

function select_init(e) {
    const t = e.parentElement,
        o = e.getAttribute("class"),
        l = e.querySelector("option:checked");
    e.setAttribute("data-default", l.value), e.style.display = "none", t.insertAdjacentHTML("beforeend", '<div class="select select_' + o + '"></div>'), e.parentElement.querySelector(".select").appendChild(e), select_item(e)
}

function select_item(e) {
    const t = e.parentElement,
        o = t.querySelector(".select__item"),
        l = e.querySelectorAll("option"),
        r = e.querySelector("option:checked").text,
        s = e.getAttribute("data-type");
    o && o.remove();
    let n = "";
    n = "input" == s ? '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + r + '" data-error="Ошибка" data-value="' + r + '" class="select__input"></div>' : '<div class="select__value icon-select-arrow"><span>' + r + "</span></div>", t.insertAdjacentHTML("beforeend", '<div class="select__item"><div class="select__title">' + n + '</div><div class="select__options">' + select_get_options(l) + "</div></div></div>"), select_actions(e, t)
}

function select_actions(e, t) {
    const o = t.querySelector(".select__item"),
        l = t.querySelector(".select__title"),
        r = t.querySelector(".select__options"),
        s = t.querySelectorAll(".select__option"),
        n = e.getAttribute("data-type"),
        i = t.querySelector(".select__input");

    function a() {
        let o = t.querySelectorAll(".select__option"),
            l = e.querySelectorAll("option"),
            r = [];
        for (let e = 0; e < o.length; e++) {
            const t = o[e];
            if (l[e].removeAttribute("selected"), t.classList.contains("_selected")) {
                const o = t.innerHTML;
                r.push(o), l[e].setAttribute("selected", "selected")
            }
        }
        t.querySelector(".select__value").innerHTML = "<span>" + r + "</span>"
    }

    function c(e) {
        if (!e) {
            let e = document.querySelectorAll(".select");
            for (let t = 0; t < e.length; t++) {
                const l = e[t],
                    r = l.querySelector(".select__options");
                l != o.closest(".select") && (l.classList.remove("_active"), _slideUp(r, 100))
            }
            _slideToggle(r, 100), t.classList.toggle("_active")
        }
    }
    l.addEventListener("click", (function(e) {
        c()
    }));
    for (let o = 0; o < s.length; o++) {
        const l = s[o],
            r = l.getAttribute("data-value"),
            u = l.innerHTML;
        "input" == n ? i.addEventListener("keyup", select_search) : l.getAttribute("data-value") != e.value || e.hasAttribute("multiple") || (l.style.display = "none"), l.addEventListener("click", (function() {
            for (let e = 0; e < s.length; e++) {
                s[e].style.display = "block"
            }
            let o;
            "input" == n ? (i.value = u, e.value = r) : e.hasAttribute("multiple") ? (l.classList.toggle("_selected"), a()) : (t.querySelector(".select__value").innerHTML = "<span>" + u + "</span>", e.value = r, l.style.display = "none"), e.hasAttribute("multiple") && (o = "multiple"), c(o)
        }))
    }
}

function select_get_options(e) {
    if (e) {
        let t = "";
        for (let o = 0; o < e.length; o++) {
            const l = e[o],
                r = l.value;
            if ("" != r) {
                t = t + '<div data-value="' + r + '" class="select__option">' + l.innerHTML + "</div>"
            }
        }
        return t
    }
}

function select_search(e) {
    e.target.closest(".select ").querySelector(".select__options");
    let t = e.target.closest(".select ").querySelectorAll(".select__option"),
        o = e.target.value.toUpperCase();
    for (let e = 0; e < t.length; e++) {
        let l = t[e];
        (l.textContent || l.innerText).toUpperCase().indexOf(o) > -1 ? l.style.display = "" : l.style.display = "none"
    }
}

function selects_update_all() {
    let e = document.querySelectorAll("select");
    if (e)
        for (let t = 0; t < e.length; t++) {
            select_item(e[t])
        }
}
selects.length > 0 && selects_init();
let inputs = document.querySelectorAll("input[data-value],textarea[data-value]");

function inputs_init(e) {
    if (e.length > 0)
        for (let t = 0; t < e.length; t++) {
            const o = e[t],
                l = o.getAttribute("data-value");
            if (input_placeholder_add(o), "" != o.value && o.value != l && input_focus_add(o), o.addEventListener("focus", (function(e) {
                    o.value == l && (input_focus_add(o), o.value = ""), "pass" !== o.getAttribute("data-type") || o.parentElement.querySelector(".form__viewpass").classList.contains("_active") || o.setAttribute("type", "password"), o.classList.contains("_date"), o.classList.contains("_phone") && (o.classList.add("_mask"), Inputmask("+375 (99) 9999999", {
                        clearIncomplete: !0,
                        clearMaskOnLostFocus: !0,
                        onincomplete: function() {
                            input_clear_mask(o, l)
                        }
                    }).mask(o)), o.classList.contains("_digital") && (o.classList.add("_mask"), Inputmask("9{1,}", {
                        placeholder: "",
                        clearIncomplete: !0,
                        clearMaskOnLostFocus: !0,
                        onincomplete: function() {
                            input_clear_mask(o, l)
                        }
                    }).mask(o)), form_remove_error(o)
                })), o.addEventListener("blur", (function(e) {
                    "" == o.value && (o.value = l, input_focus_remove(o), o.classList.contains("_mask") && input_clear_mask(o, l), "pass" === o.getAttribute("data-type") && o.setAttribute("type", "text"))
                })), o.classList.contains("_date")) {
                const e = datepicker(o, {
                        customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
                        customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
                        overlayButton: "Применить",
                        overlayPlaceholder: "Год (4 цифры)",
                        startDay: 1,
                        formatter: (e, t, o) => {
                            const l = t.toLocaleDateString();
                            e.value = l
                        },
                        onSelect: function(e, t, o) {
                            input_focus_add(e.el)
                        }
                    }),
                    t = o.getAttribute("data-from"),
                    l = o.getAttribute("data-to");
                t && e.setMin(new Date(t)), l && e.setMax(new Date(l))
            }
        }
}

function input_placeholder_add(e) {
    const t = e.getAttribute("data-value");
    "" == e.value && "" != t && (e.value = t)
}

function input_focus_add(e) {
    e.classList.add("_focus"), e.parentElement.classList.add("_focus")
}

function input_focus_remove(e) {
    e.classList.remove("_focus"), e.parentElement.classList.remove("_focus")
}

function input_clear_mask(e, t) {
    e.inputmask.remove(), e.value = t, input_focus_remove(e)
}
inputs_init(inputs);
let quantityButtons = document.querySelectorAll(".quantity__button");
if (quantityButtons.length > 0)
    for (let e = 0; e < quantityButtons.length; e++) {
        const t = quantityButtons[e];
        t.addEventListener("click", (function(e) {
            let o = parseInt(t.closest(".quantity").querySelector("input").value);
            t.classList.contains("quantity__button_plus") ? o++ : (o -= 1, o < 1 && (o = 1)), t.closest(".quantity").querySelector("input").value = o
        }))
    }
const priceSlider = document.querySelector(".price-filter__slider");
if (priceSlider) {
    let e = priceSlider.getAttribute("data-from"),
        t = priceSlider.getAttribute("data-to");

    function setPriceValues() {
        let e, t;
        "" != priceStart.value && (e = priceStart.value), "" != priceEnd.value && (t = priceEnd.value), priceSlider.noUiSlider.set([e, t])
    }
    noUiSlider.create(priceSlider, {
        start: [0, 2e5],
        connect: !0,
        tooltips: [wNumb({
            decimals: 0,
            prefix: e + " "
        }), wNumb({
            decimals: 0,
            prefix: t + " "
        })],
        range: {
            min: [0],
            max: [2e5]
        }
    })
}

function mapAdd() {
    let e = document.createElement("script");
    e.src = "https://maps.google.com/maps/api/js?&callback=mapInit";
    let t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t)
}

function mapInit(e = 1) {
    google.maps.Map.prototype.setCenterWithOffset = function(e, t, o) {
        var l = this,
            r = new google.maps.OverlayView;
        r.onAdd = function() {
            var r = this.getProjection(),
                s = r.fromLatLngToContainerPixel(e);
            s.x = s.x + t, s.y = s.y + o, l.panTo(r.fromContainerPixelToLatLng(s))
        }, r.draw = function() {}, r.setMap(this)
    };
    for (var t = new Array, o = (new google.maps.InfoWindow({}), [
            [new google.maps.LatLng(47.81826553052645, 35.180830155331314)],
        ]), l = {
            zoom: 15,
            panControl: !1,
            mapTypeControl: !1,
            center: o[0][0],
        }, r = new google.maps.Map(document.getElementById("map"), l), s = {
            scaledSize: new google.maps.Size(50, 50),
            anchor: new google.maps.Point(9, 10)
        }, n = 0; n < o.length; n++) {
        var i = new google.maps.Marker({
            icon: s,
            position: o[n][0],
            map: r
        });
        google.maps.event.addListener(i, "click", function(e, o) {
            return function() {
                for (var o = 0; o < t.length; o++) t[o].setIcon(s);
                e.setIcon(s), r.setCenterWithOffset(e.getPosition(), 0, 0), setTimeout((function() {}), 10)
            }
        }(i)), t.push(i)
    }
    if (e) {
        var a = e - 1;
        setTimeout((function() {
            google.maps.event.trigger(t[a], "click")
        }), 500)
    }
}
document.querySelector("#map") && mapAdd();
let currentScroll, scr_body = document.querySelector("body"),
    scr_blocks = document.querySelectorAll("._scr-sector"),
    scr_items = document.querySelectorAll("._scr-item"),
    scr_fix_block = document.querySelectorAll("._side-wrapper"),
    scr_min_height = 750,
    scrolling = !0,
    scrolling_full = !0,
    scrollDirection = 0;

function scroll_scroll() {
    let e = currentScroll = pageYOffset,
        t = document.querySelector("header.header");
    if (null !== t && (e > 10 ? t.classList.add("_scroll") : t.classList.remove("_scroll")), scr_blocks.length > 0)
        for (let e = 0; e < scr_blocks.length; e++) {
            let t = scr_blocks[e],
                o = offset(t).top,
                l = t.offsetHeight;
            pageYOffset > o - window.innerHeight / 1.5 && pageYOffset < o + l - window.innerHeight / 5 ? t.classList.add("_scr-sector_active") : t.classList.contains("_scr-sector_active") && t.classList.remove("_scr-sector_active"), pageYOffset > o - window.innerHeight / 2 && pageYOffset < o + l - window.innerHeight / 5 ? t.classList.contains("_scr-sector_current") || t.classList.add("_scr-sector_current") : t.classList.contains("_scr-sector_current") && t.classList.remove("_scr-sector_current")
        }
    if (scr_items.length > 0)
        for (let t = 0; t < scr_items.length; t++) {
            let o = scr_items[t],
                l = offset(o).top,
                r = o.offsetHeight,
                s = window.innerHeight - (window.innerHeight - r / 3);
            window.innerHeight > r && (s = window.innerHeight - r / 3), e > l - s && e < l + r ? (o.classList.add("_active"), scroll_load_item(o)) : o.classList.remove("_active"), e > l - window.innerHeight && o.querySelectorAll("._lazy").length > 0 && scroll_lazy(o)
        }
    scr_fix_block.length > 0 && fix_block(scr_fix_block, e);
    let o = document.querySelector("._custom-scroll__line");
    if (o) {
        let e = window.innerHeight,
            t = document.querySelector(".wrapper").offsetHeight,
            l = pageYOffset / (t - e) * 100,
            r = o.offsetHeight;
        o.style.transform = "translateY(" + (e - r) / 100 * l + "px)"
    }
    scrollDirection = e <= 0 ? 0 : e
}

function scroll_lazy(e) {
    let t = e.querySelectorAll("*[data-src]");
    if (t.length > 0)
        for (let e = 0; e < t.length; e++) {
            const o = t[e];
            o.classList.contains("_loaded") || (o.setAttribute("src", o.getAttribute("data-src")), o.classList.add("_loaded"))
        }
    let o = e.querySelectorAll("*[data-srcset]");
    if (o.length > 0)
        for (let e = 0; e < o.length; e++) {
            const t = o[e];
            t.classList.contains("_loaded") || (t.setAttribute("srcset", t.getAttribute("data-srcset")), t.classList.add("_loaded"))
        }
}

function scrParallax(e, t, o) {
    let l = e.querySelectorAll("._prlx-item");
    if (l.length > 0)
        for (let e = 0; e < l.length; e++) {
            const r = l[e];
            const s = o / 100 * t / (r.dataset.prlx ? r.dataset.prlx : 3) * -1;
            r.style.cssText = `transform: translateY(${s}px);`
        }
}
if (window.addEventListener("scroll", scroll_scroll), setTimeout((function() {
        scroll_scroll()
    }), 100), scr_blocks.length > 0 && !isMobile.any()) {
    disableScroll(), window.addEventListener("wheel", full_scroll);
    let e = document.querySelectorAll("._swiper_scroll");
    if (e.length > 0)
        for (let t = 0; t < e.length; t++) {
            const o = e[t];
            o.addEventListener("mouseenter", (function(e) {
                window.removeEventListener("wheel", full_scroll)
            })), o.addEventListener("mouseleave", (function(e) {
                window.addEventListener("wheel", full_scroll)
            }))
        }
}

function getPrevBlockPos(e) {
    let t = window.innerHeight,
        o = e.offsetHeight,
        l = offset(e).top;
    return o >= t && (l += o - t), l
}

function full_scroll(e) {
    let t = window.innerHeight;
    if (t >= scr_min_height)
        if (scrolling_full) {
            let o = document.querySelector("._scr-sector._scr-sector_current"),
                l = offset(o).top,
                r = o.offsetHeight,
                s = o.nextElementSibling,
                n = o.previousElementSibling;
            if (40 == e.keyCode || 34 == e.keyCode || e.deltaX > 0 || e.deltaY < 0) r <= t ? n && full_scroll_to_sector(getPrevBlockPos(n)) : (enableScroll(), currentScroll <= l && n && full_scroll_to_sector(getPrevBlockPos(n)));
            else if (38 == e.keyCode || 33 == e.keyCode || e.deltaX < 0 || e.deltaY > 0)
                if (r <= t) {
                    if (s) {
                        full_scroll_to_sector(offset(s).top)
                    }
                } else if (enableScroll(), s) {
                let e = offset(s).top;
                currentScroll >= e - t && full_scroll_to_sector(e)
            }
        } else disableScroll();
    else enableScroll()
}

function full_scroll_to_sector(e) {
    disableScroll(), scrolling_full = !1, _goto(e, 800);
    let t = 500; - 1 != navigator.appVersion.indexOf("Mac") && (t = 1e3), setTimeout((function() {
        scrolling_full = !0
    }), t)
}

function full_scroll_pagestart() {}

function full_scroll_pageend() {}
let link = document.querySelectorAll("._goto-block");
if (link) {
    let e = [];
    for (let t = 0; t < link.length; t++) {
        let o = link[t],
            l = o.getAttribute("href").replace("#", "");
        "" == l || ~e.indexOf(l) || e.push(l), o.addEventListener("click", (function(e) {
            document.querySelector(".menu__body._active") && (menu_close(), body_lock_remove(500));
            let t = o.getAttribute("href").replace("#", "");
            _goto(document.querySelector("." + t), 300), e.preventDefault()
        }))
    }
    window.addEventListener("scroll", (function(t) {
        let o = document.querySelectorAll("._goto-block._active");
        if (o)
            for (let e = 0; e < o.length; e++) {
                o[e].classList.remove("_active")
            }
        for (let t = 0; t < e.length; t++) {
            let o = e[t],
                l = document.querySelector("." + o);
            if (l) {
                let e = offset(l).top,
                    t = l.offsetHeight;
                if (pageYOffset > e - window.innerHeight / 3 && pageYOffset < e + t - window.innerHeight / 3) {
                    let e = document.querySelectorAll('._goto-block[href="#' + o + '"]');
                    for (let t = 0; t < e.length; t++) {
                        e[t].classList.add("_active")
                    }
                }
            }
        }
    }))
}
let goto_links = document.querySelectorAll("._goto");
if (goto_links)
    for (let e = 0; e < goto_links.length; e++) {
        let t = goto_links[e];
        t.addEventListener("click", (function(e) {
            let o = t.getAttribute("href").replace("#", "");
            _goto(document.querySelector("." + o), 300), e.preventDefault()
        }))
    }

function _goto(e, t, o = 0) {
    let l = {
        speedAsDuration: !0,
        speed: t,
        header: "",
        offset: o,
        easing: "easeOutQuad"
    };
    (new SmoothScroll).animateScroll(e, "", l)
}

function offset(e) {
    var t = e.getBoundingClientRect(),
        o = window.pageXOffset || document.documentElement.scrollLeft,
        l = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: t.top + l,
        left: t.left + o
    }
}

function disableScroll() {
    window.addEventListener && window.addEventListener("DOMMouseScroll", preventDefault, !1), document.addEventListener("wheel", preventDefault, {
        passive: !1
    }), window.onwheel = preventDefault, window.onmousewheel = document.onmousewheel = preventDefault, window.ontouchmove = preventDefault, document.onkeydown = preventDefaultForScrollKeys
}

function enableScroll() {
    window.removeEventListener && window.removeEventListener("DOMMouseScroll", preventDefault, !1), document.removeEventListener("wheel", preventDefault, {
        passive: !1
    }), window.onmousewheel = document.onmousewheel = null, window.onwheel = null, window.ontouchmove = null, document.onkeydown = null
}

function preventDefault(e) {
    (e = e || window.event).preventDefault && e.preventDefault(), e.returnValue = !1
}

function preventDefaultForScrollKeys(e) {}

function fix_block(e, t) {
    let o = parseInt(window.innerWidth),
        l = parseInt(window.innerHeight),
        r = parseInt(document.querySelector("header").offsetHeight) + 15;
    for (let n = 0; n < e.length; n++) {
        const i = e[n];
        let a = i.getAttribute("data-width");
        const c = i.querySelector("._side-block");
        a || (a = 0), o > a && (c.offsetHeight < l - (r + 30) ? (t > offset(i).top - (r + 15) ? c.style.cssText = "position:fixed;bottom:auto;top:" + r + "px;width:" + i.offsetWidth + "px;left:" + offset(i).left + "px;" : s(c), t > i.offsetHeight + offset(i).top - (c.offsetHeight + (r + 15)) && (i.style.cssText = "position:relative;", c.style.cssText = "position:absolute;bottom:0;top:auto;left:0px;width:100%")) : s(c))
    }

    function s(e) {
        e.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;"
    }
}

function custom_scroll(e) {
    scr_body.style.overflow = "hidden";
    let t = window.innerHeight,
        o = document.querySelector("._custom-scroll__line"),
        l = document.querySelector(".wrapper").offsetHeight,
        r = Math.min(t, Math.round(t * (t / l)));
    if (l > t) {
        if (!o) {
            let e = document.createElement("div");
            o = document.createElement("div"), e.setAttribute("class", "_custom-scroll"), o.setAttribute("class", "_custom-scroll__line"), e.appendChild(o), scr_body.appendChild(e)
        }
        o.style.height = r + "px"
    }
}
isMobile.any();
let new_pos = pageYOffset;

function scroll_animate(e) {
    let t = window.innerHeight,
        o = document.querySelector(".wrapper").offsetHeight;
    pageYOffset;
    if (40 == e.keyCode || 34 == e.keyCode || e.deltaX > 0 || e.deltaY < 0 ? new_pos -= 100 : (38 == e.keyCode || 33 == e.keyCode || e.deltaX < 0 || e.deltaY > 0) && (new_pos += 100), new_pos > o - t && (new_pos = o - t), new_pos < 0 && (new_pos = 0), scrolling) {
        scrolling = !1, _goto(new_pos, 1e3);
        let e = 100; - 1 != navigator.appVersion.indexOf("Mac") && (e *= 2), setTimeout((function() {
            scrolling = !0, _goto(new_pos, 1e3)
        }), e)
    }
}