import {parse,format,startOfHour} from 'date-fns'
import SentimentLineChart from './SentimentLineChart'

const SentimentOverTime = ({tweets})=>{
    const data = {}

    tweets.forEach(tweet=>{
        const parsedDate = parse(tweet.createdAt, "EEE MMM dd HH:mm:ss xx yyyy",new Date())
        const hour = startOfHour(parsedDate)
        const timeLabel = format(hour,'yyyy-MM-dd HH:mm')
        const sentiment = tweet.individual_sentiment.sentiment
        const confidence = tweet.individual_sentiment.confidence
        if(!data[timeLabel]){
            data[timeLabel] = {timeLabel,positive:null,negative:null,neutral:null}
        }
        data[timeLabel][sentiment]=confidence
    })
    console.log(data)
    return(
        <div className='p-4 w-full h-80'>
           <SentimentLineChart data={Object.values(data)} />
        </div>
    )
}
export default SentimentOverTime