const animationBoard = document.documentElement

document.addEventListener('DOMContentLoaded',()=>{
    const object = document.getElementsByClassName('about_detail')
     for (i = 0 ; i < object.length ; i ++){
            object[i].style.animationPlayState = 'paused'
        }

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

    animateAbout('about_detail',opacity_endTime + 0.1)
});
})

