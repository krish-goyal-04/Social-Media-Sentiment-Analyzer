const QuickStats = ({results})=>{
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <BarChart3 className="text-blue-400 mx-auto mb-3" size={24} />
                <div className="text-2xl font-bold text-white">{results.tweetsData?.length || 0}</div>
                <div className="text-gray-300 text-sm">Posts Analyzed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Heart className="text-pink-400 mx-auto mb-3" size={24} />
                <div className="text-2xl font-bold text-white">
                    {results.tweetsData?.reduce((sum, tweet) => sum + (tweet.likeCount || 0), 0).toLocaleString()}
                </div>
                <div className="text-gray-300 text-sm">Total Likes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <MessageSquare className="text-green-400 mx-auto mb-3" size={24} />
                <div className="text-2xl font-bold text-white">
                    {results.tweetsData?.reduce((sum, tweet) => sum + (tweet.retweetCount || 0), 0).toLocaleString()}
                </div>
                <div className="text-gray-300 text-sm">Total Shares</div>
            </div>
        </div>
    )
}
export default QuickStats