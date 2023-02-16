import "./index.css"
import SmallText from "./components/SmallText"

const App = () => {
    return (
        <div className="App bg-background h-screen">
            <h1 className="text-3xl font-bold underline text-center">Lost & Found Zagreb</h1>
            <h2 className="text-3x1 font-bold text-center">Using tailwindcss</h2>
            <SmallText>Small text</SmallText>
        </div>
    )
}

export default App
