import { pick } from 'lodash-es';
import XLSX from 'xlsx';
import file from 'file-saver';

export const exportExcel = (data, name, columConfig) => {
  if (data.length === 0) {
    return;
  }
  const columnEnum = {};
  const res = columConfig.map((item) => {
    const customRender = item.customRender;
    columnEnum[item.dataIndex] = {
      label: item.title,
      formatter: customRender ? (val) => customRender({ value: val }) : (val) => val,
    };
    return item.dataIndex;
  });
  const handledData = data.map((item) => {
    const pickItem = pick(item, ...res);
    const handledItem = {};
    for (const key in pickItem) {
      const col = columnEnum[key];
      handledItem[col.label] = col.formatter(item[key]);
    }
    return handledItem;
  });
  const ws = XLSX.utils.json_to_sheet(handledData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, name);
  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array',
  });
  try {
    file.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${name}.xlsx`);
  } catch (error) {
    console.log(error);
  }
};
