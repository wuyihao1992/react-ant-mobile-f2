
import { previewFile } from 'SERVICE/common'
import showMessage from 'COMPONENT/utils/globalTips/showMessage'

const preview = async ({ previewPath, src, type }) => {
    if (previewPath) {
        window.open(previewPath, '_blank')
        return previewPath
    } else {
        try {
            const newTab = window.open('about:blank')
            const path = await previewFile({ file: src, type }, true)
            newTab.location.href = path
            return path
        } catch (e) {
            showMessage('预览失败')
        }
    }
}

  export default preview