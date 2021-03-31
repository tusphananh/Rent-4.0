const animationBoard = document.documentElement;

function animate(animate,first_x,first_y,last_x,last_y,start,end) {
    const scrollTop = animationBoard.scrollTop;
    const maxScrollTop = animationBoard.scrollHeight - window.innerHeight;
    const fraction = (scrollTop - maxScrollTop * start) / (maxScrollTop * (end - start))
    const object = document.getElementsByClassName(animate)

    if (scrollTop >= start * maxScrollTop ) {
        let x = (last_x - first_x)*fraction + first_x
        let y = (last_y - first_y)*fraction + first_y
        if (scrollTop <= maxScrollTop * end) {
            object[0].style.left = x + '%'
            object[0].style.top = y + '%'
        } else {
            object[0].style.left = last_x + '%'
            object[0].style.top = last_y + '%'
        }
    } else {
        object[0].style.left = first_x + '%'
        object[0].style.top = first_y + '%'
    }

}
function animatePX(animate,first_x,first_y,last_x,last_y,start,end) {
    const scrollTop = animationBoard.scrollTop;
    const maxScrollTop = animationBoard.scrollHeight - window.innerHeight;
    const fraction = (scrollTop - maxScrollTop * start) / (maxScrollTop * (end - start))
    const object = document.getElementsByClassName(animate)

    if (scrollTop >= start * maxScrollTop ) {
        let x = (last_x - first_x)*fraction + first_x
        let y = (last_y - first_y)*fraction + first_y
        if (scrollTop <= maxScrollTop * end) {
            object[0].style.left = x + 'px'
            object[0].style.top = y + 'px'
        } else {
            object[0].style.left = last_x + 'px'
            object[0].style.top = last_y + 'px'
        }
    } else {
        object[0].style.left = first_x + 'px'
        object[0].style.top = first_y + 'px'
    }

}

function size(animate,first_w,last_w,start,end) {
    const scrollTop = animationBoard.scrollTop;
    const maxScrollTop = animationBoard.scrollHeight - window.innerHeight;
    const fraction = (scrollTop - maxScrollTop * start) / (maxScrollTop * (end - start))
    const object = document.getElementsByClassName(animate)

    if (scrollTop >= start * maxScrollTop) {
        let w = (last_w - first_w)*fraction + first_w
        if (scrollTop <= maxScrollTop * end) {
            object[0].style.width = w + '%'
        } else {
            object[0].style.width = last_w + '%'
        }
    } else {
        object[0].style.width = first_w + '%'
    }
}


function opacity(animate,start,end) {
    const scrollTop = animationBoard.scrollTop;
    const maxScrollTop = animationBoard.scrollHeight - window.innerHeight;
    const fraction = (scrollTop - maxScrollTop * start) / (maxScrollTop * (end - start))
    const object = document.getElementsByClassName(animate)

    if (scrollTop >= start * maxScrollTop) {
        let opa = fraction
        if (scrollTop <= maxScrollTop * end) {
            object[0].style.opacity = opa
        } else {
            object[0].style.opacity = 1
        }
    } else {
        object[0].style.opacity = 0
    }
}


function position(animate,first_position,last_position,start) {
    const scrollTop = animationBoard.scrollTop;
    const maxScrollTop = animationBoard.scrollHeight - window.innerHeight;
    const object = document.getElementsByClassName(animate)

    if (scrollTop >= start * maxScrollTop) {
        object[0].style.position = last_position
    } else {
        object[0].style.position = first_position
    }
}
const animate_startTime = 0
const animate_endTime = 0.45

const size_startTime = 0
const size_endTime = 0.45

const opacity_startTime = 0
const opacity_endTime = 0.45

window.addEventListener('scroll', () => {
    animate("charger",-200,-100,10,10,animate_startTime,animate_endTime)
    size("charger",200,50,size_startTime,size_endTime)
    opacity("charger",opacity_startTime,opacity_endTime)

    animate("drone",100,-100,50,10,animate_startTime,animate_endTime)
    size("drone",200,50,size_startTime,size_endTime)
    opacity("drone",opacity_startTime,opacity_endTime)

    animate("bike",-200,100,1,50,animate_startTime,animate_endTime)
    size("bike",200,50,size_startTime,size_endTime)
    opacity("bike",opacity_startTime,opacity_endTime)

    animate("phone",30,200,30,50,animate_startTime,animate_endTime)
    size("phone",200,50,size_startTime,size_endTime)
    opacity("phone",opacity_startTime,opacity_endTime)

    animate("boxes",200,100,70,50,animate_startTime,animate_endTime)
    size("boxes",200,50,size_startTime,size_endTime)
    opacity("boxes",opacity_startTime,opacity_endTime)

     animatePX("introduction_container",0,10,0,-900,opacity_endTime,opacity_endTime + 0.2)

});
