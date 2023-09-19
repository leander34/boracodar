const copyButton = document.querySelector<HTMLButtonElement>('button.copy')

export const copy = (text: string) => {
    copyButton?.addEventListener('click', () => {
        navigator.clipboard.writeText(text)
        const icon = copyButton.querySelector('i.ph')
        icon?.setAttribute('class', 'ph ph-check-circle')

        setTimeout(() => {
        icon?.setAttribute('class', 'ph ph-copy-simple')

        }, 2000)
    })
}