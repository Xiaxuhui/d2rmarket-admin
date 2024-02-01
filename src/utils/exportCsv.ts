const tableToExcel = () => {
  const jsonData = [
    {
      name: '路人甲',
      phone: '123456789',
      email: '000@123456.com',
    },
    {
      name: '炮灰乙',
      phone: '123456789',
      email: '000@123456.com',
    },
    {
      name: '土匪丙',
      phone: '123456789',
      email: '000@123456.com',
    },
    {
      name: '流氓丁',
      phone: '123456789',
      email: '000@123456.com',
    },
  ];
  let str = `姓名,电话,邮箱`;
  for (let i = 0; i < jsonData.length; i++) {
    for (const key in jsonData[i]) {
      str += `${jsonData[i][key] + '	'},`;
    }
  }
  const uri = 'data:text/csv;charset=utf-8,ufeff' + encodeURIComponent(str);
  const link = document.createElement('a');
  link.href = uri;
  link.download = 'json数据表.csv';
  link.click();
};

export default tableToExcel;
