// 获取用户管理左侧分类列表
export const fetchUserDeptList = (params, callback) => Promise.resolve({
  data: {
    list: [
      {
        id: '1',
        children: [
          {
            id: '10416',
            parentCode: '370200000000',
            children: [
              {
                id: '10541',
                parentCode: '370202000000',
                deptName: '文一路',
                deptCode: '370202140000',
              },
              {
                id: '10401',
                parentCode: '370202000000',
                deptName: '文二路',
                deptCode: '370202150000',
              },
              {
                id: '10398',
                parentCode: '370202000000',
                children: [
                  {
                    id: '10628',
                    parentCode: '370202230000',
                    deptName: '文三路',
                    deptCode: '370202230001',
                  },
                  {
                    id: '10629',
                    parentCode: '370202230000',
                    deptName: '文晖路',
                    deptCode: '370202230002',
                  },
                ],
                deptName: '古翠路',
                deptCode: '370202230000',
              },
              {
                id: '10537',
                parentCode: '370202000000',
                deptName: '丰潭路',
                deptCode: '370202240000',
              },
            ],
            deptName: '下城区',
            deptCode: '370202000000',
          },
        ],
        deptName: '杭州市',
        deptCode: '370200000000',
      },
    ],
  },
  msg: '',
  errorCode: '',
  status: 1,
}).then((data) => {
  callback(data)
})
// 获取用户列表
export const fetchUserList = (params, callback) => Promise.resolve({
  data: {
    pageSize: 10,
    pageNo: 1,
    totalCount: 10,
    list: [
      {
        id: 10240,
        username: 'tgramxs',
        password: '123456',
        chineseName: '销售部1',
        idcardNo: '332527198010230505',
        deptCode: '370200000000',
        phoneNo: '18969784568',
        status: 0,
        roles: [
          {
            id: 10100,
            roleName: '演示账号1',
            resources: [],
          },
        ],
        gxdwdm: '370200000000',
      },
      {
        id: 10198,
        username: 'qingdaosj',
        password: '888888',
        chineseName: '市局',
        idcardNo: '412722196302151222',
        deptCode: '370200000000',
        phoneNo: '15236985623',
        status: 1,
        roles: [
          {
            id: 1,
            roleName: '超级管理员',
            resources: [],
          },
        ],
        gxdwdm: '370200000000',
      },
      {
        id: 10184,
        username: 'sjsjsj',
        password: '888888',
        chineseName: '测试sj',
        idcardNo: '332623196801254521',
        deptCode: '370200000000',
        phoneNo: '15821456854',
        type: 0,
        status: 1,
        roles: [
          {
            id: 1,
            roleName: '超级管理员',
            resources: [],
          },
        ],
        gxdwdm: '370200000000',
      },
      {
        id: 10180,
        username: 'sj666',
        password: '888888',
        chineseName: 'sj-admin',
        idcardNo: '612527199310150000',
        deptCode: '370200000000',
        phoneNo: '15522223333',
        type: 0,
        status: 0,
        roles: [
          {
            id: 1,
            roleName: '超级管理员',
            resources: [],
          },
        ],
        gxdwdm: '370200000000',
      },
      {
        id: 10178,
        username: 'zhlsj1',
        password: '888888',
        chineseName: 'zhlsj1',
        idcardNo: '330881187609090044',
        deptCode: '370200000000',
        phoneNo: '13200000000',
        type: 0,
        status: 0,
        roles: [
          {
            id: 1,
            roleName: '超级管理员',
            resources: [],
          },
        ],
        gxdwdm: '370200000000',
      },
      {
        id: 10177,
        username: 'zhlsj',
        password: '888888',
        chineseName: 'zhlsj',
        idcardNo: '330881187609090033',
        deptCode: '370200000000',
        phoneNo: '15600000000',
        type: 0,
        status: 0,
        roles: [
          {
            id: 1,
            roleName: '超级管理员',
            resources: [],
          },
        ],
        gxdwdm: '370200000000',
      },
      {
        id: 2,
        username: '111111',
        password: '111111',
        chineseName: '管理员',
        idcardNo: '000000000000000001',
        policeCode: '000000',
        deptCode: '370200000000',
        gender: 1,
        email: 'abc@abc.com',
        phoneNo: '15100000000',
        type: 0,
        status: 0,
        gxdwdm: '370200000000',
      },
    ],
    totalPage: 1,
  },
  msg: '',
  errorCode: '',
  status: 1,
}).then((data) => {
  callback(data)
})
// 获取角色列表
export const fetchRoleList = (params, callback) => Promise.resolve({
  data: {
    list: [
      {
        id: 1,
        roleName: '超级管理员',
        sort: 0,
        type: 0,
        resources: [],
      },
      {
        id: 10080,
        roleName: '开发账号',
        sort: 2,
        resources: [],
      },
      {
        id: 10060,
        roleName: '测试',
        sort: 3,
        resources: [],
      },
      {
        id: 10100,
        roleName: '演示账号',
        sort: 3,
        resources: [],
      },
    ],
  },
  msg: '',
  errorCode: '',
  status: 1,
}).then((data) => {
  callback(data)
})

export const fetchTreeList = (params, callback) => Promise.resolve({
  data: {},
})

export const fetchModuleList = (params, callback) => Promise.resolve({
  data: {},
})
