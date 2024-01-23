export interface Serie {
  code: number;
  data: {
    list: {
      createdTime: number;
      hotLevel: number;
      id: number;
      isLong: number;
      language: number;
      latitude: number;
      likeNum: number;
      longitude: number;
      parentBlog: number;
      picture: string;
      state: 200;
      supportNum: number;
      support_v: number;
      title: string;
      type: number;
      uid: number;
      updateState: number;
      updatedTime: number;
    }[];
    pageNo: number;
    pageSize: number;
    totalRecords: number;
  };
}
