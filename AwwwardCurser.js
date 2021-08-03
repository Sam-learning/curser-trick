import React, { useEffect, useRef } from 'react';
import './AwwwardCurser.css'

const AwwwardCurser = () => {
    const mainCurser = useRef(null)
    const secondCurser = useRef(null)

    const positionRef = useRef({
        mouseX:0,
        mouseY:0,
        destinationX:0,
        destinationY:0,
        distanceX:0,
        distanceY:0,
        key:-1,
    })

    useEffect(()=>{
        document.addEventListener("mousemove",(event)=>{
            const { clientX, clientY } = event;

            const mouseX = clientX;
            const mouseY = clientY;

            positionRef.current.mouseX = mouseX - secondCurser.current.clientWidth / 2;
                
            positionRef.current.mouseY = mouseY - secondCurser.current.clientHeight / 2;
                

            mainCurser.current.style.transform = `translate3d(
                ${mouseX - mainCurser.current.clientWidth / 2}px,
                ${mouseY - mainCurser.current.clientHeight / 2}px,
                 0)`;
        })

        return ()=>{}
    },[])

    useEffect(()=>{
        const followMouse = ()=>{
            positionRef.current.key = requestAnimationFrame(followMouse);

            const {
                mouseX,
                mouseY,
                destinationX,
                destinationY,
                distanceX,
                distanceY,
            } = positionRef.current

            if(!destinationX | !destinationY){
                positionRef.current.destinationX = mouseX
                positionRef.current.destinationY = mouseY
            } else{
                positionRef.current.distanceX = (mouseX-destinationX) * 0.04;
                positionRef.current.distanceY = (mouseY-destinationY) * 0.04;

                if(Math.abs(positionRef.current.destinationX)+Math.abs(positionRef.current.destinationY)<0.1){
                    positionRef.current.destinationX = mouseX;
                    positionRef.current.destinationY = mouseY;
                }else{
                    positionRef.current.destinationX += distanceX;
                    positionRef.current.destinationY += distanceY;
                }
            }
            secondCurser.current.style.transform = `translate3d(${destinationX}px,${destinationY}px,0)`
        }
        followMouse()
        
    },[])



    return (
        <div>
            <div className='main-curser' ref={mainCurser}></div>
            <div className='second-curser' ref={secondCurser}></div>
        </div>
    );
};

export default AwwwardCurser;