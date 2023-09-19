import cors from 'cors'
import express from 'express'
import { downloader } from './download-video'
import { createMP3 } from './create-mp3'


const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.static('/uploads', {}))

app.get('/audio', async (req, res) => {
    const videoId = String(req.query.v)
    console.log(req.query)

    try {

        await downloader(videoId)
        await createMP3()
         return res.status(200).json({
            videoId
         })
    } catch (error) {
        console.log(error)
        return res.status(400).send()
    }

   
})

app.listen(4005, () => {
    console.log('Servidor rodando na porta 4005')
})