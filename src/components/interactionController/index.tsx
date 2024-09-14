import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useInteractionController } from '../../hooks/useInteractionController'

const InteractionController = () => {
	const {
		height,
		width,
		isPaused,
		setIsPaused,
		dynamicArray,
		rightSideActualWidth,
		gap,
		screenIndex,
	} = useInteractionController()
	// console.log(height, width, rightSideActualWidth)
	// console.log(dynamicArray)

	const [startingValue, setStartingValue] = useState<string>('0')
	const [endingValue, setEndingValue] = useState<string>('1')

	const singleMark = (ind: number): React.JSX.Element => {
		return (
			<div
				key={ind}
				className="w-[1px] bg-black relative transition-all"
				style={{
					height: ind % 10 == 0 ? 16 : 8,
				}}
			>
				{ind % 10 === 0 && (
					<div
						className="w-5 py-1
						absolute top-[-20px] flex items-center 
						justify-center right-[-10px] rounded-sm
						transition-all
				"
					>
						<p className="text-[.5rem] text-black">
							{/* {endingValue
								? ((Number.parseInt(endingValue) / ((screenIndex))) * ind).toFixed(2)
								: ''} */}
							{endingValue
								? (
										(Number.parseInt(endingValue) / ((screenIndex + 1) * 50)) *
										ind
								  ).toFixed(2)
								: ''}
						</p>
					</div>
				)}
			</div>
		)
	}

	return (
		<div
			className="h-16 w-full bg-white rounded-md
            flex overflow-hidden
        "
		>
			{/* left section */}
			<div
				className="h-full w-1/6 bg-red-100 flex
                items-center justify-center gap-3
            "
			>
				<div
					className="w-4"
					onClick={() => {
						setIsPaused(!isPaused)
					}}
				>
					<FontAwesomeIcon icon={isPaused ? faPlay : faPause} />
				</div>
				<div
					className="h-full w-16  flex
					justify-center items-center
				"
				>
					<input
						value={startingValue}
						disabled={true}
						type="text"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setStartingValue(e.target.value)
						}}
						className="w-5 text-sm h-7 rounded-sm bg-white
						text-black outline-none hover:outline-2 
						hover:outline-red-200 pl-[5px]"
					/>
					<span className="px-2">/</span>
					<input
						value={endingValue}
						type="text"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setEndingValue(e.target.value)
						}}
						className="w-[35px] text-sm h-7 rounded-sm
						text-black outline-none hover:outline-2 
						hover:outline-red-200 pl-[5px]"
					/>
				</div>
			</div>

			{/* right section */}
			<div
				className="h-full w-5/6 
                flex items-end pl-4 pr-4
				bg-green-100
				"
			>
				<div
					className={`flex bg-violet-100 items-end
					transition-all`}
					// w-full
					style={{
						gap,
						width: rightSideActualWidth,
					}}
				>
					{dynamicArray.map((item, index) => {
						return singleMark(index)
					})}
				</div>
			</div>
		</div>
	)
}

export default InteractionController
