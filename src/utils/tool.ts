// 数组：根据相同项返回二维数组
export const getTwoDimArr = (arr: ArrayType, key: string) => {
  const result = Object.values(
    arr.reduce((obj: ObjectType, v: ObjectType) => {
      obj[v[key]] ? obj[v[key]].push(v) : (obj[v[key]] = [v])
      return obj
    }, {})
  )
  return result
}

// 数组：2个数组（对象）比较查找符合条件的相同数据并返回数组
export const getAlikeArr = (arr1: ArrayType, arr2: ArrayType, key1?: string, key2?: string) => {
  const result = arr1.filter((v: any) => {
    return arr2.some((i: any) => (key1 ? v[key1] : v) === (key2 ? i[key2] : i))
  })
  return result
}

// 更改（数组）对象的键名
export const changeObjKey = (data: ObjectType | ArrayType, oldKey: string, newKey: string) => {
  return JSON.parse(JSON.stringify(data).replaceAll(oldKey, newKey))
}

// 获取本地图片资源路径
export const getAssetsImages = (name: string) => {
  return new URL(`/src/assets/img/${name}`, import.meta.url).href
}

// 通过文件下载接口下载文件
export const urlExport = (url: string) => {
  window.open(url)
}

// 通过接口返回文件本身下载文件
export const fileExport = (res: any) => {
  const blob = new Blob([res.data])
  const strArr = res.headers['content-disposition'].split(';')
  const fileName = decodeURI(strArr[1].split('=')[1])
  if ('download' in document.createElement('a')) {
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.target = '_blank'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href)
    document.body.removeChild(elink)
  }
}

// 通过文件路径下载文件
export const pathExport = (path: string, fileName: string) => {
  if (!path) return
  const callback = (data: string) => {
    const link = document.createElement('a')
    const objectUrl = window.URL.createObjectURL(new Blob([data]))
    link.style.display = 'none'
    link.href = objectUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    window.URL.revokeObjectURL(objectUrl)
  }
  const xhr = new XMLHttpRequest()
  xhr.open('get', path, true)
  xhr.responseType = 'blob'
  xhr.onload = () => callback(xhr.response)
  xhr.send()
}
