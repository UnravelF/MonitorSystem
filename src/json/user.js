const user = {
  userName: 'admin',
  password: 'admin',
  roles: [],
  routers: [
    {
      path: '/',
      name: 'Home',
      enName: 'Home',
      component: 'home',
      redirect: 'index',
      children: [
        {
          id: 1,
          path: 'index',
          name: '首页',
          enName: 'Home',
          icon: 'el-icon-s-home',
          parentId: 0,
          fixed: true,
          component: 'index',
          meta: { fixed: true }
        }
      ]
    },
    {
      id: 2,
      path: '/basic',
      name: '设备管理',
      enName: 'Basic',
      icon: 'fa fa-podcast',
      parentId: 0,
      component: 'home',
      children: [
        {
          id: 3,
          path: 'device',
          name: '设备状态',
          enName: 'Device',
          icon: 'fa fa-table',
          parentId: 2,
          component: 'basic/device'
        },
        {
          id: 4,
          path: 'alerts',
          name: '历史警报',
          enName: 'Alerts',
          icon: 'fa fa-wpforms',
          parentId: 4,
          component: 'basic/alerts'
        }
      ]
    },
    {
      id: 4,
      path: '/work',
      name: '工单管理',
      enName: 'Work',
      icon: 'fa fa-calendar',
      parentId: 0,
      component: 'home',
      children: [
        {
          id: 5,
          path: 'workOrder',
          name: '运营工单',
          enName: 'WorkOrder',
          icon: 'fa fa-table',
          parentId: 4,
          component: 'work/workOrder'
        },
        {
          id: 6,
          path: 'form',
          name: '运维工单',
          enName: 'Form',
          icon: 'fa fa-wpforms',
          parentId: 4,
          component: 'work/form'
        }
      ]
    },
    {
      id: 7,
      path: '/staff',
      name: '人员管理',
      enName: 'Work',
      icon: 'fa fa-user-o',
      parentId: 0,
      component: 'home',
      children: [
        {
          id: 8,
          path: 'employeelist',
          name: '人员列表',
          enName: 'Employeelist',
          icon: 'fa fa-table',
          parentId: 7,
          component: 'staff/employeelist'
        },
        {
          id: 9,
          path: 'worklist',
          name: '职位列表',
          enName: 'Worklist',
          icon: 'fa fa-wpforms',
          parentId: 7,
          component: 'staff/worklist'
        }
      ]
    },
    {
      id: 16,
      path: '/settings',
      name: 'Settings',
      enName: 'Settings',
      icon: 'fa fa-cog',
      parentId: 0,
      component: 'home',
      type: 'click',
      children: [
        {
          id: 17,
          path: 'settings',
          name: '系统设置',
          enName: 'Settings',
          icon: 'fa fa-cog',
          parentId: 16,
          type: 'click'
        }
      ]
    }
  ]
}

export default user
