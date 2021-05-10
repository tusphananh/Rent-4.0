
function animateAbout(animate,start) {
    const scrollTop = animationBoard.scrollTop;
    const maxScrollTop = animationBoard.scrollHeight - window.innerHeight;
    const object = document.getElementsByClassName(animate)

    if (scrollTop >= start * maxScrollTop ) {
        for (i = 0 ; i < object.length ; i ++){
            object[i].style.animationPlayState = 'running'
        }
    }

}

