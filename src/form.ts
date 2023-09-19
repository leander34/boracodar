import { startLoading, stopLoading, loadingMessage } from './loading'
import { getVideoId, loadVideo } from './youtube-api'
import { api } from './lib/axios'
import { transcribeAudio } from './transcribe'
import { renderText } from './render'
import { copy } from './copy'
const form = document.querySelector<HTMLFormElement>('#form')


form?.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
        loadingMessage('Iniciando a aplicação')
        startLoading()

        const formData = new FormData(form)
        const url = formData.get('url')
        if(!url) {
            return
        }

        await loadVideo(url.toString())
    
        loadingMessage('Baixando e convertendo o vídeo')

        await api.get('/audio', {
            params: {
                v: getVideoId(url.toString())
            }
        })

        const data = await transcribeAudio()

        renderText(data)
        copy(data.text)


    } catch (error) {
        console.log('[SUBMIT_ERROR]', error)
    } finally {
        stopLoading()
    }
})