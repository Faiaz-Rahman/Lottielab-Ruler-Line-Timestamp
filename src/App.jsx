import { useState } from 'react'
import InteractionController from './components/interactionController'

function App() {
	return (
		<div
			className="h-screen w-screen bg-violet-300 px-2
      			flex items-center
    		"
		>
			<InteractionController />
		</div>
	)
}

export default App
