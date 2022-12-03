import Header from "../Header"

const DashBoardTemplate = ({ children }) => {
    return <>
        <div className="flex flex-col h-screen w-full">
            <Header />
            <div className="overflow-y-auto  h-full w-full p-2"> {children}</div>
        </div>
    </>
}

export default DashBoardTemplate