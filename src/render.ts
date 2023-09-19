interface RenderTextProps {
    chunks: {
        text: string
        timestamp: number[]
    }[]
    text: string
}
window.seek = (event) => {
    const seekTo = event.currentTarget.dataset.seekTo
    window.YTPlayer.seekTo(seekTo)
    window.YTPlayer.playVideo()

}

const renderChunk = ({ text, timestamp }: {
    text: string
    timestamp: number[]
}) => `
 <div class="chunk">
    <time onclick=seek(event) data-seek-to=${timestamp[0]}>${getMinutes(timestamp)}</time>
    <p>
        ${groupedText(text, timestamp)}
    </p>
</div>
`


function getMinutes(timestamp: number[]) {
    const data = new Date(0)
    data.setTime(timestamp[0] * 1000)
    return data.toISOString().slice(14, 19)
}




function groupedText(text: string, timestamp: number[]) {
    const words = text.split(' ')
    const groups = []
    for(let idx = 0; idx < words.length; idx++) {
        if(idx % 3 === 0) {
            groups.push(words.slice(idx, idx + 3).join(' '))
        }
    }


    return groups.map((item, idx) => {
        const [initialTime, finalTime] = timestamp
        const seekTo = idx === 0 ? initialTime : ((finalTime - initialTime) / (groups.length - idx)) + initialTime
        return `<span onclick=seek(event) data-seek-to=${seekTo}>${item}</span>`
    }).join('')
}

export function renderText({ chunks }: RenderTextProps) {
    const formattedTranscription = chunks.map(chunk => renderChunk({ text: chunk.text, timestamp: chunk.timestamp})).join('')
    const chunkContent = document.querySelector<HTMLDivElement>('.transcription .content')!
    chunkContent.innerHTML = formattedTranscription
 }