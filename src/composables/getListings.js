/*
 * @name - getList
 * @descrition - get a list of kiosk checkins
 */
const getList = async (obj) => {
  const data = await obj.axios
    .post(
      `/LobbyGuard/GetList?paging.pageIndex=${obj.paging.index}&paging.numberOfRows=${obj.paging.numberOfRows}`,
      obj.params,
    )
    .catch((error) => {
      console.log('getList API error: ', error)
    })

  // If success
  if (data?.status === 200) {
    // console.log('GET KIOSK PEOPLE:: ', data)
    return data.data
  }
}

export default getList
