import OverallSentiment from "./OverallSentiment"
import SearchBar from "./SearchBar"

const AnalysisPage = ()=>{
    return(
        <div className="mt-10 px-6 md:px-12 lg:px-20 min-h-screen w-full flex flex-col items-center">
            <div className="mb-6">
                <SearchBar />
            </div>
            <OverallSentiment />
        </div>
    )
}

export default AnalysisPage