import { useState, useEffect } from 'react'
import axios from 'axios'
import { AnimalImage, EntryFieldsRepository, UseAnimalsImages } from './interfaces'

const MAX_RETRIES = 3
const MODYO_ANIMALS = 'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries'

export const useAnimalsImages = (imagesPerPage: number = 20): UseAnimalsImages => {
  const [animalsImages, setAnimalsImages] = useState<AnimalImage[]>([])
  const [isLoading, setLoading] = useState(true)
  const [refreshData, setRefreshData] = useState(false)
  const [error, setError] = useState(false)
  const [retriesCount, setRetriesCount] = useState(0)

  const refreshImages = () => {
    setRefreshData(!refreshData)
  }

  useEffect(() => {
    setLoading(true)
    const getAnimalsImage = async () => {
      await axios({
        method: 'GET',
        url: MODYO_ANIMALS,
        params: { per_page: imagesPerPage },
      }).then(res => {
        const entryFields = res.data?.entries as EntryFieldsRepository[] || []
        const animalsImages = entryFields.map((entryFields) => {
          const imageField = entryFields.fields.image
          return {
            url: imageField.url,
            alt: imageField.alt_text || imageField.title,
            id: imageField.uuid
          }
        })
        const sortedImages = [...animalsImages, ...structuredClone(animalsImages)].sort(() => Math.random() - 0.5)
        setAnimalsImages(sortedImages)
        setLoading(false)
      }).catch(_e => {
        if (retriesCount <= MAX_RETRIES) setRetriesCount(retriesCount + 1)

        setLoading(false)
        setError(true)
      })
    }

    getAnimalsImage()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retriesCount, refreshData])

  return {
    animalsImages,
    error,
    isLoading,
    refreshImages,
  }
}
