import { React } from 'react'
import Button from './Button'

const ResolvedModal = ({ setVisible, resolveItem, body }) => {
    const handleResolveItem = () => {
        resolveItem(body)
    }

    const handleCloseChange = () => {
        setVisible(false)
    }

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black bg-opacity-25 select-none backdrop-blur-sm">
            <div className="relative p-10 border-2 border-gray bg-gray/80 rounded-xl">
                <div className="p-28 pt-12 text-2xl font-bold">Jeste li sigurni?</div>
                <div className="flex justify-evenly pb-4">
                    <Button onClick={handleResolveItem} className="w-1/3 text-xl font-bold mx-4">
                        DA
                    </Button>
                    <Button onClick={handleCloseChange} className="w-1/3 text-xl font-bold mx-4">
                        NE
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ResolvedModal