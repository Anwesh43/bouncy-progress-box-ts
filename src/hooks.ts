import {useState, useEffect, CSSProperties} from 'react'

const scGap : number = 0.02 
const delay : number = 20 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)

const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 

export const useStyle = (w : number, h : number, scale : number) => {
    const position = 'absolute'
    const background = '#00C853'
    const sc1 : number = divideScale(scale, 0, 3)
    const sc2 : number = divideScale(scale, 1, 3)
    const sc3 : number = divideScale(scale, 2, 3)
    const x : number = w - (w / 7) * (sc1 - sc3)
    const blockW : number = (w / 7) * (sc1 - sc3)
    const blockH : number = h / 7 
    const lineW : number = (w / 7) * sc2 
    const lineH : number = h / 70
    return {
        blockStyle(): CSSProperties {
            const left : string = `${x}px`
            const top : string = `${0}px`
            const width : string = `${blockW}px`
            const height : string = `${blockH}px`
            return {
                position, 
                left, 
                top, 
                width, 
                height, 
                background 
            }
        }, 
        lineStyle() : CSSProperties {
            const width : string = `${lineW}px`
            const height : string = `${lineH}px`
            const background = 'white'
            return {
                position, 
                width,
                height,
                background 
            }           
        }
    }
}