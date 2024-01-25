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

export interface SerieDetail {
  code: number;
  data: {
    id: number;
    uid: number;
    hotLevel: number;
    type: number;
    state: number;
    updateState: number;
    title: string;
    picture: string;
    picAnnexes: {
      state: number;
      language: number;
      type: number;
      data: {
        fileName: string;
        url: string;
      };
    }[];
    meta: string;
    language: 0;
    parentBlog: 0;
    createdTime: 1705642372918;
    updatedTime: 1705656772916;
    subBlogs: {
      id: number;
      uid: number;
      hotLevel: number;
      type: number;
      state: number;
      title: string;
      picture: string;
      picAnnexes: {
        state: number;
        language: number;
        type: number;
        data: {
          fileName: string;
          url: string;
        };
      }[];
      meta: string;
      metaAnnexes: {
        state: number;
        language: number;
        type: number;
        data: {
          fileName: string;
          url: string;
        };
      }[];
      language: number;
      parentBlog: number;
      createdTime: number;
      updatedTime: number;
      isAllowed: number;
      price: number;
    }[];
  };
}
