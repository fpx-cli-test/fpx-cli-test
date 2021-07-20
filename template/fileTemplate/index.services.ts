import { request } from "ice";

async function getTableList(data) {
  const res = await request({
    url: '',
    method: '',
    data,
  })

  return {
    total: res.totalElements,
    list: res.list,
  };
}


export {
  getTableList,
};