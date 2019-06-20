import { getNotice } from 'SERVICE/system'

const loadSystemMessage = async () => {
  const apiData = await getNotice({}, true)
  const list = apiData.map(d => {
    const { title, content, data } = d
    let mes = {
      title,
      content,
    }
    if (data) {
      const { path, ...params } = data
      mes = { ...mes, path, params }
    }
    return mes
  })
  return list
}

export default {
  loadSystemMessage,
}
