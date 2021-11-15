'use strict'

const { rgb2hex, hex2rgb } = require('../lib')

test('测试 rgb2hex', () => {
    expect(rgb2hex('rgb(255,255,255)')).toEqual({
        hex: '#ffffff',
        alpha: 1
    })

    expect(rgb2hex('rgba(255,255,255,.5)')).toEqual({
        hex: '#ffffff',
        alpha: 0.5
    })

    expect(rgb2hex('rgba(255,255,255,1)')).toEqual({
        hex: '#ffffff',
        alpha: 1
    })

    expect(rgb2hex([255, 255, 255])).toEqual({
        hex: '#ffffff',
        alpha: 1
    })

    expect(rgb2hex([255, 255, 255, 0.5])).toEqual({
        hex: '#ffffff',
        alpha: 0.5
    })

    expect(rgb2hex(['255', '255', '255', '.5'])).toEqual({
        hex: '#ffffff',
        alpha: 0.5
    })

    expect(rgb2hex(3)).toBe(null)

    try {
        expect(rgb2hex([255, 255])).toThrow()
    } catch (error) {
        console.log(error)
    }

    try {
        expect(rgb2hex(['255', '255'])).toThrow()
    } catch (error) {
        console.log(error)
    }

    try {
        expect(rgb2hex('')).toThrow()
    } catch (error) {
        console.log(error)
    }
})

test('测试 hex2rgb', () => {
    expect(hex2rgb('#FFFFFF')).toBe('rgba(255,255,255,1)')

    expect(hex2rgb('#FFF')).toBe('rgba(255,255,255,1)')

    try {
        expect(hex2rgb(3)).toThrow()
    } catch (error) {
        
    }

    try {
        expect(hex2rgb([])).toThrow()
    } catch (error) {
        
    }

    try {
        expect(hex2rgb('')).toThrow()
    } catch (error) {
        
    }

    try {
        expect(hex2rgb('#11')).toThrow()
    } catch (error) {
        
    }
})