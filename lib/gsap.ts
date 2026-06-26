'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(ScrollTrigger, Observer, Draggable)

export { gsap, ScrollTrigger, Observer, Draggable }
