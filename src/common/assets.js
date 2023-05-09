import {Assets} from 'pixi.js'
import appTextures, { allTextureKeys } from './textures'

Object.entries(appTextures).forEach(([key, value]) => { // превращяем объект с путями в массив
    Assets.add(key, value) // добавляем каждый элемент ресурс в Assets
})

const textures = new Map() // создаём новый массив это будет кэшем текстур

export const loadAssets = (onProgress) => { //   массив с ресурсами
    const keys = Object.entries(allTextureKeys).map(([key, value]) => value)
    Assets.load([...keys], onProgress).then((data) => { //загружаем ресурсы // массив индификаторов передаём в load он предварительно должен добавлен методом add, вторым параметрром колбек функцию которая долна возвращать процент загрузки и зарезолвится после успешной загрузки всех ресурсов
        Object.entries(data).forEach(([key, value]) => {
            textures.set(key, value)
        })
        onProgress('all') // вызываем колбек функцию с параметром all значит все ресурсы загружены
    })
}

export const getTexture = (id) => { // получение текстуры по индификатору
    if(textures.has(id)){
        return textures.get(id)
    }
    return null
}