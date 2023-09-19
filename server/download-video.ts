import ytdl from "ytdl-core";
import fs from 'node:fs'

export const downloader = (videoId: string) => new Promise((resolve, reject) => {
    const videoURL = `https://www.youtube.com/watch?v=${videoId}`
    console.log('[START_DOWNLOAD]')

    ytdl(videoURL, {
        quality: "lowestaudio",
        filter: 'audioonly'
    }).on('end', () => {
        console.log('[FINISHED_DOWNLOAD]')
        resolve(null)
    }).on('error', (e) => {
        console.log('ERROR_DOWNLOAD')
        reject('[ERROR_DOWNLOADING_VIDEO]')
    }).pipe(fs.createWriteStream('audio.mp4'))
})