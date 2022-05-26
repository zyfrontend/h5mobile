import blueimpmd5 from 'blueimp-md5';
// md5加密
function md5(sMessage) {
  return blueimpmd5(sMessage);
}

function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`;
  }
  return year + month + strDate;
}

export default function sign(data) {
  // common.md5(`${bsc.walletAddress}.${common.getDate()}`).substring(0, 10),
  return md5(`${data}.${getDate()}`).substring(0, 10);
}
