import React, { useCallback, useEffect, useState } from 'react'

export const useInteractionController = (timeInSeconds: number) => {
	const [height, setHeight] = useState<number>(0)
	const [width, setWidth] = useState<number>(0)
	const [isPaused, setIsPaused] = useState<boolean>(true)
	const [screenIndex, setScreenIndex] = useState<number>(0)
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	const [rightSideActualWidth, setRightSideActualWidth] = useState<number>(0)
	const [gap, setGap] = useState<number>(0)

	const [dynamicArray, setDynamicArray] = useState<Array<number>>([])
	const delay = (timeInSeconds * 1000) / ((screenIndex + 1) * 50)
	// console.log('amount of delay: ', delay)

	const generateDynamicArray = (size: number, ini: number) => {
		setDynamicArray(
			Array.from({ length: size }, (v = 0, i: number = ini) => i++)
		)
	}

	const wait = (time: number): Promise<any> => {
		// console.log('time inside the wait function: ', time)

		return new Promise((resolve, reject) => {
			if (currentIndex <= (screenIndex + 1) * 50) {
				resolve(
					setTimeout(() => {
						setCurrentIndex(currentIndex + 1)
					}, time)
				)
			} else {
				reject('out')
			}
		})
	}

	const indexingBasedOnScreenWidth = (h: number, w: number) => {
		if (w < 640) {
			setScreenIndex(0)
		} else if (w >= 640 && w < 768) {
			setScreenIndex(1)
		} else if (w >= 768 && w < 1024) {
			setScreenIndex(1)
		} else if (w >= 1024 && w < 1280) {
			setScreenIndex(3)
		} else if (w >= 1280 && w < 1536) {
			setScreenIndex(4)
		} else {
			setScreenIndex(5)
		}
	}

	const handleWindowResize = () => {
		const windowHeight = window.innerHeight
		const windowWidth = window.innerWidth
		const actualWidthOnRightSide = window.innerWidth * (5 / 6)

		setHeight(windowHeight)
		setWidth(windowWidth)

		indexingBasedOnScreenWidth(windowHeight, windowWidth)
		const widthExceptLines =
			screenIndex === 0
				? (actualWidthOnRightSide - 40 - (screenIndex + 1) * 51) /
				  ((screenIndex + 1) * 51)
				: (actualWidthOnRightSide - 40 - (screenIndex + 1) * 50 + 1) /
				  ((screenIndex + 1) * 50 + 1)

		// console.log('current screen index is: ',screenIndex)

		generateDynamicArray((screenIndex + 1) * 50 + 1, 0)

		setRightSideActualWidth(actualWidthOnRightSide - 40)
		setGap(widthExceptLines)
	}

	useEffect(() => {
		handleWindowResize()
		window.addEventListener('resize', handleWindowResize)
	}, [width])

	useEffect(() => {
		if (!isPaused) {
			// console.log(timeInSeconds, delay)
			wait(delay)
				.then(() => console.log('looping'))
				.catch((message) => console.log(message))
		}
	}, [isPaused, timeInSeconds, currentIndex])

	return {
		height,
		width,
		isPaused,
		setIsPaused,
		rightSideActualWidth,
		gap,
		screenIndex,
		dynamicArray,
		currentIndex,
	}
}
