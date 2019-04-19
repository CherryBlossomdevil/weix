let http = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleName: '',
    itemList: [],
    flag: true,
    id: '',
    page: 0,
    limit: 20
  },

  getDataFn() {
    if(!this.data.flag) {
      return false;
    }
    http(`categories/${this.data.id}/shops?_page=${++this.data.page}&_limit=${this.data.limit}`).then(res => {
      wx.stopPullDownRefresh()
      this.setData({
        itemList: this.data.itemList.concat(res.data),
        page: this.data.page,
        flag: this.data.page * this.data.limit < parseInt(res.header['X-Total-Count'])
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.cat
    })
    http(`categories/${options.cat}`).then(res=> {
      this.setData({
        titleName: res.data.name
      })
      wx.setNavigationBarTitle({
        title: res.data.name
      })
    })
    this.getDataFn()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.titleName
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      flag: true,
      itemList: [],
      page: 0
    })
    // this.getDataFn().then(()=> {
    //   wx.stopPullDownRefresh()
    // })

    this.getDataFn()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getDataFn()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})